import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "./Css/ProductionLineProduct.css";
import AssignProductionCost from "../productionLines/AssignProductionCost";
import AssignProductToProductionLine from "./AssignProductToProductionLine";
import {
  activeAssignedProduction,
  deleteAssignedProduction,
  getAssignedProduction,
  getAssignedProductionsByProductionLineName,
  getAssignedProductionsByProductionName,
} from "../../services/ProductionLines-Service";

const ProductionLineProduct = () => {
  const [productionLines, setProductionLines] = useState([]);
  const [productionLineName, setProductionLineName] = useState({
    ProductionLineName: "",
  });

  const [productionName, setProductionName] = useState({
    ProductionName: "",
  });

  useEffect(() => {
    loadProductionLine();
  }, []);

  const loadProductionLine = async () => {
    const result = await getAssignedProduction();
    var getData = result.data;
    setProductionLines(getData);
    setProductionLineName({ ProductionLineName: "" });
    setProductionName({ ProductionName: "" });
  };

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

  const GetAssignedProductionByProductionLineName = async () => {
    var result = await getAssignedProductionsByProductionLineName(
      ProductionLineName
    );
    var getData = result.data;
    setProductionLines(getData);
  };

  const GetAssignedProductionByProductionName = async () => {
    var result = await getAssignedProductionsByProductionName(ProductionName);
    var getData = result.data;
    setProductionLines(getData);
  };

  const handleActiveManagement = async (ProductionLineId, ProductionId) => {
    var res = await activeAssignedProduction(ProductionLineId, ProductionId);
    loadProductionLine();
  };

  const DeleteAssignedProduction = async (
    ProductionLineId,
    ProductionId,
    ProductionCode
  ) => {
    var res = await deleteAssignedProduction(
      ProductionLineId,
      ProductionId,
      ProductionCode
    );

    if (res.status === 200) {
      toast.success("محصول تخصیص داده شده با موفقیت از خط تولید حذف شد.");
      loadProductionLine();
    }
  };

  return (
    <div className="container">
      <AssignProductToProductionLine loadProductionLine={loadProductionLine} />

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
                <Button
                  variant="outline-secondary"
                  className="btn"
                  onClick={(e) => GetAssignedProductionByProductionLineName(e)}
                  type="button"
                >
                  جستوجو
                </Button>
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
                autoComplete="off"
                value={ProductionName}
                onChange={(e) => onProductionNameChange(e)}
                type="text"
                className="form-control"
                placeholder="نام محصول را وارد کنید."
              />
              <span className="input-group-btn">
                <Button
                  variant="outline-secondary"
                  className="btn"
                  onClick={(e) => GetAssignedProductionByProductionName(e)}
                  type="button"
                >
                  جستوجو
                </Button>
              </span>
            </div>
          </div>
          <div className="col-lg-2">
            <div>
              <span> * انتخاب همه</span>
            </div>
            <div className=" mt-2">
              <span className="input-group-btn">
                <Button
                  variant="outline-secondary"
                  className="btn"
                  onClick={(e) => loadProductionLine(e)}
                  type="button"
                >
                  انتخاب همه
                </Button>
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
              <td className="center">
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
                <Button
                  variant="outline-danger"
                  className="btn  mx-2 px-3"
                  onClick={() =>
                    DeleteAssignedProduction(
                      x.ProductionLineId,
                      x.ProductionId,
                      x.ProductionCode
                    )
                  }
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

export default ProductionLineProduct;
