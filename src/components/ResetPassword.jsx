import React, { useState } from "react";
import axios from "axios";

const ResetPassword = ({ email }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.put(
        `http://127.0.0.1:3000/api/v1/resetPassword`,
        { email, password }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message || "An error occurred");
    }
  };

  return (
    <div className="p-5  mycontainer border">
      <h2 className="text-primary">Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button className="m-5 btn btn-primary" type="submit">
          Reset Password
        </button>
      </form>
      {message && <p className="text-warning">{message}</p>}
    </div>
  );
};

export default ResetPassword;
