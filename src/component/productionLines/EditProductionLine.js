import { React, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import "./Css/EditProductioLine.css";

const EditProductionLine = () => {
  let navigate = useNavigate();
  const { id } = useParams();
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

  useEffect(() => {
    loadProductionLine();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (productionLine.ProductionLineName == "") {
      return toast.error(".نام خط تولید را وارد کنید");
    }
    if (productionLine.CostCenterName == "") {
      return toast.error(" .نام مرکز هزینه را انتخاب کنید");
    }
    var res = await axios.put(
      `https://localhost:7295/api/ProductionLines/UpdateProductionLine/${id}`,
      productionLine
    );
    if (res.status == "200") {
      toast.success(".خط تولید با موفقیت ویرایش شد");
    }
    navigate("/");
  };

  const loadProductionLine = async () => {
    const result = await axios.get(
      `https://localhost:7295/api/ProductionLines/GetProductionLineById/${id}`
    );
    setProductionline(result.data);
  };

  const handleCancle = (async) => {
    navigate("/");
  };

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5 mt-5">
        <h2 className="text-center mb-4" id="formTitle">
          ویرایش خط تولید
        </h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group mb-2">
            <input
              type="text"
              className="form-control form-control-md "
              placeholder="نام خط تولید را وارد کنید."
              name="ProductionLineName"
              value={ProductionLineName}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="form-group">
            <select
              className="form-select form-control form-control-md mb-2 "
              type="text"
              placeholder="نام مرکز تولید را وارد کنید."
              name="CostCenterName"
              value={CostCenterName}
              onChange={(e) => onInputChange(e)}
            >
              <option selected>{CostCenterName}</option>
              {costCenters.map((cs) => (
                <option key={cs.Id} value={cs.Name}>
                  {cs.Name}
                </option>
              ))}
            </select>
          </div>
          <button className="btn btn-primary w-25 ">ویرایش </button>
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

export default EditProductionLine;
