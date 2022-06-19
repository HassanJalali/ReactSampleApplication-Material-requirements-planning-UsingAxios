import { React, useEffect, useState } from "react";
import {
  deleteDefineWorkstation,
  getWorkstations,
} from "../../services/Workstation-Service";
import moment from "moment-jalaali";
import { toast } from "react-toastify";
import AddWorkstation from "./AddWorkstation";
import { Button } from "react-bootstrap";
import { Pagination } from "@material-ui/lab";
import usePagination from "../Pagination/Pagination";

const WorkStation = () => {
  const [workstations, setWorkstations] = useState([]);
  let [page, setPage] = useState(1);
  const PER_PAGE = 10;

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

  const count = Math.ceil(workstations.length / PER_PAGE);
  const _DATA = usePagination(workstations, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
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
            {_DATA.currentData().map((x, index) => (
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
        <Pagination
          count={count}
          size="large"
          page={page}
          variant="outlined"
          color="primary"
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default WorkStation;
