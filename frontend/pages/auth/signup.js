import { useState } from "react";
import Router from "next/router";
import useRequest from "../../hooks/useRequest";

function signup() {
  // State declarations
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [company, setCompany] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // TODO: Extract the URL Away to .env or constants.js
  const { doRequest, errors } = useRequest({
    url: "http://localhost:5000/api/manager/signup",
    method: "post",
    body: {
      firstname,
      lastname,
      address,
      company,
      dob: dob.toString(),
      email,
      password,
    },
    // Pass function as a callback
    onSuccess: () => Router.push("/"),
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    await doRequest();
  };

  return (
    <form className="container mt-5" onSubmit={onSubmit}>
      <h1>Create Manager</h1>
      <div className="form-group">
        <label>First Name</label>
        <input
          value={firstname}
          placeholder="First Name"
          onChange={(e) => setFirstname(e.target.value)}
          type={"text"}
          className="form-control"
        />
        <label>Last Name</label>
        <input
          placeholder="Last Name"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          type={"text"}
          className="form-control"
        />
        <label>Address</label>
        <input
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          type={"text"}
          className="form-control"
        />
        <label>Date of Birth</label>
        <input
          placeholder="Enter date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          type={"date"}
          className="form-control"
        />
        <label>Company</label>
        <input
          placeholder="Company Name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          type={"text"}
          className="form-control"
        />
        <label>Email Address</label>
        <input
          value={email}
          placeholder="Email Address"
          onChange={(e) => setEmail(e.target.value)}
          type={"email"}
          className="form-control"
        />
        <label>Password</label>
        <input
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={"password"}
          className="form-control"
        />
      </div>
      {/* Display errors coming from backend */}
      {errors}

      <button type={"submit"} className="btn btn-primary">
        Sign Up
      </button>
    </form>
  );
}

export default signup;
