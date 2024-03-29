import { toast } from "react-toastify";
import { React, useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import {
  getProductionLineById,
  getCostCentersCode,
  updateProductionLine,
} from "../../services/ProductionLines-Service";
import "./Css/EditProductioLine.css";

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
    setProductionLineState(props);
  }, [props]);

  const loadProductionLine = async () => {
    const request = await getProductionLineById(productionLineState.Id);
    const result = request.data;
    setProductionline(result);
  };

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
    if (productionLine.CostCenterName == "") {
      return toast.error(" نام مرکز هزینه را انتخاب کنید.");
    }
    const request = await updateProductionLine(
      productionLineState.Id,
      productionLine
    );
    if (request.status == 200) {
      toast.success("خط تولید با موفقیت ویرایش شد.");
      handleClose();
      props.loadProductionLine();
    }
  };

  return (
    <>
      <Button
        variant="outline-success"
        className="btn"
        onClick={() => {
          handleShow();
          loadProductionLine();
          getCostCenter();
        }}
      >
        ویرایش
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={(e) => onSubmit(e)}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label> خط تولید </Form.Label>
              <Form.Control
                name="ProductionLineName"
                value={ProductionLineName || ""}
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
                value={CostCenterName || ""}
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
