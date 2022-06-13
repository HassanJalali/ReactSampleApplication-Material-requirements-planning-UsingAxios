import axios from "axios";
import { toast } from "react-toastify";

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
