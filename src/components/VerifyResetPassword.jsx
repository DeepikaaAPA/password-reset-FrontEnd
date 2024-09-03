import emailServices from "../services/emailServices";
import ResetPassword from "./ResetPassword";
import { useState } from "react";
function VerifyResetPassword() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };
  const handleSend = () => {
    setMessage("");
    emailServices
      .verifyReset(code, email)
      .then((response) => {
        if (response.data.status === "valid") {
          setShowForm(true);
        } else {
          setShowForm(false);
          setMessage(response.data.message);
        }
      })
      .catch((err) => {
        setShowForm(false);
        setMessage(err.response.data.message);
      });
  };
  return (
    <>
      <label>Enter email id :</label>
      <input type="email" value={email} onChange={handleEmailChange}></input>
      <br></br>
      <label>Enter code:</label>
      <input type="text" value={code} onChange={handleCodeChange}></input>
      <br></br>
      <button className="m-3 btn btn-primary" onClick={handleSend}>
        Verify code
      </button>
      <br></br>
      <p className="text-danger">{message}</p>
      {showForm ? <ResetPassword email={email} /> : null}
    </>
  );
}
export default VerifyResetPassword;
