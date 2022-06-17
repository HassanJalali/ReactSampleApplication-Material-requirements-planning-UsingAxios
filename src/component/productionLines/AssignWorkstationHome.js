import { React, useState, useEffect } from "react";
import moment from "moment-jalaali";
import { toast } from "react-toastify";
import AssignWorkstationToProductionLine from "./AssignWorkstationToProductionLine";
import { Button } from "react-bootstrap";
import {
  deleteAssignedWorkstation,
  getAssignedWorkstations,
} from "../../services/ProductionLines-Service";

const AssignWorkstationHome = () => {
  const [assignedWorkstations, setAssignedWorkstations] = useState([]);

  useEffect(() => {
    loadAssignedWorkstations();
  }, []);

  const loadAssignedWorkstations = async () => {
    var result = await getAssignedWorkstations();
    var getData = result.data;
    setAssignedWorkstations(getData);
  };

  const DeleteAssignedWorkstation = async (ProductionLineId, Id) => {
    var res = await deleteAssignedWorkstation(ProductionLineId, Id);
    if (res.status == 200) {
      toast.success(
        "ایستگاه کاری تخصیص داده شده به خط تولید با موفقیت حذف شد."
      );
      loadAssignedWorkstations();
    }
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
          {assignedWorkstations.map((x, index) => (
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
    </div>
  );
};

export default AssignWorkstationHome;
