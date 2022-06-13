import http from "./httpService";
import apiUrl from "../config.json";

// const apiEndpoint = `${apiUrl}/Workstations`;
const apiEndpoint = apiUrl + "/Workstations";

export function getWorkstations() {
  return http.get(`${apiEndpoint}/GetWorkstations`);
}
