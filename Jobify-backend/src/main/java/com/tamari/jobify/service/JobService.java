package com.tamari.jobify.service;

import com.tamari.jobify.model.Job;
import com.tamari.jobify.model.User;
import com.tamari.jobify.repository.JobRepository;
import com.tamari.jobify.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class JobService {

    private final JobRepository jobRepository;
    private final UserRepository userRepository;

    public Job createJob(Job job, String userEmail) {
    User user = userRepository.findByEmail(userEmail)
            .orElseThrow(() -> new RuntimeException("User not found"));

    job.setUser(user); 
    return jobRepository.save(job);
}


    public List<Job> getAllJobs() {
    return jobRepository.findAll();
    }

    public Job updateJob(Long id, Job updatedJob, String userEmail) {
    Job job = jobRepository.findById(id).orElseThrow();
    if (!job.getUser().getEmail().equals(userEmail)) {
        throw new RuntimeException("Unauthorized to update this job");
    }

    job.setTitle(updatedJob.getTitle());
    job.setCompany(updatedJob.getCompany());
    job.setLocation(updatedJob.getLocation());
    job.setJobType(updatedJob.getJobType());
    job.setStatus(updatedJob.getStatus());
    job.setDescription(updatedJob.getDescription());
    return jobRepository.save(job);
}

    public void deleteJob(Long id, String userEmail) {
        Job job = jobRepository.findById(id).orElseThrow();
        if (!job.getUser().getEmail().equals(userEmail)) {
            throw new RuntimeException("Unauthorized to delete this job");
        }
        jobRepository.delete(job);
    }

}
