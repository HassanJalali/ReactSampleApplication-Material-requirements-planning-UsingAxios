import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment-jalaali";

const ProductionHeader = () => {
  const [productionHeaders, setProductionHeaders] = useState([]);

  useEffect(() => {
    LoadProductionHeaders();
  }, []);

  const LoadProductionHeaders = async () => {
    const getData = axios.get(
      "https://localhost:7295/api/ProductionLines/GetProductionHeaders"
    );
    var res = (await getData).data;
    setProductionHeaders(res);
  };

  return (
    <div className="container">
      <Link
        className="btn mt-3 px-4 py-2"
        to="/productionheader/add"
        id="addbtn"
      >
        ایجاد سربرگ محصول
      </Link>

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
          {productionHeaders.map((x, index) => (
            <tr key={x.Id}>
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
              <td>{x.Description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductionHeader;
