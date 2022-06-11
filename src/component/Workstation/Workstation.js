import { React, useEffect, useState } from "react";
import axios from "axios";
import moment from "moment-jalaali";
import { toast } from "react-toastify";
import AddWorkstation from "./AddWorkstation";
import { Button } from "react-bootstrap";

const WorkStation = () => {
  const [workstations, setWorkstations] = useState([]);
  const [number, setNumber] = useState(1); // No of pages
  const [postPerPage] = useState(1);

  useEffect(() => {
    loadWorkstations();
  }, []);

  const loadWorkstations = async () => {
    const result = await axios.get(
      "https://localhost:7295/api/Workstations/GetWorkstations"
    );
    const getData = result.data;
    setWorkstations(getData);
  };

  const deleteWorkstation = async (WorkstationId) => {
    var res = await axios
      .delete(
        `https://localhost:7295/api/Workstations/DeleteDefineWorkstation/${WorkstationId}`
      )
      .catch(function (error) {
        if (error.response) {
          toast.error(error.response.data);
        }
      });

    if (res.status == 200) {
      toast.success("ایستگاه کاری با موفقیت حذف شد.");
      loadWorkstations();
    }
  };

  const lastPost = number * postPerPage;
  const firstPost = lastPost - postPerPage;
  const currentPost = workstations.slice(firstPost, lastPost);
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(workstations.length / postPerPage); i++) {
    pageNumber.push(i);
  }

  const ChangePage = (pageNumber) => {
    setNumber(pageNumber);
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
            {currentPost.map((x, index) => (
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

        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center">
            <li class="page-item">
              <a
                class="page-link"
                href="#"
                onClick={() => setNumber(number + 1)}
              >
                بعدی
              </a>
            </li>
            {pageNumber.map((Elem) => {
              return (
                <>
                  <li class="page-item">
                    <a
                      class="page-link"
                      href="#"
                      onClick={() => ChangePage(Elem)}
                    >
                      {Elem}
                    </a>
                  </li>
                </>
              );
            })}

            <li class="page-item ">
              <a
                class="page-link"
                href="#"
                tabindex="-1"
                onClick={() => setNumber(number - 1)}
              >
                قبلی
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default WorkStation;
