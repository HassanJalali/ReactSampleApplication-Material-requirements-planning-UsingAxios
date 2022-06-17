import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Modal, Form, Button } from "react-bootstrap";
import {
  AssignProductionToProductionLine,
  getManufacturedProductInfo,
  getProductionLineName,
} from "../../services/ProductionLines-Service";
import "./Css/AssignProductToProductionLine.css";

const AssignProductToProductionLine = (props) => {
  const [assignProductToProductionline, SetAssignProductToProductionline] =
    useState({
      ProductionLineId: "",
      ProductionCode: "",
      ProductionName: "",
      feedback: "", // valid-feedback or invalid-feedback,
      cssClass: "", // is-valid or is-invalid
    });
  const [productionLines, SetProductionLines] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    SetAssignProductToProductionline({
      ProductionLineId: "",
      ProductionCode: "",
      ProductionName: "",
    });
    setShow(true);
  };

  useEffect(() => {
    loadProductionLines();
  }, []);

  const loadProductionLines = async () => {
    const request = await getProductionLineName();
    const result = request.data;
    SetProductionLines(result);
  };

  const GetManuficturedProduction = async () => {
    const request = await getManufacturedProductInfo(ProductionCode);
    const result = request.data.Result;
    if (result === null) {
      SetAssignProductToProductionline({
        ProductionName: "محصولی با این کد وجود ندارد.",
        ProductionLineId: ProductionLineId,
        ProductionCode: "",
        feedback: "invalid-feedback",
        cssClass: "is-invalid",
      });
    } else {
      SetAssignProductToProductionline({
        ProductionName: `${result.Name}`,
        ProductionLineId: ProductionLineId,
        ProductionCode: ProductionCode,
        feedback: "valid-feedback",
        cssClass: "is-valid",
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

    const request = await AssignProductionToProductionLine(
      assignProductToProductionline
    );

    if (request.status == 200) {
      toast.success("محصول با موفقیت به خط تولید تخصیص داده شد.");
      handleClose();
      props.loadProductionLine();
    }
  };

  return (
    <>
      <Button className="btn mt-3 px-4 py-2" id="addbtn" onClick={handleShow}>
        تخصیص محصول به خط تولید
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={(e) => onSubmit(e)}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>* خط تولید </Form.Label>
              <Form.Select
                className="form-control form-control-md mb-2 "
                type="text"
                name="ProductionLineId"
                value={ProductionLineId}
                onChange={(e) => onInputChange(e)}
                autoComplete="off"
              >
                <option hidden>نام خط تولید را انتخاب کنید.</option>
                {productionLines.map((cs) => (
                  <option key={cs.Id} value={cs.Id}>
                    {cs.ProductionLineName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>* مرکز هرینه </Form.Label>
              <Form.Control
                type="number"
                className="form-control form-control-md"
                placeholder="کد محصول ۹ رقمی را وارد کنید."
                name="ProductionCode"
                value={ProductionCode}
                onChange={(e) => onInputChange(e)}
                autoComplete="off"
                onInput={(e) => (e.target.value = e.target.value.slice(0, 9))}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <div className="d-grid gap-2">
                <Button
                  variant="warning"
                  size="md"
                  onClick={(e) => GetManuficturedProduction(e)}
                >
                  بررسی صحت کد محصول
                </Button>
              </div>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <div className="mt-2">
                <span
                  className={`form-control ${assignProductToProductionline.cssClass}`}
                  name="ProductionName"
                  value={ProductionName}
                  placeholder={ProductionName}
                  onChange={(e) => onInputChange(e)}
                >
                  {ProductionName}
                </span>
              </div>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer dir={"ltr"}>
            <Button
              className="btn  m-2 w-25 "
              variant="outline-danger"
              onClick={handleClose}
            >
              لغو
            </Button>
            <Button
              type="submit"
              variant="outline-primary"
              className="btn  m-2 w-25"
            >
              ثبت
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default AssignProductToProductionLine;
