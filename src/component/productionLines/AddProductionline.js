import { React, useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  createProductionLine,
  getCostCentersCode,
} from "../../services/ProductionLines-Service";
import "./Css/AddProductionline.css";

const AddProductionline = (props) => {
  const [productionLine, setProductionline] = useState({
    ProductionLineName: "",
    CostCenterName: "",
  });

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setProductionline({ ProductionLineName: "", CostCenterName: "" });
    setShow(true);
  };

  const [costCenters, setCostCenters] = useState([]);

  const getCostCenter = async () => {
    const request = await getCostCentersCode();
    const result = request.data.Result;
    setCostCenters(result);
  };

  const { ProductionLineName, CostCenterName } = productionLine;
  const onInputChange = (e) => {
    setProductionline({ ...productionLine, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (productionLine.ProductionLineName == "") {
      return toast.error("نام خط تولید را وارد کنید.");
    }
    if (productionLine.CostCenterName == "") {
      return toast.error(" نام مرکز هزینه را انتخاب کنید.");
    }

    const request = await createProductionLine(productionLine);
    if (request.status == 200) {
      toast.success("خط تولید با موفقیت ایجاد شد.");
      handleClose();
      props.loadProductionLine();
    }
  };

  return (
    <>
      <Button
        id="addbtn"
        className="btn mt-3 px-4 py-2"
        onClick={() => {
          handleShow();
          getCostCenter();
        }}
      >
        ایجاد خط تولید
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={(e) => onSubmit(e)}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>* خط تولید </Form.Label>
              <Form.Control
                autoComplete="off"
                name="ProductionLineName"
                value={ProductionLineName}
                onChange={(e) => onInputChange(e)}
                type="text"
                placeholder="نام خط تولید را وارد کنید."
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlInput1"
              list="weekday"
            >
              <Form.Label>* مرکز هرینه </Form.Label>
              <input
                list="costCenter"
                className="form-control form-control-md mb-2 "
                type="text"
                placeholder="نام مرکز هزینه را وارد کنید."
                name="CostCenterName"
                value={CostCenterName}
                onChange={(e) => onInputChange(e)}
                autoComplete="off"
              />
              <datalist id="costCenter">
                {costCenters.map((cs) => (
                  <option key={cs.Id} value={cs.Name}>
                    {cs.Name}
                  </option>
                ))}
              </datalist>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer dir={"ltr"}>
            <Button
              variant="outline-danger"
              className="btn m-2 w-25 "
              onClick={handleClose}
            >
              لغو
            </Button>
            <Button
              type="submit"
              variant="outline-primary"
              className="btn m-2 w-25"
            >
              ثبت
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default AddProductionline;

//         <div className="form-group">
//           <input
//             list="weekday"
//             className="form-control form-control-md mb-2 "
//             type="text"
//             placeholder="نام مرکز تولید را وارد کنید."
//             name="CostCenterName"
//             value={CostCenterName}
//             onChange={(e) => onInputChange(e)}
//           />
//           <datalist id="weekday">
//             {costCenters.map((cs) => (
//               <option key={cs.Id} value={cs.Name}>
//                 {cs.Name}
//               </option>
//             ))}
//           </datalist>
//         </div>
