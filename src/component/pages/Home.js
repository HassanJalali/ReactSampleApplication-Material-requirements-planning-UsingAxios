import React, { useState, useEffect } from "react";
import {
  getProductionLines,
  deleteProductionLine,
  activeProductionline,
} from "../../services/ProductionLines-Service";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import moment from "moment-jalaali";
import AddProductionline from "../productionLines/AddProductionline";
import EditProductionLine from "../productionLines/EditProductionLine";
import "./Css/Home.css";

const Home = () => {
  const [productionLines, setProductionLines] = useState([]);

  useEffect(() => {
    loadProductionLine();
  }, []);

  const loadProductionLine = async () => {
    const request = await getProductionLines();
    const result = request.data;
    setProductionLines(result);
  };

  const handleActiveManagement = async (id) => {
    const request = await activeProductionline(id);
    if (request.status == 200) {
      loadProductionLine();
    }
  };

  const DeleteProductionLine = async (id) => {
    const request = await deleteProductionLine(id);
    if (request.status == 200) {
      toast.success("خط تولید با موفقیت حذف شد.");
      loadProductionLine();
    }
  };

  return (
    <div className="container">
      <AddProductionline loadProductionLine={loadProductionLine} />

      <table className="table table-bordered  mt-3 table-hover text-center">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">نام خط تولید</th>
            <th scope="col"> نام مرکز هزینه</th>
            <th scope="col">تاریخ ایجاد</th>
            <th scope="col">فعال </th>
            <th scope="col">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {productionLines.map((x, index) => (
            <tr key={x.Id}>
              <th scope="row">{index + 1}</th>
              <td>{x.ProductionLineName}</td>
              <td>{x.CostCenterName}</td>

              <td>
                {moment(x.Timestamp, "YYYY-M-D HH:mm:ss").format(
                  "HH:mm:ss - jYYYY/jM/jD"
                )}
              </td>

              <td>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input  m-auto align-middle"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                    defaultChecked={x.IsActive}
                    onClick={() => handleActiveManagement(x.Id)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexSwitchCheckDefault"
                  ></label>
                </div>
              </td>
              <td>
                <EditProductionLine
                  {...x}
                  loadProductionLine={loadProductionLine}
                />
                <Button
                  variant="outline-danger"
                  className="btn mx-2 px-3"
                  onClick={() => DeleteProductionLine(x.Id)}
                >
                  حذف
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
