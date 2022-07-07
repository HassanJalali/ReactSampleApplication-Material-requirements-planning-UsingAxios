import { toast } from "react-toastify";
import moment from "moment-jalaali";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import createCache from "@emotion/cache";
import Pagination from "@mui/material/Pagination";
import { CacheProvider } from "@emotion/react";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import {
  getProductionLines,
  deleteProductionLine,
  activeProductionline,
} from "../../services/ProductionLines-Service";
import AddProductionline from "../productionLines/AddProductionline";
import EditProductionLine from "../productionLines/EditProductionLine";
import usePagination from "../Pagination/Pagination";
import "../Pagination/Css/Pagination.css";
import "./Css/Home.css";

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

const Home = () => {
  const [direction, setDirection] = useState("rtl");
  document.body.dir = direction;
  const [productionLines, setProductionLines] = useState([]);
  let [page, setPage] = useState(1);
  const PER_PAGE = 1;

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

  const count = Math.ceil(productionLines.length / PER_PAGE);
  const _DATA = usePagination(productionLines, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
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
          {_DATA.currentData().map((x, index) => (
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
          />
        </ThemeProvider>
      </CacheProvider>
    </div>
  );
};

export default Home;
