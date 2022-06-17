import { React, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Button, Form, Modal } from "react-bootstrap";
import "./Css/EditProductioLine.css";
import {
  getProductionLineById,
  getCostCentersCode,
  updateProductionLine,
} from "../../services/ProductionLines-Service";

const EditProductionLine = (props) => {
  const [productionLineState, setProductionLineState] = useState(props);
  const [costCenters, setCostCenters] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [productionLine, setProductionline] = useState({
    CostCenterName: "",
  });

  useEffect(() => {
    loadProductionLine();
    getCostCenter();
  }, []);

  const loadProductionLine = async () => {
    var result = await getProductionLineById(productionLineState.Id);
    var getData = result.data;
    setProductionline(getData);
  };

  const getCostCenter = async () => {
    var res = await getCostCentersCode();
    var getData = res.data.Result;
    setCostCenters(getData);
  };

  const { ProductionLineName, CostCenterName } = productionLine;
  const onInputChange = (e) => {
    setProductionline({ ...productionLine, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (productionLine.CostCenterName == "") {
      return toast.error(" .نام مرکز هزینه را انتخاب کنید");
    }
    var res = await updateProductionLine(
      productionLineState.Id,
      productionLine
    );
    if (res.status == 200) {
      toast.success("خط تولید با موفقیت ویرایش شد.");
      handleClose();
      props.loadProductionLine();
    }
  };

  return (
    <>
      <Button variant="outline-success" className="btn" onClick={handleShow}>
        ویرایش
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={(e) => onSubmit(e)}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>* خط تولید </Form.Label>
              <Form.Control
                name="ProductionLineName"
                value={ProductionLineName}
                onChange={(e) => onInputChange(e)}
                type="text"
                disabled
                readOnly
                placeholder="نام خط تولید را وارد کنید."
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
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
              className="btn  m-2 w-25 "
              onClick={handleClose}
            >
              لغو
            </Button>
            <Button
              type="submit"
              variant="outline-primary"
              className="btn m-2 w-25"
            >
              ویرایش
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default EditProductionLine;
