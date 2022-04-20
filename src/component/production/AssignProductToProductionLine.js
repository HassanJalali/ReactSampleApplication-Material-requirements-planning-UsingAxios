import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AssignProductToProductionLine = () => {
  let navigate = useNavigate();

  const [assignProductToProductionline, SetAssignProductToProductionline] =
    useState({
      ProductionLineName: "",
      ProductionCode: "",
    });

  // const [message, setMessage] = useState({
  //   Id: "",
  //   Name: "",
  // });

  useEffect(() => {
    loadProductionLine();
  }, []);

  const [productionLineName, SetProductionLineName] = useState([]);

  const loadProductionLine = async () => {
    const result = await axios.get(
      "https://localhost:7295/api/ProductionLines/GetProductionLineName"
    );
    SetProductionLineName(result.data);
  };

  const { ProductionLineName, ProductionCode } = assignProductToProductionline;
  const onInputChange = (e) => {
    SetAssignProductToProductionline({
      ...assignProductToProductionline,
      [e.target.name]: e.target.value,
    });
  };

  const getManuficturedProduction = async () => {
    var res = await axios.get(
      `https://localhost:7295/api/Productions/GetManufacturedProductInfo?productionCode=${ProductionCode}`
      // "https://localhost:7295/api/Productions/GetManufacturedProductInfo?ProductionCode=001006993"
    );
  };

  const handleCancle = (async) => {
    navigate("/productionLineProduct");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (assignProductToProductionline.ProductionLineName == "") {
      return toast.error(".نام خط تولید را وارد کنید");
    }
    if (assignProductToProductionline.ProductionCode == "") {
      return toast.error(".کد محصول را وارد کنید");
    }

    var res = await axios
      .post(
        "https://localhost:7295/api/Productions/AssignProductionToProductionLine",
        assignProductToProductionline
      )
      .catch(function (error) {
        if (error.response) {
          toast.error(error.response.data);
        }
      });
    if (res.status == "200") {
      toast.success(".خط تولید با موفقیت ایجاد شد");
    }
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
            <input
              list="weekday"
              className="form-control form-control-md mb-2 "
              type="text"
              placeholder="نام خط تولید را انتخاب کنید."
              name="ProductionLineName"
              value={ProductionLineName}
              onChange={(e) => onInputChange(e)}
              autoComplete="off"
            />
            <datalist id="weekday">
              {productionLineName.map((cs) => (
                <option key={cs.Id} value={cs.ProductionLineName}>
                  {cs.ProductionLineName}
                </option>
              ))}
            </datalist>
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
            />
            <a
              className="btn btn-outline-success px-4"
              onClick={(e) => getManuficturedProduction(e)}
            >
              بررسی صحت کد محصول
            </a>
            {/* <div>{message}</div> */}
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
