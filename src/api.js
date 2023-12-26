import axios from "axios";
export default axios.create({
  baseURL: `https://issuestasks.com/api/`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});




