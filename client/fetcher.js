import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";

const fetcher = async (method, url, ...rest) => {
  const response = await axios[method](url, ...rest);
  return response.data;
};

export default fetcher;
