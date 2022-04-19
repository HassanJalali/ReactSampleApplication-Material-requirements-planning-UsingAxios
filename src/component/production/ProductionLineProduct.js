import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ProductionLineProduct = () => {
  const [productionLines, setProductionLines] = useState([]);

  useEffect(() => {
    loadProductionLine();
  }, []);

  const loadProductionLine = async () => {
    const result = await axios.get(
      "https://localhost:7295/api/Productions/GetAssignedProduction"
    );
    setProductionLines(result.data);
  };

  const handleActiveManagement = async (id) => {
    await axios.put(
      `https://localhost:7295/api/Productions/ActiveAssignedProduction/${id}`
    );
    loadProductionLine();
  };

  return (
    <div className="container">
      <Link
        className="btn mt-3 px-4 py-2"
        to="/assignProductToProductionLine/add"
        id="addbtn"
      >
        تخصیص محصول به خط تولید
      </Link>

      <table className="table table-bordered mt-3 table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">نام خط تولید</th>
            <th scope="col"> کد محصول</th>
            <th scope="col">فعال </th>
          </tr>
        </thead>
        <tbody>
          {productionLines.map((x, index) => (
            <tr key={x.Id}>
              <th scope="row">{index + 1}</th>
              <td>{x.ProductionLineName}</td>
              <td>{x.ProductionCode}</td>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductionLineProduct;
