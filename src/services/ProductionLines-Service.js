import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/ProductionLines";

export function getProductionLines() {
  return http.get(`${apiEndpoint}/GetProductionLines`);
}

export function getAssignedProduction() {
  return http.get(`${apiEndpoint}/GetAssignedProduction`);
}

export function getProductionLineById(id) {
  return http.get(`${apiEndpoint}/GetProductionLineById/${id}`);
}

export function getCostCentersCode(id) {
  return http.get(`${apiEndpoint}/GetCostCentersCode`);
}

export function getAssignedProductionsByProductionLineName(id) {
  return http.get(
    `${apiEndpoint}/GetAssignedProductionsByProductionLineName/${id}`
  );
}

export function getAssignedProductionsByProductionName(id) {
  return http.get(
    `${apiEndpoint}/GetAssignedProductionsByProductionName/${id}`
  );
}

export function getProductionLineName() {
  return http.get(`${apiEndpoint}/GetProductionLineName`);
}

export function getActiveAssignedProductionByProductionLineId(id) {
  return http.get(
    `${apiEndpoint}/GetActiveAssignedProductionByProductionLineId/${id}`
  );
}

export function getProductionCostIdByProductionLineIdAndProductionCode(
  productionLineId,
  productionCostId
) {
  return http.get(
    `${apiEndpoint}/GetProductionCostIdByProductionLineIdAndProductionCode/${productionLineId}/${productionCostId}`
  );
}

export function getProductionCostId(id) {
  return http.get(`${apiEndpoint}/GetProductionCostId/${id}`);
}

export function getAssignedWorkstations() {
  return http.get(`${apiEndpoint}/GetAssignedWorkstations`);
}

export function getManufacturedProductInfo(id) {
  return http.get(`${apiEndpoint}/GetManufacturedProductInfo/${id}`);
}

export function createProductionLine(data) {
  return http.post(`${apiEndpoint}/CreateProductionLine`, data);
}

export function assignProductionCostIdToProduction(data) {
  return http.post(`${apiEndpoint}/AssignProductionCostIdToProduction`, data);
}

export function assignWorkStationToProductionLine(data) {
  return http.post(`${apiEndpoint}/AssignWorkStationToProductionLine`, data);
}

export function AssignProductionToProductionLine(data) {
  return http.post(`${apiEndpoint}/AssignProductionToProductionLine`, data);
}

export function activeProductionline(id) {
  return http.put(`${apiEndpoint}/ActiveProductionline/${id}`);
}

export function activeAssignedProduction(ProductionLineId, ProductionId) {
  return http.put(
    `${apiEndpoint}/ActiveAssignedProduction/${ProductionLineId}/${ProductionId}`
  );
}

export function updateProductionLine(id, data) {
  return http.put(`${apiEndpoint}/UpdateProductionLine/${id}`, data);
}

export function deleteProductionLine(id) {
  return http.delete(`${apiEndpoint}/DeleteProductionLine/${id}`);
}

export function deleteAssignedWorkstation(ProductionLineId, id) {
  return http.delete(
    `${apiEndpoint}/DeleteAssignedWorkstation/${ProductionLineId}/${id}`
  );
}

export function deleteAssignedProduction(
  ProductionLineId,
  ProductionId,
  ProductionCode
) {
  return http.delete(
    `${apiEndpoint}/DeleteAssignedProduction/${ProductionLineId}/${ProductionId}/${ProductionCode}`
  );
}
