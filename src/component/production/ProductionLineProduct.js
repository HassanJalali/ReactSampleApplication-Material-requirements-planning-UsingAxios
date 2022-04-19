import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Css/ProductionLineProduct.css";

const ProductionLineProduct = () => {
  let navigate = useNavigate();
  const [productionLines, setProductionLines] = useState([]);
  const [productionLineName, setProductionLineName] = useState({
    ProductionLineName: "",
  });

  const { ProductionLineName } = productionLineName;
  const onInputChange = (e) => {
    setProductionLineName({
      ...productionLineName,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    // if (!productionLineName.ProductionLineName == "") {
    //   getAssignedProductionByProductionLineName();
    // }
    // if (productionLineName.ProductionLineName == "") {
    //   navigate("/productionLineProduct");
    //   loadProductionLine();
    // }
    loadProductionLine();
  }, []);

  const loadProductionLine = async () => {
    const result = await axios.get(
      "https://localhost:7295/api/Productions/GetAssignedProduction"
    );
    setProductionLines(result.data);
  };

  const getAssignedProductionByProductionLineName = async () => {
    const result = await axios.get(
      `https://localhost:7295/api/Productions/GetAssignedProductionsByProductionLineName?productionLine=${ProductionLineName}`
    );
    setProductionLines(result.data);
  };

  const handleActiveManagement = async (id) => {
    await axios.put(
      `https://localhost:7295/api/Productions/ActiveAssignedProduction/${id}`
    );
    loadProductionLine();
  };

  const deleteAssignedProduction = async (id) => {
    var res = await axios.delete(
      `https://localhost:7295/api/Productions/DeleteAssignedProduction/${id}`
    );
    loadProductionLine();
    if (res.status == "200") {
      toast.success(".خط تولید با موفقیت حذف شد");
    }
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

      <div>
        <label
          htmlFor="formGroupExampleInput"
          className="mt-3 mb-2"
          id="lblForProductionLineNameFilter"
        >
          * جست وجو بر اساس نام خط تولید
        </label>
        <br />
        <input
          type="text"
          className="form-control form-control-md"
          id="formGroupExampleInput"
          name="ProductionLineName"
          value={ProductionLineName}
          onChange={(e) => onInputChange(e)}
          autoComplete="off"
          placeholder="نام خط تولید را وارد کنید..."
        />
        <a
          className="btn btn-danger"
          onClick={(e) => getAssignedProductionByProductionLineName(e)}
        >
          بررسی
        </a>
        <a className="btn btn-danger" onClick={(e) => loadProductionLine(e)}>
          همه
        </a>
        {/* <div>
          <button
            className="btn btn-danger mx-2 px-3 mt-2"
            onClick={(e) => loadProductionLine(e)}
          >
            همه
          </button>
        </div> */}
      </div>
      <table className="table table-bordered mt-3 table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">نام خط تولید</th>
            <th scope="col"> کد محصول</th>
            <th scope="col">فعال </th>
            <th scope="col">عملیات </th>
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
              <td>
                <a
                  className="btn btn-danger mx-2 px-3"
                  onClick={() => deleteAssignedProduction(x.Id)}
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

export default ProductionLineProduct;

/* <div>
<div className="input-group mb-3" id="productionLineNameFilter">
  <input
    type="text"
    className="form-control"
    name="ProductionLineName"
    value={ProductionLineName}
    onChange={(e) => onInputChange(e)}
    autoComplete="off"
    placeholder="نام خط تولید را وارد کنید..."
    aria-label="Recipient's username"
    aria-describedby="basic-addon2"
  />
  <div className="input-group-append">
    <button
      className="btn btn-outline-secondary"
      onClick={(e) => getAssignedProductionByProductionLineName(e)}
      type="button"
    >
      بررسی
    </button>
  </div>
</div>
</div> */
