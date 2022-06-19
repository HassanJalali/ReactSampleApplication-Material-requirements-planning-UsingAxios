import { React, useEffect, useState } from "react";
import moment from "moment-jalaali";
import ReactTooltip from "react-tooltip";
import ProductionWorksheetDetail from "./ProductionWorksheetDetail";
import AddProductionHeader from "./AddProductionHeader";
import ShowProductionWorksheetDetail from "./ShowProductionWorksheetDetail";
import { getProductionWorksheets } from "../../services/ProductionWorksheet-Service";
import { Pagination } from "@material-ui/lab";
import usePagination from "../Pagination/Pagination";
import "./Css/ProductionHeader.css";

const ProductionHeader = () => {
  const [productionHeaders, setProductionHeaders] = useState([]);
  let [page, setPage] = useState(1);
  const PER_PAGE = 10;

  useEffect(() => {
    LoadProductionHeaders();
  }, []);

  const LoadProductionHeaders = async () => {
    const request = await getProductionWorksheets();
    const result = request.data;
    setProductionHeaders(result);
  };

  const count = Math.ceil(productionHeaders.length / PER_PAGE);
  const _DATA = usePagination(productionHeaders, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
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
            <th scope="col">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {_DATA.currentData().map((x, index) => (
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
                  // style={{ width: "100%", wordBreak: "break-all" }}
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
      <Pagination
        count={count}
        size="large"
        page={page}
        variant="outlined"
        color="primary"
        onChange={handleChange}
      />
    </div>
  );
};

export default ProductionHeader;
