import { React, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProductionHeader = () => {
  let navigate = useNavigate();

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

  const handleCancle = (async) => {
    navigate("/productionheader");
  };
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5 mt-5">
        <h2 className="text-center mb-4" id="formTitle">
          ایجاد سربرگ محصول
        </h2>
        {/* onSubmit={(e) => onSubmit(e)} */}
        <form>
          <div className="form-group">
            <select
              className="form-control form-control-md mb-2 "
              type="text"
              name="ProductionLineId"
              // value={ProductionLineId}
              //onChange={(e) => onInputChange(e)}
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

export default AddProductionHeader;
