import React, { useEffect, useState } from "react";
import API from "../services/api"; // Ensure this path is correct
import { useNavigate } from "react-router-dom"; // Ensure react-router-dom is installed

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [userRole, setUserRole] = useState(null); // State to store the user's role
  const navigate = useNavigate();

  // useEffect to retrieve and parse user role from localStorage once on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        // Ensure userData and userData.role exist before setting the state
        if (userData && userData.role) {
          setUserRole(userData.role);
        } else {
          console.warn(
            "User data found in localStorage but 'role' property is missing or null."
          );
          // Optionally, clear invalid user data if role is missing
          localStorage.removeItem("user");
          localStorage.removeItem("token");
        }
      } catch (e) {
        console.error("Failed to parse user data from localStorage:", e);
        // Clear invalid JSON data if parsing fails
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    } else {
      console.log(
        "No user data found in localStorage. User likely not logged in."
      );
      // If no user data, consider redirecting to login page or showing a login message
      // navigate('/login'); // Uncomment if jobs page requires login to even view
    }
  }, []); // Empty dependency array means this runs once on mount

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found. User is not authenticated.");
        navigate("/login"); // Redirect to login if no token
        return;
      }
      const response = await API.get("/jobs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setJobs(response.data);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
      // More specific error handling for API response statuses
      if (error.response) {
        if (error.response.status === 401) {
          alert(
            "Your session has expired or you are not authorized. Please log in again."
          );
          navigate("/login");
        } else if (error.response.status === 403) {
          alert("You do not have permission to view these jobs.");
          // Optionally, redirect to a different page or show a general error
        } else {
          alert(
            `Error fetching jobs: ${error.response.status} - ${
              error.response.data.message || error.response.statusText
            }`
          );
        }
      } else {
        alert(
          "Network error. Could not connect to the server or unknown error."
        );
      }
    }
  };

  const handleEdit = (job) => {
    navigate(`/edit-job/${job.id}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You are not logged in. Please log in to delete jobs.");
        navigate("/login");
        return;
      }
      await API.delete(`/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setJobs(jobs.filter((job) => job.id !== id)); // Remove the deleted job from state
      alert("Job deleted successfully!");
    } catch (error) {
      console.error("Delete failed:", error);
      if (error.response) {
        if (error.response.status === 401) {
          alert(
            "Your session has expired or you are not authorized. Please log in again."
          );
          navigate("/login");
        } else if (error.response.status === 403) {
          alert("You do not have permission to delete this job.");
        } else {
          alert(
            `Error deleting job: ${error.response.status} - ${
              error.response.data.message || error.response.statusText
            }`
          );
        }
      } else {
        alert("Network error. Failed to delete job.");
      }
    }
  };

  const handleViewApplicants = (jobId) => {
    navigate(`/view-applicants/${jobId}`);
  };

  const handleApply = (jobId) => {
    navigate(`/apply-job/${jobId}`);
  };

  
  useEffect(() => {
    
    if (userRole !== null || localStorage.getItem("token")) {
      // Fetch if role determined or token exists
      fetchJobs();
    }
  }); 

  return (
    <div className="container mt-4">
      <h2 className="mb-4">All Available Jobs</h2>
      {jobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        <div className="row">
          {jobs.map((job) => (
            <div key={job.id} className="col-md-6">
              <div className="card mb-3 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{job.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {job.companyName}
                  </h6>
                  <p className="card-text">{job.description}</p>
                  <p className="card-text">
                    <strong>Location:</strong> {job.location}
                  </p>
                 
                  {/* Conditional Rendering based on userRole */}
                  {userRole === "ADMIN" && (
                    <>
                      <button
                        className="btn btn-warning me-2"
                        onClick={() => handleEdit(job)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger me-2"
                        onClick={() => handleDelete(job.id)}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => handleViewApplicants(job.id)}
                      >
                        View Applicants
                      </button>
                    </>
                  )}

                  {userRole === "USER" && (
                    <button
                      className="btn btn-success"
                      onClick={() => handleApply(job.id)}
                    >
                      Apply
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Jobs;
