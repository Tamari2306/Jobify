import React, { useState } from "react";
import API from "../services/api";

function AddJob() {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    jobType: "",
    status: "",
    description: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/jobs", formData);
      alert("Job posted successfully!");
    } catch (err) {
      console.error(err);
      alert("Error posting job");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Title" onChange={handleChange} required />
      <input name="company" placeholder="Company" onChange={handleChange} required />
      <input name="location" placeholder="Location" onChange={handleChange} required />
      <input name="jobType" placeholder="Job Type" onChange={handleChange} required />
      <input name="status" placeholder="Status" onChange={handleChange} required />
      <textarea name="description" placeholder="Description" onChange={handleChange} />
      <button type="submit">Post Job</button>
    </form>
  );
}

export default AddJob;
