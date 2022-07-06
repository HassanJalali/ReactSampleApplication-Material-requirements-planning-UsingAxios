import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/Auth";

// http.setJwt(getCurrentUser());

http.request.use((request) => {
  request.headers.Authorization = "Bearer " + getCurrentUser();

  return request;
});

export async function login(data) {
  const { data: jwt } = await http.post(`${apiEndpoint}/Login`, data);
  localStorage.setItem("token", jwt);
}

export function logout() {
  localStorage.removeItem("token");
}
export function getCurrentUser() {
  return localStorage.getItem("token");
}
