package com.tamari.jobify.service;

import com.tamari.jobify.model.Job;
import com.tamari.jobify.model.JobApplication;
import com.tamari.jobify.model.User;
import com.tamari.jobify.repository.JobApplicationRepository;
import com.tamari.jobify.repository.JobRepository;
import com.tamari.jobify.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class JobApplicationService {

    private final JobApplicationRepository appRepo;
    private final UserRepository userRepo;
    private final JobRepository jobRepo;

    public JobApplication apply(Long jobId, String applicantEmail, String coverLetter) {
        Job job = jobRepo.findById(jobId).orElseThrow();
        User user = userRepo.findByEmail(applicantEmail).orElseThrow();

        JobApplication app = new JobApplication();
        app.setJob(job);
        app.setApplicant(user);
        app.setCoverLetter(coverLetter);

        return appRepo.save(app);
    }

    public List<JobApplication> getUserApplications(String email) {
        return appRepo.findByApplicantEmail(email);
    }

    public List<JobApplication> getJobApplications(Long jobId) {
        return appRepo.findByJobId(jobId);
    }
}
