import { React, useEffect, useState } from "react";
import axios from "axios";
import moment from "moment-jalaali";
import ReactTooltip from "react-tooltip";
import Pagination from "../paginationComponent/Pagination";
import AddProductionHeader from "./AddProductionHeader";
import "./Css/ProductionHeader.css";

const ProductionHeader = () => {
  const [productionHeaders, setProductionHeaders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productionHeadersPerPage, setProductionHeadersPerPage] = useState(10);

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

  /////Pagination
  const indexOfLastPH = currentPage * productionHeadersPerPage;
  const indexOfFirstPH = indexOfLastPH - productionHeadersPerPage;
  const currentProductionHeaders = productionHeaders.slice(
    indexOfFirstPH,
    indexOfLastPH
  );
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
          </tr>
        </thead>
        <tbody>
          {currentProductionHeaders.map((x, index) => (
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
              <td className="txtTruncet">
                {x.Description === "" ? "-" : x.Description}
                {/* <ReactTooltip
                  place="top"
                  type="success"
                  effect="float" data-tip="React-tooltip"
                  className="customeTheme"
                >
                  {x.Description}
                </ReactTooltip> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <Pagination
          paginate={paginate}
          postsPerPage={productionHeadersPerPage}
          totalPosts={productionHeaders.length}
        />
      </div>
    </div>
  );
};

export default ProductionHeader;
