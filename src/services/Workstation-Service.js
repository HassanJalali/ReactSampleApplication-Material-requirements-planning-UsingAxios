import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/Workstations";

export function getWorkstations() {
  return http.get(`${apiEndpoint}/GetWorkstations`);
}

export function deleteDefineWorkstation(id) {
  return http.delete(`${apiEndpoint}/DeleteDefineWorkstation/${id}`);
}

export function defineWorkstation(data) {
  return http.post(`${apiEndpoint}/DefineWorkstation`, data);
}
