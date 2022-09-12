import axios from "axios";

export default ({ req }) => {
  // server side code
  if (typeof window === "undefined") {
    return axios.create({
      baseURL: "http://localhost:5000",
      headers: req.headers,
    });
  } else {
    //client side code

    return axios.create({
      baseURL: "http://localhost:5000",
    });
  }
};
