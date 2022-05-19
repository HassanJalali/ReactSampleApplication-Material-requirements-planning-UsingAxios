import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const AddWorkstation = () => {
  let navigate = useNavigate();

  const [workstation, setWorkstation] = useState({
    WorkstationType: "",
  });

  const { WorkstationType } = workstation;
  const onInputChange = (e) => {
    setWorkstation({ ...workstation, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (workstation.WorkstationType == "") {
      return toast.error(".نام ایستگاه کاری را وارد کنید");
    }

    var res = await axios
      .post(
        "https://localhost:7295/api/Workstations/DefineWorkstation",
        workstation
      )
      .catch(function (error) {
        if (error.response) {
          toast.error(error.response.data);
        }
      });
    if (res.status == "200") {
      toast.success("ایستگاه کاری با موفقیت ایجاد شد.");
    }
    navigate("/workstationHome");
  };

  const handleCancle = (async) => {
    navigate("/workstationHome");
  };
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5 mt-5">
        <h2 className="text-center mb-4" id="formTitle">
          تعریف ایستگاه کاری
        </h2>

        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group mb-2">
            <input
              type="text"
              className="form-control form-control-md"
              placeholder="نام ایستگاه کاری را وارد کنید."
              name="WorkstationType"
              value={WorkstationType}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <button className="btn btn-primary w-25 ">ثبت</button>
          <button
            className="btn btn-danger m-2 w-25 "
            onClick={(e) => handleCancle(e)}
          >
            لغو
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddWorkstation;
