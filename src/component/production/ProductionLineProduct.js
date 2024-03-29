import { toast } from "react-toastify";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import createCache from "@emotion/cache";
import Pagination from "@mui/material/Pagination";
import { CacheProvider } from "@emotion/react";
import usePagination from "../Pagination/Pagination";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import AssignProductionCost from "../productionLines/AssignProductionCost";
import AssignProductToProductionLine from "./AssignProductToProductionLine";
import {
  activeAssignedProduction,
  deleteAssignedProduction,
  getAssignedProduction,
  getAssignedProductionsByProductionLineName,
  getAssignedProductionsByProductionName,
} from "../../services/ProductionLines-Service";
import "./Css/ProductionLineProduct.css";

const themeRtl = createTheme({
  direction: "rtl", // Both here and <body dir="rtl">
});
const themeLtr = createTheme({
  direction: "ltr", // Both here and <body dir="ltr">
});
// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const ProductionLineProduct = () => {
  const [direction, setDirection] = useState("rtl");
  document.body.dir = direction;
  const [productionLines, setProductionLines] = useState([]);
  const [productionLineName, setProductionLineName] = useState({
    ProductionLineName: "",
  });
  let [page, setPage] = useState(1);
  const PER_PAGE = 1;

  const [productionName, setProductionName] = useState({
    ProductionName: "",
  });

  useEffect(() => {
    loadProductionLine();
  }, []);

  const loadProductionLine = async () => {
    const request = await getAssignedProduction();
    const result = request.data;
    setProductionLines(result);
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
    const request = await getAssignedProductionsByProductionLineName(
      ProductionLineName
    );
    const result = request.data;
    setProductionLines(result);
  };

  const GetAssignedProductionByProductionName = async () => {
    const request = await getAssignedProductionsByProductionName(
      ProductionName
    );
    const result = request.data;
    setProductionLines(result);
  };

  const handleActiveManagement = async (ProductionLineId, ProductionId) => {
    const request = await activeAssignedProduction(
      ProductionLineId,
      ProductionId
    );
    loadProductionLine();
  };

  const DeleteAssignedProduction = async (
    ProductionLineId,
    ProductionId,
    ProductionCode
  ) => {
    const request = await deleteAssignedProduction(
      ProductionLineId,
      ProductionId,
      ProductionCode
    );

    if (request.status === 200) {
      toast.success("محصول تخصیص داده شده با موفقیت از خط تولید حذف شد.");
      loadProductionLine();
    }
  };

  const count = Math.ceil(productionLines.length / PER_PAGE);
  const _DATA = usePagination(productionLines, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
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
          {_DATA.currentData().map((x, index) => (
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
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={direction === "rtl" ? themeRtl : themeLtr}>
          <Pagination
            count={count}
            variant="outlined"
            size="large"
            page={page}
            defaultPage={0}
            onChange={handleChange}
            color="primary"
            siblingCount={1}
            showFirstButton
            showLastButton
            //boundaryCount={1}
          />
        </ThemeProvider>
      </CacheProvider>
    </div>
  );
};

export default ProductionLineProduct;
