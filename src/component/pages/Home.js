import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment-jalaali";
import "./Css/Home.css";

const Home = () => {
  const [productionLines, setProductionLines] = useState([]);

  useEffect(() => {
    loadProductionLine();
  }, []);

  const loadProductionLine = async () => {
    const result = await axios.get(
      "https://localhost:7295/api/ProductionLines/GetProductionLines"
    );
    setProductionLines(result.data);
  };

  const deleteProductionLine = async (id) => {
    var res = await axios.delete(
      `https://localhost:7295/api/ProductionLines/DeleteProductionLine/${id}`
    );
    loadProductionLine();
    if (res.status == "200") {
      toast.success(".خط تولید با موفقیت حذف شد");
    }
  };

  const handleActiveManagement = async (id) => {
    await axios.put(
      `https://localhost:7295/api/ProductionLines/ActiveProductionline/${id}`
    );
    loadProductionLine();
  };

  return (
    <div className="container">
      <Link className="btn mt-3 px-4 py-2" to="/produtionLine/add" id="addbtn">
        ایجاد خط تولید
      </Link>

      <table className="table table-bordered mt-3 table-hover">
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
                    className="form-check-input"
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
                <Link
                  className="btn btn-success"
                  to={`/productionline/edit/${x.Id}`}
                >
                  ویرایش
                </Link>
                <a
                  className="btn btn-danger mx-2 px-3"
                  onClick={() => deleteProductionLine(x.Id)}
                >
                  حذف
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;