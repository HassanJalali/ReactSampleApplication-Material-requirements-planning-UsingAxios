import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/ProductionWorksheet";

export function getProductionWorksheets() {
  return http.get(`${apiEndpoint}/GetProductionWorksheets`);
}

export function getUnscannedProduction() {
  return http.get(`${apiEndpoint}/GetUnscannedProduction`);
}

export function getProductionWorksheetDetailByProductionWorksheetId(id) {
  return http.get(
    `${apiEndpoint}/GetProductionWorksheetDetailByProductionWorksheetId/${id}`
  );
}

export function createProductionWorksheet(data) {
  return http.post(`${apiEndpoint}/CreateProductionWorksheet`, data);
}

export function createProductionWorksheetDetail(data) {
  return http.post(`${apiEndpoint}/CreateProductionWorksheetDetail`, data);
}
