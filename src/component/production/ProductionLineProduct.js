import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Css/ProductionLineProduct.css";
import AssignProductionCost from "../productionLines/AssignProductionCost";

const ProductionLineProduct = () => {
  let navigate = useNavigate();
  const [productionLines, setProductionLines] = useState([]);
  const [productionLineName, setProductionLineName] = useState({
    ProductionLineName: "",
  });
  const [productionName, setProductionName] = useState({
    ProductionName: "",
  });

  const { ProductionLineName } = productionLineName;
  const onInputChange = (e) => {
    setProductionLineName({
      ...productionLineName,
      [e.target.name]: e.target.value,
    });
  };

  const { ProductionName } = productionName;
  const onProductionNameChange = (e) => {
    setProductionName({
      ...productionName,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    loadProductionLine();
  }, []);

  const loadProductionLine = async () => {
    const result = await axios.get(
      "https://localhost:7295/api/ProductionLines/GetAssignedProduction"
    );
    setProductionLines(result.data);
    setProductionLineName({ ProductionLineName: "" });
    setProductionName({ ProductionName: "" });
  };

  const getAssignedProductionByProductionLineName = async () => {
    const result = await axios.get(
      `https://localhost:7295/api/ProductionLines/GetAssignedProductionsByProductionLineName?productionLineName=${ProductionLineName}`
    );
    setProductionLines(result.data);
  };

  const getAssignedProductionByProductionName = async () => {
    const result = await axios.get(
      `https://localhost:7295/api/ProductionLines/GetAssignedProductionsByProductionName?productionName=${ProductionName}`
    );
    setProductionLines(result.data);
  };

  const handleActiveManagement = async (ProductionLineId, ProductionId) => {
    var res = await axios.put(
      `https://localhost:7295/api/ProductionLines/ActiveAssignedProduction/${ProductionLineId}/${ProductionId}`
    );
    loadProductionLine();
  };

  const deleteAssignedProduction = async (ProductionLineId, ProductionId) => {
    var res = await axios.delete(
      `https://localhost:7295/api/ProductionLines/DeleteAssignedProduction/${ProductionLineId}/${ProductionId}`
    );
    loadProductionLine();
    if (res.status == "200") {
      toast.success("محصول تخصیص داده شده با موفقیت از خط تولید حذف شد.");
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

      <div className="mt-4">
        <div className="row">
          <div className="col-lg-4">
            <div>
              <span> * جستوجو بر اساس نام خط تولید</span>
            </div>

            <div className="input-group mt-2">
              <input
                name="ProductionLineName"
                value={ProductionLineName}
                onChange={(e) => onInputChange(e)}
                autoComplete="off"
                type="text"
                className="form-control"
                placeholder="نام خط تولید را وارد کنید."
              />
              <span className="input-group-btn">
                <button
                  className="btn btn-secondary"
                  onClick={(e) => getAssignedProductionByProductionLineName(e)}
                  type="button"
                >
                  جستوجو
                </button>
              </span>
            </div>
          </div>
          <div className="col-lg-4">
            <div>
              <span> * جستوجو بر اساس نام محصول</span>
            </div>
            <div className="input-group mt-2">
              <input
                name="ProductionName"
                value={ProductionName}
                onChange={(e) => onProductionNameChange(e)}
                type="text"
                className="form-control"
                placeholder="نام محصول را وارد کنید."
              />
              <span className="input-group-btn">
                <button
                  className="btn btn-secondary"
                  onClick={(e) => getAssignedProductionByProductionName(e)}
                  type="button"
                >
                  جستوجو
                </button>
              </span>
            </div>
          </div>
          <div className="col-lg-2">
            <div>
              <span> * انتخاب همه</span>
            </div>
            <div className=" mt-2">
              <span className="input-group-btn">
                <button
                  className="btn btn-secondary"
                  onClick={(e) => loadProductionLine(e)}
                  type="button"
                >
                  انتخاب همه
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>

      <table className="table table-bordered mt-3 table-hover text-center">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">نام خط تولید</th>
            <th scope="col">نام محصول </th>
            <th scope="col"> کد محصول</th>
            <th scope="col"> کد شناسه محصول</th>
            <th scope="col"> قیمت محصول</th>
            <th scope="col">فعال </th>
            <th scope="col">عملیات </th>
          </tr>
        </thead>
        <tbody>
          {productionLines.map((x, index) => (
            <tr key={x.ProductionId}>
              <th scope="row">{index + 1}</th>
              <td>{x.ProductionLineName}</td>
              <td>{x.ProductionName}</td>
              <td>{x.ProductionCode}</td>
              <td>{x.ProductionCostId === 0 ? "ندارد" : x.ProductionCostId}</td>
              <td>{x.ProductionCost === 0 ? "ندارد" : x.ProductionCost}</td>
              <td>
                <div className="form-check form-switch ">
                  <input
                    className="form-check-input m-auto align-middle "
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                    defaultChecked={x.IsActive}
                    onClick={() =>
                      handleActiveManagement(x.ProductionLineId, x.ProductionId)
                    }
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexSwitchCheckDefault"
                  ></label>
                </div>
              </td>
              <td>
                <AssignProductionCost
                  {...x}
                  loadProductionLine={loadProductionLine}
                />
                <a
                  className="btn btn-danger mx-2 px-3"
                  onClick={() =>
                    deleteAssignedProduction(x.ProductionLineId, x.ProductionId)
                  }
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
