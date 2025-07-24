import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

function ApplyJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [coverLetter, setCoverLetter] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post(`/applications/${id}`, { coverLetter });
      setMessage("Application submitted successfully!");
      setTimeout(() => navigate("/jobs"), 1500);
    } catch (err) {
      setMessage("Failed to apply. Try again.");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Apply for Job</h3>
      {message && <p className="text-info">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Cover Letter</label>
          <textarea
            className="form-control"
            rows="5"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-primary">Submit Application</button>
      </form>
    </div>
  );
}

export default ApplyJob;
