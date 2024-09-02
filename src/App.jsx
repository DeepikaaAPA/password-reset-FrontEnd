import { useState } from "react";
import {
  createBrowserRouter,
  Link,
  RouterProvider,
  useLoaderData,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import ForgotPassword from "./components/ForgotPassword";
import emailServices from "./services/emailServices";
const router = createBrowserRouter([
  {
    path: "/",
    element: <ForgotPassword />,
  },
  {
    path: "/reset",

    element: <ResetPassword> </ResetPassword>,
  },
]);
function App() {
  return (
    <>
      <h1>Welcome!!!</h1>
      <RouterProvider router={router} />
    </>
  );
}

// function tokenLoader({ params }) {
//   return params.token;
// }
function ResetPassword() {
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
