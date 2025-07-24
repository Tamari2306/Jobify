package com.tamari.jobify.controller;
import com.tamari.jobify.model.JobApplication;
import com.tamari.jobify.service.JobApplicationService;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
public class JobApplicationController {

    private final JobApplicationService appService;

    @PostMapping("/{jobId}")
    public ResponseEntity<?> apply(
            @PathVariable Long jobId,
            @RequestBody Map<String, String> payload,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        String coverLetter = payload.get("coverLetter");
        var saved = appService.apply(jobId, userDetails.getUsername(), coverLetter);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/my")
    public List<JobApplication> myApplications(@AuthenticationPrincipal UserDetails userDetails) {
        return appService.getUserApplications(userDetails.getUsername());
    }

    @GetMapping("/job/{jobId}")
    public List<JobApplication> jobApplications(@PathVariable Long jobId) {
        return appService.getJobApplications(jobId);
    }
}
