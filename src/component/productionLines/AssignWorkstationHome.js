import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment-jalaali";
import axios from "axios";
import { toast } from "react-toastify";

const AssignWorkstationHome = () => {
  const [assignedWorkstations, setAssignedWorkstations] = useState([]);

  useEffect(() => {
    loadAssignedWorkstations();
  }, []);

  const loadAssignedWorkstations = async () => {
    const result = await axios.get(
      "https://localhost:7295/api/ProductionLines/GetAssignedWorkstations"
    );
    setAssignedWorkstations(result.data);
  };

  const deleteAssignedWorkstation = async (ProductionLineId, Id) => {
    var res = await axios.delete(
      `https://localhost:7295/api/ProductionLines/DeleteAssignedWorkstation/${ProductionLineId}/${Id}`
    );
    loadAssignedWorkstations();
    if (res.status == "200") {
      toast.success("ایستگاه کاری تخصیص داده شده با موفقیت حذف شد.");
    }
  };
  return (
    <div className="container">
      <Link
        className="btn mt-3 px-4 py-2"
        to="/AssignWorkstation/add"
        id="addbtn"
      >
        تخصیص ایستگاه کاری به خط تولید
      </Link>

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
                <a
                  className="btn btn-danger mx-2 px-3"
                  onClick={() =>
                    deleteAssignedWorkstation(x.ProductionLineId, x.Id)
                  }
                >
                  حذف
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssignWorkstationHome;
