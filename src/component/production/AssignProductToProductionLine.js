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

  // const data = axios.get(
  //   // `https://localhost:7295/api/Productions/GetManufacturedProductInfo/${assignProductToProductionline.ProductionCode}`
  //   // `https://localhost:7295/api/Productions/GetManufacturedProductInfo?productionCode=${ProductionCode}`
  //   // `https://localhost:7295/api/Productions/GetManufacturedProductInfo?productionCode=001006993`
  // );
  // console.log("???", data);

  const handleCancle = (async) => {
    navigate("/productionLineProduct");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (assignProductToProductionline.ProductionLineName == "") {
      return toast.error(".نام خط تولید را وارد کنید");
    }
    if (assignProductToProductionline.ProductionCode == null) {
      return toast.error(".کد محصول را وارد کنید");
    }

    var res = await axios.post(
      "https://localhost:7295/api/Productions/AssignProductionToProductionLine",
      assignProductToProductionline
    );
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
            <select
              className="form-select form-control form-control-md mb-2 "
              type="text"
              name="ProductionLineName"
              value={ProductionLineName}
              onChange={(e) => onInputChange(e)}
              autoComplete="off"
            >
              <option style={{ display: "none" }}>
                نام خط تولید را انتخاب کنید.
              </option>
              {productionLineName.map((cs) => (
                <option key={cs.Id} value={cs.ProductionLineName}>
                  {cs.ProductionLineName}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group mb-2">
            <input
              type="text"
              className="form-control form-control-md"
              placeholder="کد محصول را وارد کنید."
              name="ProductionCode"
              value={ProductionCode}
              onChange={(e) => onInputChange(e)}
              autoComplete="off"
            />
          </div>
          {/* <div className="invalid-feedback">{this.state.message}</div> */}
          <button className="btn btn-primary w-25 ">ثبت</button>
          {/* <button className="btn btn-primary w-25 " onClick={() => data}>
            send data
          </button> */}
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
{
  /* <div className="input-group mb-2">
            <input
              type="text"
              className="form-control form-control-md"
              name="ProductionCode"
              value={ProductionCode}
              onChange={(e) => onInputChange(e)}
              autoComplete="off"
              placeholder="کد محصول را وارد کنید."
              aria-describedby="basic-addon2"
            />
            <div className="input-group-append">
              <button
                onClick={data}
                className="btn btn-outline-secondary"
                type="button"
              >
                بررسی
              </button>
            </div>
          </div> */
}
