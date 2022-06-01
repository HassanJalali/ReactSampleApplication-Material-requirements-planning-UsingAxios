import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal, Form, Button } from "react-bootstrap";
import "./Css/AssignProductToProductionLine.css";

const AssignProductToProductionLine = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
              <Form.Label>* نام خط تولید </Form.Label>
              <select
                className="form-control form-control-md mb-2 "
                type="text"
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
                  variant="outline-primary"
                  size="md"
                  onClick={(e) => getManuficturedProduction(e)}
                >
                  بررسی صحت کد محصول
                </Button>
              </div>
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlInput1">
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
            </Form.Group>
          </Modal.Body>
          <Modal.Footer dir={"ltr"}>
            <Button className="btn btn-danger m-2 w-25 " onClick={handleClose}>
              لغو
            </Button>
            <Button type="submit" className="btn btn-primary m-2 w-25">
              ثبت
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default AssignProductToProductionLine;
