// SecurityConfig.java
package com.tamari.jobify.config;

import com.tamari.jobify.auth.JwtAuthFilter;
import com.tamari.jobify.service.UserDetailsServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.*;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.*;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity; // Good practice to include
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.*;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration; // Import CorsConfiguration
import org.springframework.web.cors.CorsConfigurationSource; // Import CorsConfigurationSource
import org.springframework.web.cors.UrlBasedCorsConfigurationSource; // Import UrlBasedCorsConfigurationSource
import java.util.Arrays; // Import Arrays

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity // Explicitly enable Spring Security's web security features
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;
    private final UserDetailsServiceImpl userDetailsService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                // 1. Enable CORS and configure its source
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                // 2. Disable CSRF for stateless APIs (common for JWT)
                .csrf(csrf -> csrf.disable())
                // 3. Configure authorization rules for HTTP requests
                .authorizeHttpRequests(auth -> auth
                    // Allow unauthenticated access to authentication-related endpoints (login, register)
                    .requestMatchers("/api/auth/**").permitAll()
                    // Require authentication for job-related endpoints
                    .requestMatchers("/api/jobs/**").authenticated()
                    // All other requests also require authentication by default
                    .anyRequest().authenticated()
                )
                // 4. Configure session management to be stateless (for JWT)
                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                // 5. Set the UserDetailsService for authentication
                .userDetailsService(userDetailsService)
                // 6. Add the JWT authentication filter before the standard UsernamePasswordAuthenticationFilter
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    // Bean to define CORS configuration for Spring Security
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // Allow requests from your React app's development server
        // In production, replace "*" with your actual frontend domain (e.g., "https://yourfrontend.com")
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000")); // Changed from "*" to be more specific for dev
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*")); // Allow all headers
        configuration.setAllowCredentials(true); // Allow sending cookies/auth headers

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // Apply this CORS config to all paths
        return source;
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration
    ) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        // This bean is used to completely ignore certain paths from the Spring Security filter chain.
        return web -> web.ignoring().requestMatchers("/error");
    }
}