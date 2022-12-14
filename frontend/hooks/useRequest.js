import axios from "axios";
import { useState } from "react";

/**
 * Custom Hook to manage axios requests
 *
 * errors: Contains JSX to render the errors (Used in Authentication)
 * doRequest: function that executes the XMLHttpRequest
 */
const useRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    try {
      setErrors(null);
      const response = await axios[method](url, body);
      if (onSuccess) {
        console.log(response);
        onSuccess(response.data);
      }
      return response.data;
    } catch (err) {
      console.log(err);
      setErrors(
        <div className="alert alert-danger">
          <h4>Ooops...</h4>
          <ul className="my-0">
            {err.response.data.errors.map((err, index) => (
              <li key={index}>{err.message}</li>
            ))}
          </ul>
        </div>
      );
      throw err;
    }
  };

  return {
    doRequest,
    errors,
  };
};

export default useRequest;
