import { React, useState, useEffect } from "react";
import moment from "moment-jalaali";
import { toast } from "react-toastify";
import AssignWorkstationToProductionLine from "./AssignWorkstationToProductionLine";
import { Button } from "react-bootstrap";
import {
  deleteAssignedWorkstation,
  getAssignedWorkstations,
} from "../../services/ProductionLines-Service";
import { Pagination } from "@material-ui/lab";
import usePagination from "../Pagination/Pagination";

const AssignWorkstationHome = () => {
  const [assignedWorkstations, setAssignedWorkstations] = useState([]);
  let [page, setPage] = useState(1);
  const PER_PAGE = 10;

  useEffect(() => {
    loadAssignedWorkstations();
  }, []);

  const loadAssignedWorkstations = async () => {
    const request = await getAssignedWorkstations();
    const result = request.data;
    setAssignedWorkstations(result);
  };

  const DeleteAssignedWorkstation = async (ProductionLineId, Id) => {
    const request = await deleteAssignedWorkstation(ProductionLineId, Id);
    if (request.status == 200) {
      toast.success(
        "ایستگاه کاری تخصیص داده شده به خط تولید با موفقیت حذف شد."
      );
      loadAssignedWorkstations();
    }
  };

  const count = Math.ceil(assignedWorkstations.length / PER_PAGE);
  const _DATA = usePagination(assignedWorkstations, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
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
          {_DATA.currentData().map((x, index) => (
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
                    DeleteAssignedWorkstation(x.ProductionLineId, x.Id)
                  }
                >
                  حذف
                </Button>
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

export default AssignWorkstationHome;
