import React, { useEffect, useState } from "react";
import API from '../services/api'; 

function JobList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    API.get("/jobs")
      .then((res) => setJobs(res.data))
      .catch((err) => console.error("Error fetching jobs", err));
  }, []);

  return (
    <div>
      <h2>Available Jobs</h2>
      <ul>
        {jobs.map((job) => (
          <li key={job.id}>
            <strong>{job.title}</strong> — {job.company}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default JobList;
