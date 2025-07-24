import React, { useState } from "react";

function CreateJob() {
  const [job, setJob] = useState({
    title: "",
    companyName: "",
    location: "",
    description: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(job),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Job posted successfully!");
        setJob({ title: "", companyName: "", location: "", description: "" });
      } else {
        setMessage(data.message || "Failed to post job.");
      }
    } catch (err) {
      setMessage("Network error.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Create Job</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    name="title"
                    className="form-control"
                    value={job.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Company</label>
                  <input
                    name="companyName"
                    className="form-control"
                    value={job.companyName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Location</label>
                  <input
                    name="location"
                    className="form-control"
                    value={job.location}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    name="description"
                    className="form-control"
                    value={job.description}
                    onChange={handleChange}
                    rows="3"
                  />
                </div>
                <button className="btn btn-primary w-100">Post Job</button>
              </form>
              {message && (
                <div
                  className={`alert mt-3 ${
                    message.includes("success")
                      ? "alert-success"
                      : "alert-danger"
                  }`}
                >
                  {message}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateJob;
