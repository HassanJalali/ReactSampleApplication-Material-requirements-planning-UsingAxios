import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import moment from "moment-jalaali";
import Pagination from "../paginationComponent/Pagination";
import AddProductionline from "../productionLines/AddProductionline";
import "./Css/Home.css";
import EditProductionLine from "../productionLines/EditProductionLine";

const Home = () => {
  const [productionLines, setProductionLines] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productionLinesPerPage, setProductionLinesPerPage] = useState(10);

  useEffect(() => {
    loadProductionLine();
  }, []);

  const loadProductionLine = async () => {
    const result = await axios.get(
      "https://localhost:7295/api/ProductionLines/GetProductionLines"
    );
    var getData = result.data;
    setProductionLines(getData);
  };

  const deleteProductionLine = async (id) => {
    var res = await axios
      .delete(
        `https://localhost:7295/api/ProductionLines/DeleteProductionLine/${id}`
      )
      .catch(function (error) {
        if (error.response) {
          toast.error(error.response.data);
        }
      });

    if (res.status == 200) {
      toast.success("خط تولید با موفقیت حذف شد.");
      loadProductionLine();
    }
  };

  const handleActiveManagement = async (id) => {
    var res = await axios
      .put(
        `https://localhost:7295/api/ProductionLines/ActiveProductionline/${id}`
      )
      .catch(function (error) {
        if (error.response) {
          toast.error(error.response.data);
        }
      });

    if (res.status == 200) {
      loadProductionLine();
    }
  };

  ///Pagination
  const indexOfLastPL = currentPage * productionLinesPerPage;
  const indexOfFirstPL = indexOfLastPL - productionLinesPerPage;
  const currentPosts = productionLines.slice(indexOfFirstPL, indexOfLastPL);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
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
          {currentPosts.map((x, index) => (
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
                  onClick={() => deleteProductionLine(x.Id)}
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
          postsPerPage={productionLinesPerPage}
          totalPosts={productionLines.length}
        />
      </div>
    </div>
  );
};

export default Home;
