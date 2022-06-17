import { React, useEffect, useState } from "react";
import {
  deleteDefineWorkstation,
  getWorkstations,
} from "../../services/Workstation-Service";
import moment from "moment-jalaali";
import { toast } from "react-toastify";
import AddWorkstation from "./AddWorkstation";
import { Button } from "react-bootstrap";

const WorkStation = () => {
  const [workstations, setWorkstations] = useState([]);

  useEffect(() => {
    loadWorkstations();
  }, []);

  const loadWorkstations = async () => {
    const request = await getWorkstations();
    const result = request.data;
    setWorkstations(result);
  };

  const deleteWorkstation = async (WorkstationId) => {
    const request = await deleteDefineWorkstation(WorkstationId);
    if (request.status == 200) {
      toast.success("ایستگاه کاری با موفقیت حذف شد.");
      loadWorkstations();
    }
  };

  return (
    <>
      <div className="container">
        <AddWorkstation loadWorkstations={loadWorkstations} />

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
                  <Button
                    variant="outline-danger"
                    className="btn  mx-2 px-3"
                    onClick={() => deleteWorkstation(x.WorkstationId)}
                  >
                    حذف
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default WorkStation;
