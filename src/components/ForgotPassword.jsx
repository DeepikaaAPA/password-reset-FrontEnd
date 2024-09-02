import { useState } from "react";
import { Link } from "react-router-dom";
import emailServices from "../services/emailServices";
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const [message, setMessage] = useState("");
  const handleForgotPassword = () => {
    setEmail("");
    setMessage("");
    emailServices
      .getResetLink({ email })
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="mb-3 ">
        <Link to="/">Do you want to register a new user ? Click here.</Link>
      </div>
      <br></br>
      <label className="p-2">Email :</label>{" "}
      <input type="email" value={email} onChange={handleEmailChange}></input>
      <br></br>
      <button className="m-3 btn btn-primary" onClick={handleForgotPassword}>
        Forgot Password
      </button>
      <p className="text-primary p-3">{message}</p>
    </>
  );
}
export default ForgotPassword;
