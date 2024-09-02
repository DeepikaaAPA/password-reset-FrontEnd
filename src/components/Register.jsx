import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { instance } from "../services/emailServices";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await instance.post("/register", {
        name,
        email,
        password,
      });
      setMessage("You have successfully registered.");
    } catch (error) {
      setMessage(error.response.data.message || "An error occurred");
    }
  };

  return (
    <div className="mycontainer  m-2">
      <h2 className="text-success mb-4">Register here </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          Register
        </button>
        <div className="m-3">
          {" "}
          <Link to="/forgot-password">Forgot Password ?</Link>
        </div>
      </form>
      {message && <p className="mt-3 text-primary">{message}</p>}
    </div>
  );
};

export default Register;
