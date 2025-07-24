import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json(); 

        localStorage.setItem("token", data.token); 

        // Store the user details object
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: data.userId,
            email: data.userEmail,
            fullName: data.fullName,
            role: data.userRole, 
          })
        );

        setMessage("Login successful! Welcome.");
        navigate("/jobs");
      } else {
        const errorData = await response.json();
        setMessage(
          `Login failed: ${errorData.message || "Invalid credentials"}`
        );
      }
    } catch (error) {
      setMessage("Network error. Could not connect to the server.");
      console.error("Login network error:", error); 
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Login</h3>
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password:
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
              </form>

              {message && (
                <div
                  className={`alert mt-3 ${
                    message.includes("successful")
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

export default Login;
