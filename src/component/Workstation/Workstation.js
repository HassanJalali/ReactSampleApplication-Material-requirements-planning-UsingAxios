import { createTheme, ThemeProvider } from "@mui/material/styles";
import createCache from "@emotion/cache";
import Pagination from "@mui/material/Pagination";
import { CacheProvider } from "@emotion/react";
import usePagination from "../Pagination/Pagination";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { toast } from "react-toastify";
import moment from "moment-jalaali";
import { Button } from "react-bootstrap";
import { React, useEffect, useState } from "react";
import {
  deleteDefineWorkstation,
  getWorkstations,
} from "../../services/Workstation-Service";
import AddWorkstation from "./AddWorkstation";

const themeRtl = createTheme({
  direction: "rtl", // Both here and <body dir="rtl">
});
const themeLtr = createTheme({
  direction: "ltr", // Both here and <body dir="ltr">
});
// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const WorkStation = () => {
  const [direction, setDirection] = useState("rtl");
  document.body.dir = direction;
  const [workstations, setWorkstations] = useState([]);
  let [page, setPage] = useState(1);
  const PER_PAGE = 2;

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
        <CacheProvider value={cacheRtl}>
          <ThemeProvider theme={direction === "rtl" ? themeRtl : themeLtr}>
            <Pagination
              count={count}
              variant="outlined"
              size="large"
              page={page}
              defaultPage={0}
              onChange={handleChange}
              color="primary"
              siblingCount={1}
              showFirstButton
              showLastButton
              //boundaryCount={1}
            />
          </ThemeProvider>
        </CacheProvider>
      </div>
    </>
  );
};

export default WorkStation;
