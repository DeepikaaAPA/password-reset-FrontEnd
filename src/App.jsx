import { useState } from "react";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import ForgotPassword from "./components/ForgotPassword";
import emailServices from "./services/emailServices";
import ResetPassword from "./components/ResetPassword";
import Register from "./components/Register";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Register />,
  },
  {
    path: "/forgot-password",

    element: <ForgotPassword />,
  },
  {
    path: "/reset",

    element: <VerifyResetPassword />,
  },
]);
function App() {
  return (
    <div className="mycontainer border">
      <h1>Welcome!!!</h1>
  
      <RouterProvider router={router} />
    </div>
  );
}

// function tokenLoader({ params }) {
//   return params.token;
// }
function VerifyResetPassword() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
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
        setMessage(err.message);
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
export default App;
