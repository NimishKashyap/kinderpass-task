import { useState } from "react";
import Router from "next/router";
import useRequest from "../../hooks/useRequest";

function signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // TODO: Extract urls to .env or constants.js
  const { doRequest, errors } = useRequest({
    url: "http://localhost:5000/api/manager/signin",
    method: "post",
    body: {
      email,
      password,
    },
    onSuccess: () => Router.push("/"),
  });
  const onSubmit = async (event) => {
    event.preventDefault();
    await doRequest();
  };

  return (
    <form className="container mt-5" onSubmit={onSubmit}>
      <h1>Sign In</h1>
      <div className="form-group">
        <label htmlFor="email" className="mt-3">
          Email Address
        </label>
        <input
          id="email"
          value={email}
          placeholder="Email Address"
          onChange={(e) => setEmail(e.target.value)}
          type={"email"}
          className="form-control"
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={"password"}
          className="form-control"
        />
      </div>
      {errors}

      <button type={"submit"} className="btn btn-primary mt-2">
        Sign In
      </button>
    </form>
  );
}

export default signup;
