import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Css/AssignProductToProductionLine.css";

const AssignProductToProductionLine = () => {
  let navigate = useNavigate();

  const [assignProductToProductionline, SetAssignProductToProductionline] =
    useState({
      ProductionLineId: "",
      ProductionCode: "",
      ProductionName: "",
    });

  useEffect(() => {
    loadProductionLines();
  }, []);

  const [productionLines, SetProductionLines] = useState([]);
  const loadProductionLines = async () => {
    const result = await axios.get(
      "https://localhost:7295/api/ProductionLines/GetProductionLineName"
    );
    SetProductionLines(result.data);
  };

  const getManuficturedProduction = async () => {
    var res = await axios.get(
      `https://localhost:7295/api/ProductionLines/GetManufacturedProductInfo?ProductionCode=${ProductionCode}`
    );
    // 001006993
    var GetInfo = res.data.Result;
    if (GetInfo === null) {
      SetAssignProductToProductionline({
        ProductionName: "محصولی با این کد وجود ندارد.",
        ProductionLineId: ProductionLineId,
        ProductionCode: "",
      });
    } else {
      SetAssignProductToProductionline({
        ProductionName: `${GetInfo.Name}`,
        ProductionLineId: ProductionLineId,
        ProductionCode: ProductionCode,
      });
    }
  };

  const { ProductionLineId, ProductionCode, ProductionName } =
    assignProductToProductionline;
  const onInputChange = (e) => {
    SetAssignProductToProductionline({
      ...assignProductToProductionline,
      [e.target.name]: e.target.value,
    });
  };
  console.log("data get", assignProductToProductionline);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (assignProductToProductionline.ProductionLineId == "") {
      return toast.error("نام خط تولید را وارد کنید.");
    }
    if (assignProductToProductionline.ProductionCode == "") {
      return toast.error("کد محصول را وارد کنید.");
    }
    if (assignProductToProductionline.ProductionName == "") {
      return toast.error("نام محصول را وارد کنید.");
    }

    var res = await axios
      .post(
        "https://localhost:7295/api/ProductionLines/AssignProductionToProductionLine",
        assignProductToProductionline
      )
      .catch(function (error) {
        if (error.response) {
          toast.error(error.response.data);
        }
      });

    if (res.status == "200") {
      toast.success("محصول با موفقیت به خط تولید تخصیص داده شد.");
    }
    navigate("/productionLineProduct");
  };

  const handleCancle = (async) => {
    navigate("/productionLineProduct");
  };

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5 mt-5">
        <h2 className="text-center mb-4" id="formTitle">
          تخصیص محصول به خط تولید
        </h2>

        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <select
              className="form-control form-control-md mb-2 "
              type="text"
              placeholder="نام خط تولید را انتخاب کنید."
              name="ProductionLineId"
              value={ProductionLineId}
              onChange={(e) => onInputChange(e)}
              autoComplete="off"
            >
              <option defaultValue readOnly>
                نام خط تولید را انتخاب کنید.
              </option>
              {productionLines.map((cs) => (
                <option key={cs.Id} value={cs.Id}>
                  {cs.ProductionLineName}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group mb-2">
            <input
              id="customeProductionCode"
              type="number"
              className="form-control form-control-md"
              placeholder="کد محصول ۹ رقمی را وارد کنید."
              name="ProductionCode"
              value={ProductionCode}
              onChange={(e) => onInputChange(e)}
              autoComplete="off"
              onInput={(e) => (e.target.value = e.target.value.slice(0, 9))}
            />
            <a
              className="btn btn-outline-success px-4"
              onClick={(e) => getManuficturedProduction(e)}
            >
              بررسی صحت کد محصول
            </a>
            <div className="mt-2">
              <span
                className="text-success w-50"
                name="ProductionName"
                value={ProductionName}
                placeholder={ProductionName}
                onChange={(e) => onInputChange(e)}
              >
                {ProductionName}
              </span>
            </div>
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

export default AssignProductToProductionLine;
