import { React, useEffect, useState } from "react";
import axios from "axios";
import moment from "moment-jalaali";
import ReactTooltip from "react-tooltip";
import ProductionWorksheetDetail from "./ProductionWorksheetDetail";
import Pagination from "../paginationComponent/Pagination";
import AddProductionHeader from "./AddProductionHeader";
import "./Css/ProductionHeader.css";
import ShowProductionWorksheetDetail from "./ShowProductionWorksheetDetail";

const ProductionHeader = () => {
  const [productionHeaders, setProductionHeaders] = useState([]);

  useEffect(() => {
    LoadProductionHeaders();
  }, []);

  const LoadProductionHeaders = async () => {
    const res = axios.get(
      "https://localhost:7295/api/ProductionWorksheet/GetProductionWorksheets"
    );
    var getData = (await res).data;
    setProductionHeaders(getData);
  };
  console.log("dasdasd", productionHeaders);

  return (
    <div className="container" id="txtTruncet">
      <AddProductionHeader LoadProductionHeaders={LoadProductionHeaders} />

      <table className="table table-bordered mt-3 table-hover text-center">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">شناسه تولید</th>
            <th scope="col">نام خط تولید</th>
            <th scope="col"> نام محصول</th>
            <th scope="col"> شناسه محصول</th>
            <th scope="col"> کد پرسنلی</th>
            <th scope="col"> شیفت کاری </th>
            <th scope="col">تاریخ</th>
            <th scope="col">توضیحات</th>
            <th scope="col">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {productionHeaders.map((x, index) => (
            <tr key={x.ProductionWorksheetId}>
              <th scope="row">{index + 1}</th>
              <td>{x.ProductId}</td>
              <td>{x.ProductionLineName}</td>
              <td>{x.ProductionName}</td>
              <td>{x.ProductionCostId}</td>
              <td>{x.UserId}</td>
              <td>{x.ShiftType}</td>
              <td>
                {moment(x.Timestamp, "YYYY-M-D HH:mm:ss").format(
                  "HH:mm:ss - jYYYY/jM/jD"
                )}
              </td>

              <td
                data-tip={x.Description === "" ? "ندارد" : x.Description}
                className="txtTruncet"
              >
                {x.Description === "" ? "ندارد" : x.Description}
                <ReactTooltip
                  className="customeTheme"
                  place="top"
                  effect="float"
                />
              </td>
              <td>
                <ProductionWorksheetDetail
                  {...x}
                  LoadProductionHeaders={LoadProductionHeaders}
                />
                <ShowProductionWorksheetDetail {...x} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductionHeader;
