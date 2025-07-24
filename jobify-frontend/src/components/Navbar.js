import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Jobify
        </Link>
        <div>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/jobs">
                Jobs
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/create-job">
                + Add Job
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </li>
            <li className="nav-item">
              <button
                onClick={handleLogout}
                className="btn btn-sm btn-danger ms-2"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
};

export default Navbar;
