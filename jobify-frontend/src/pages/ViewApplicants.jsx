import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function ViewApplicants() {
  const { id } = useParams();
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await API.get(`/applications/job/${id}`);
        setApplicants(response.data);
      } catch (err) {
        console.error("Failed to load applicants");
      }
    };

    fetchApplicants();
  }, [id]);

  return (
    <div className="container mt-4">
      <h3>Applicants for Job #{id}</h3>
      {applicants.length === 0 ? (
        <p>No applications yet.</p>
      ) : (
        <ul className="list-group">
          {applicants.map((app) => (
            <li key={app.id} className="list-group-item">
              <strong>{app.applicant.fullName}</strong> - {app.applicant.email}
              <br />
              <em>{app.coverLetter}</em>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ViewApplicants;
