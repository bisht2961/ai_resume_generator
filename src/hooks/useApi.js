// hooks/useApi.js
import { useState } from "react";

export const useApi = (apiFunc) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const callApi = async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiFunc(...args);
      if(response.error) {
        throw(response.error);
      }
      setLoading(false);
      return response;
    } catch (err) {
      setError(err);
      setLoading(false);
      return null;
    }
  };

  return { callApi, loading, error };
};
