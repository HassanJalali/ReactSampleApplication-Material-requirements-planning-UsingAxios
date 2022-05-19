import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment-jalaali";
import { toast } from "react-toastify";
const WorkStation = () => {
  const [workstations, setWorkstations] = useState([]);

  useEffect(() => {
    loadWorkstations();
  }, []);

  const loadWorkstations = async () => {
    const result = await axios.get(
      "https://localhost:7295/api/Workstations/GetWorkstations"
    );
    setWorkstations(result.data);
  };

  const deleteAssignedWorkstation = async (WorkstationId) => {
    var res = await axios.delete(
      `https://localhost:7295/api/Workstations/DeleteDefineWorkstation/${WorkstationId}`
    );
    loadWorkstations();
    if (res.status == "200") {
      toast.success(
        "ایستگاه کاری تخصیص داده شده با موفقیت از خط تولید حذف شد."
      );
    }
  };
  return (
    <div className="container">
      <Link className="btn mt-3 px-4 py-2" to="/workstation/add" id="addbtn">
        تعریف ایستگاه کاری
      </Link>

      <table className="table table-bordered mt-3 table-hover text-center">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">نوع ایستگاه کاری</th>
            <th scope="col">تاریخ ایجاد</th>
            <th scope="col">عملیات </th>
          </tr>
        </thead>

        <tbody>
          {workstations.map((x, index) => (
            <tr key={x.WorkstationId}>
              <th scope="row">{index + 1}</th>
              <td>{x.WorkstationType}</td>
              <td>
                {moment(x.dateTime, "YYYY-M-D HH:mm:ss").format(
                  "HH:mm:ss - jYYYY/jM/jD"
                )}
              </td>
              <td>
                <a
                  className="btn btn-danger mx-2 px-3"
                  onClick={() => deleteAssignedWorkstation(x.WorkstationId)}
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

export default WorkStation;
