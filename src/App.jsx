import { useState } from "react";
import {
  createBrowserRouter,
  Link,
  RouterProvider,
  useLoaderData,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import emailServices from "./services/emailServices";
const router = createBrowserRouter([
  {
    path: "/",
    element: <ForgotPassword />,
  },
  {
    path: "/reset",

    element: <ResetPassword> </ResetPassword>,
    loader: tokenLoader,
  },
]);
function App() {
  return (
    <>
      <h1>Hello</h1>
      <RouterProvider router={router} />
    </>
  );
}

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
        //console.log("response received", response);
        setMessage(response.data.message);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <br></br>
      <label>Email :</label>{" "}
      <input type="email" value={email} onChange={handleEmailChange}></input>
      <br></br>
      {/* {email} */}
      <button className="m-3 btn btn-primary" onClick={handleForgotPassword}>
        Forgot Password
      </button>
      <p className="text-primary p-3">{message}</p>
    </>
  );
}
function tokenLoader({ params }) {
  return params.token;
}
function ResetPassword() {
  const token = useLoaderData();
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
      .verifyReset(token, email)
      .then((response) =>
        response.data.status === "valid"
          ? setShowForm(true)
          : setMessage(response.data.message)
      )
      .catch((err) => setMessage(err.message));
  };
  return (
    <>
      <label>Enter email id :</label>
      <input type="email" value={email} onChange={handleEmailChange}></input>
      <br></br>
      <input type="text" value={code} onChange={handleCodeChange}></input>
      <button className="btn btn-primary" onClick={handleSend}>
        Send
      </button>
      {showForm ? "form" : null}
      <br></br>
      {message}
    </>
  );
}
export default App;
