import axios from "axios";
import { React, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AssignWorkstationToProductionLine = () => {
  let navigate = useNavigate();
  const [assignWorkstation, setAssignWorkstation] = useState({
    ProductionLineId: "",
    WorkstationTypeId: "",
    WorkstationAssignmentOrder: "",
  });

  useEffect(() => {
    loadProductionLine();
    loadWorkstationTypes();
  }, []);

  const [productionLineName, SetProductionLineName] = useState([]);
  const loadProductionLine = async () => {
    const result = await axios.get(
      "https://localhost:7295/api/ProductionLines/GetProductionLineName"
    );
    SetProductionLineName(result.data);
  };

  const [workstationTypes, setWorkstationTypes] = useState([]);
  const loadWorkstationTypes = async () => {
    const result = await axios.get(
      "https://localhost:7295/api/Workstations/GetWorkstations"
    );
    setWorkstationTypes(result.data);
  };

  const { ProductionLineId, WorkstationTypeId, WorkstationAssignmentOrder } =
    assignWorkstation;
  const onInputChange = (e) => {
    setAssignWorkstation({
      ...assignWorkstation,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (assignWorkstation.ProductionLineId == "") {
      return toast.error(".نام خط تولید را وارد کنید");
    }
    if (assignWorkstation.WorkstationTypeId == "") {
      return toast.error(".نوع ایستگاه کاری را انتخاب کنید.");
    }
    if (assignWorkstation.WorkstationAssignmentOrder == "") {
      return toast.error(".ترتیب ایستگاه کاری را انتخاب کنید");
    }
    var res = await axios
      .post(
        "https://localhost:7295/api/ProductionLines/AssignWorkStationToProductionLine",
        assignWorkstation
      )
      .catch(function (error) {
        if (error.response) {
          toast.error(error.response.data);
        }
      });

    if (res.status == "200") {
      navigate("/AssignWorkstationHome");
      toast.success("ایستگاه کاری با موفقیت به خط تولید تخصیص داده شد.");
    }
  };
  const handleCancle = (async) => {
    navigate("/AssignWorkstationHome");
  };
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5 mt-5">
        <h2 className="text-center mb-4" id="formTitle">
          تخصیص ایستگاه کاری به خط تولید
        </h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <select
              className="form-control form-control-md mb-2 "
              type="text"
              name="ProductionLineId"
              value={ProductionLineId}
              onChange={(e) => onInputChange(e)}
              autoComplete="off"
            >
              <option defaultValue readOnly>
                نام خط تولید را انتخاب کنید.
              </option>
              {productionLineName.map((cs) => (
                <option key={cs.Id} value={cs.Id}>
                  {cs.ProductionLineName}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <select
              className="form-control form-control-md mb-2 "
              type="text"
              placeholder="نوع ایستگاه کاری را انتخاب کنید."
              name="WorkstationTypeId"
              value={WorkstationTypeId}
              onChange={(e) => onInputChange(e)}
              autoComplete="off"
            >
              <option defaultValue readOnly>
                نوع ایستگاه کاری را انتخاب کنید
              </option>
              {workstationTypes.map((cs) => (
                <option key={cs.WorkstationId} value={cs.WorkstationId}>
                  {cs.WorkstationType}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group mb-2">
            <input
              type="text"
              className="form-control form-control-md"
              placeholder="ترتیب ایستگاه کاری را وارد کنید."
              name="WorkstationAssignmentOrder"
              value={WorkstationAssignmentOrder}
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

export default AssignWorkstationToProductionLine;
