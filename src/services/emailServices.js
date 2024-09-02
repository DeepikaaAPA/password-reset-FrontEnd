import axios from "axios";
const baseURL = "http://127.0.0.1:3000/api/v1";
// define the axios instance
const instance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
const emailServices = {
  getResetLink: async (data) => {
    try {
      console.log(data);
      return await instance.patch("/getResetLink", data);
    } catch (err) {
      alert(err);
    }
  },
  verifyReset: async (token, email) => {
    return await instance.post(`/verifyReset/${token}`, { email });
  },
};
export { instance };
export default emailServices;
