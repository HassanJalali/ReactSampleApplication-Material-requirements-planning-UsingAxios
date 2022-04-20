import axios from "axios";
import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Css/AddProductionline.css";

const AddProductionline = () => {
  let navigate = useNavigate();

  const [productionLine, setProductionline] = useState({
    ProductionLineName: "",
    CostCenterName: "",
  });

  const [costCenters, setCostCenters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const req = await axios(
        "https://localhost:7295/api/ProductionLines/GetCostCentersCode"
      );
      setCostCenters(req.data.Result);
    };
    fetchData();
  }, []);

  const { ProductionLineName, CostCenterName } = productionLine;
  const onInputChange = (e) => {
    setProductionline({ ...productionLine, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (productionLine.ProductionLineName == "") {
      return toast.error(".نام خط تولید را وارد کنید");
    }
    if (productionLine.CostCenterName == "") {
      return toast.error(" .نام مرکز هزینه را انتخاب کنید");
    }

    var res = await axios
      .post(
        "https://localhost:7295/api/ProductionLines/CreateProductionLine",
        productionLine
      )
      .catch(function (error) {
        if (error.response) {
          toast.error(error.response.data);
        }
      });
    if (res.status == "200") {
      toast.success(".خط تولید با موفقیت ایجاد شد");
    }
    navigate("/");
  };

  const handleCancle = (async) => {
    navigate("/");
  };

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5 mt-5">
        <h2 className="text-center mb-4" id="formTitle">
          ایجاد خط تولید
        </h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group mb-2">
            <input
              type="text"
              className="form-control form-control-md"
              placeholder="نام خط تولید را وارد کنید."
              name="ProductionLineName"
              value={ProductionLineName}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="form-group">
            <input
              list="weekday"
              className="form-control form-control-md mb-2 "
              type="text"
              placeholder="نام مرکز تولید را وارد کنید."
              name="CostCenterName"
              value={CostCenterName}
              onChange={(e) => onInputChange(e)}
            />
            <datalist id="weekday">
              {costCenters.map((cs) => (
                <option key={cs.Id} value={cs.Name}>
                  {cs.Name}
                </option>
              ))}
            </datalist>
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

export default AddProductionline;
