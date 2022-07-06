import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, (error) => {
  if (error.response && error.response.status === 400) {
    toast.error(error.response.data);
  }
});

// if (error.response && error.response.status === 401) {
//   window.location.href = "/login";
// }

function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  request: axios.interceptors.request,
  setJwt,
};
