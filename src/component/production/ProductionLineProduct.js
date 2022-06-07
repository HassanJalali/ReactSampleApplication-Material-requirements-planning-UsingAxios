import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import Pagination from "../paginationComponent/Pagination";
import { toast } from "react-toastify";
import "./Css/ProductionLineProduct.css";
import AssignProductionCost from "../productionLines/AssignProductionCost";
import AssignProductToProductionLine from "./AssignProductToProductionLine";

const ProductionLineProduct = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productionsPerPage, setProductionsPerPage] = useState(10);
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
    const result = await axios.get(
      "https://localhost:7295/api/ProductionLines/GetAssignedProduction"
    );
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

  const getAssignedProductionByProductionLineName = async () => {
    const result = await axios.get(
      `https://localhost:7295/api/ProductionLines/GetAssignedProductionsByProductionLineName?productionLineName=${ProductionLineName}`
    );
    var getData = result.data;
    setProductionLines(getData);
  };

  const getAssignedProductionByProductionName = async () => {
    const result = await axios.get(
      `https://localhost:7295/api/ProductionLines/GetAssignedProductionsByProductionName?productionName=${ProductionName}`
    );
    var getData = result.data;
    setProductionLines(getData);
  };

  const handleActiveManagement = async (ProductionLineId, ProductionId) => {
    var res = await axios.put(
      `https://localhost:7295/api/ProductionLines/ActiveAssignedProduction/${ProductionLineId}/${ProductionId}`
    );
    loadProductionLine();
  };

  const deleteAssignedProduction = async (
    ProductionLineId,
    ProductionId,
    ProductionCode
  ) => {
    var res = await axios
      .delete(
        `https://localhost:7295/api/ProductionLines/DeleteAssignedProduction/${ProductionLineId}/${ProductionId}/${ProductionCode}`
      )
      .catch(function (error) {
        if (error.response) {
          toast.error(error.response.data);
        }
      });

    if (res.status === 200) {
      toast.success("محصول تخصیص داده شده با موفقیت از خط تولید حذف شد.");
      loadProductionLine();
    }
  };

  /////Pagination
  const indexOfLastPS = currentPage * productionsPerPage;
  const indexOfFirstPS = indexOfLastPS - productionsPerPage;
  const currentProductions = productionLines.slice(
    indexOfFirstPS,
    indexOfLastPS
  );
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
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
                  onClick={(e) => getAssignedProductionByProductionLineName(e)}
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
                  onClick={(e) => getAssignedProductionByProductionName(e)}
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
          {currentProductions.map((x, index) => (
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
                <Button
                  variant="outline-danger"
                  className="btn  mx-2 px-3"
                  onClick={() =>
                    deleteAssignedProduction(
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
      <div>
        <Pagination
          paginate={paginate}
          postsPerPage={productionsPerPage}
          totalPosts={productionLines.length}
        />
      </div>
    </div>
  );
};

export default ProductionLineProduct;
