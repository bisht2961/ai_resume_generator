// services/apiHelper.js
export const apiWrapper = async (apiCall) => {
    try {
      const response = await apiCall;
      return { data: response.data, error: null };
    } catch (error) {
      return { data: null, error: error.response?.data || "Unexpected error" };
    }
  };
  