import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import JobList from "./pages/JobList";
import Navbar from "./components/Navbar";
import AddJob from "./pages/AddJob";
import Jobs from "./pages/Jobs";
import CreateJob from "./pages/CreateJob";
import EditJob from "./pages/EditJob";
import PrivateRoute from "./components/PrivateRoute";
import ApplyJob from "./pages/ApplyJob";
import ViewApplicants from "./pages/ViewApplicants";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<JobList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-job" element={<AddJob />} />
        <Route
          path="/jobs"
          element={
            <PrivateRoute>
              <Jobs />
            </PrivateRoute>
          }
        />
        <Route
          path="/create-job"
          element={
            <PrivateRoute>
              <CreateJob />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-job/:id"
          element={
            <PrivateRoute>
              <EditJob />
            </PrivateRoute>
          }
        />
        <Route
          path="/apply-job/:id"
          element={
            <PrivateRoute>
              <ApplyJob />
            </PrivateRoute>
          }
        />
        <Route
          path="/view-applicants/:id"
          element={
            <PrivateRoute>
              <ViewApplicants />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
