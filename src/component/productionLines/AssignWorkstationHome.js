import { React, useState, useEffect } from "react";
import moment from "moment-jalaali";
import axios from "axios";
import { toast } from "react-toastify";
import Pagination from "../paginationComponent/Pagination";
import AssignWorkstationToProductionLine from "./AssignWorkstationToProductionLine";
import { Button } from "react-bootstrap";

const AssignWorkstationHome = () => {
  const [assignedWorkstations, setAssignedWorkstations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [assignedWorkstationsPerPage, setAssignedWorkstationsPerPage] =
    useState(10);

  useEffect(() => {
    loadAssignedWorkstations();
  }, []);

  const loadAssignedWorkstations = async () => {
    const result = await axios.get(
      "https://localhost:7295/api/ProductionLines/GetAssignedWorkstations"
    );
    var getData = result.data;
    setAssignedWorkstations(getData);
  };

  const deleteAssignedWorkstation = async (ProductionLineId, Id) => {
    var res = await axios.delete(
      `https://localhost:7295/api/ProductionLines/DeleteAssignedWorkstation/${ProductionLineId}/${Id}`
    );
    if (res.status == 200) {
      toast.success(
        "ایستگاه کاری تخصیص داده شده به خط تولید با موفقیت حذف شد."
      );
      loadAssignedWorkstations();
    }
  };

  /////Pagination
  const indexOfLastAWS = currentPage * assignedWorkstationsPerPage;
  const indexOfFirstAWS = indexOfLastAWS - assignedWorkstationsPerPage;
  const currentassignedWorkstations = assignedWorkstations.slice(
    indexOfFirstAWS,
    indexOfLastAWS
  );
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="container">
      <AssignWorkstationToProductionLine
        loadAssignedWorkstations={loadAssignedWorkstations}
      />

      <table className="table table-bordered mt-3 table-hover text-center">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">نام خط تولید</th>
            <th scope="col"> نوع ایستگاه کاری </th>
            <th scope="col"> ترتیب ایستگاه کاری </th>
            <th scope="col">تاریخ تخصیص</th>
            <th scope="col">عملیات </th>
          </tr>
        </thead>
        <tbody>
          {currentassignedWorkstations.map((x, index) => (
            <tr key={x.Id}>
              <th scope="row">{index + 1}</th>
              <td>{x.ProductionLineName}</td>
              <td>{x.WorkstationType}</td>
              <td>{x.WorkstationAssignmentOrder}</td>
              <td>
                {moment(x.Timestamp, "YYYY-M-D HH:mm:ss").format(
                  "HH:mm:ss - jYYYY/jM/jD"
                )}
              </td>
              <td>
                <Button
                  variant="outline-danger"
                  className="btn  mx-2 px-3"
                  onClick={() =>
                    deleteAssignedWorkstation(x.ProductionLineId, x.Id)
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
          postsPerPage={assignedWorkstationsPerPage}
          totalPosts={assignedWorkstations.length}
        />
      </div>
    </div>
  );
};

export default AssignWorkstationHome;
