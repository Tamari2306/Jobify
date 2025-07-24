package com.tamari.jobify.controller;

import com.tamari.jobify.model.Job;
import com.tamari.jobify.service.JobService;
import com.tamari.jobify.repository.UserRepository;
import com.tamari.jobify.model.User;
import com.tamari.jobify.model.Role;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*; 

import java.util.List;

@RestController 
@RequestMapping("/api/jobs") 
public class JobController {

    private final JobService jobService;
    private final UserRepository userRepository;

    // Spring can often inject these automatically if you use @Autowired or lombok's @RequiredArgsConstructor on the class
    // but explicit constructor injection is good practice.
    public JobController(JobService jobService, UserRepository userRepository) {
        this.jobService = jobService;
        this.userRepository = userRepository;
    }

    @PostMapping 
    public ResponseEntity<?> createJob(
            @RequestBody Job job,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        User user = userRepository.findByEmail(userDetails.getUsername())
                        .orElseThrow(() -> new RuntimeException("User not found for provided principal")); // Add a more specific exception message for clarity

        
        if (!user.getRole().equals(Role.ADMIN)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Only admins can post jobs.");
        }

        Job saved = jobService.createJob(job, user.getEmail());
        return ResponseEntity.ok(saved);
    }


    @GetMapping
public ResponseEntity<List<Job>> getJobs(@AuthenticationPrincipal UserDetails userDetails) {
    List<Job> jobs = jobService.getAllJobs(); 
    return ResponseEntity.ok(jobs);
    }

    @PutMapping("/{id}") 
    public ResponseEntity<Job> updateJob(
            @PathVariable Long id,
            @RequestBody Job updatedJob,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        Job job = jobService.updateJob(id, updatedJob, userDetails.getUsername());
        return ResponseEntity.ok(job);
    }

    @DeleteMapping("/{id}") 
    public ResponseEntity<?> deleteJob(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        jobService.deleteJob(id, userDetails.getUsername());
        return ResponseEntity.ok().build();
    }
}