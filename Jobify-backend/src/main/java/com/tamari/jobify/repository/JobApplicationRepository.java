package com.tamari.jobify.repository;
import com.tamari.jobify.model.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {
    List<JobApplication> findByApplicantEmail(String email);
    List<JobApplication> findByJobId(Long jobId);
}
