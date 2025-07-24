import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState({
    title: "",
    companyName: "",
    location: "",
    description: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await API.get(`/jobs/${id}`);
        setJob(response.data);
      } catch (err) {
        setMessage("Error loading job.");
      }
    };
    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/jobs/${id}`, job);
      navigate("/jobs");
    } catch (err) {
      setMessage("Update failed.");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Edit Job</h3>
      {message && <p className="text-danger">{message}</p>}
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            name="title"
            className="form-control"
            value={job.title}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Company</label>
          <input
            name="companyName"
            className="form-control"
            value={job.companyName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Location</label>
          <input
            name="location"
            className="form-control"
            value={job.location}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-control"
            rows="3"
            value={job.description}
            onChange={handleChange}
          />
        </div>
        <button className="btn btn-primary">Update Job</button>
      </form>
    </div>
  );
}

export default EditJob;
