import { React, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Modal, Button, Form } from "react-bootstrap";
import {
  getActiveAssignedProductionByProductionLineId,
  getProductionCostIdByProductionLineIdAndProductionCode,
  getProductionLineName,
} from "../../services/ProductionLines-Service";
import { createProductionWorksheet } from "../../services/ProductionWorksheet-Service";
import "./Css/AddProductionHeader.css";

const AddProductionHeader = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setProductionLineId("");
    SetProductionCode("");
    setProductionCostId("");
    SetUser("");
    Setdescription("");
    setShow(true);
  };

  useEffect(() => {
    loadProductionLine();
  }, []);

  const [productionLineName, SetProductionLineName] = useState([]);
  const [productionLineId, setProductionLineId] = useState("");
  const loadProductionLine = async () => {
    const request = await getProductionLineName();
    const result = request.data;
    SetProductionLineName(result);
  };

  const [productionName, SetProductionName] = useState([]);
  const [productionCode, SetProductionCode] = useState("");
  const onProductionLineChange = async (e) => {
    setProductionLineId(e.target.value);
    SetProductionCode("");
    setProductionCostId("");

    const request = await getActiveAssignedProductionByProductionLineId(
      e.target.value
    );
    const result = request.data;
    SetProductionName(result);
  };

  const [productionCost, SetProductionCost] = useState([]);
  const [productionCostId, setProductionCostId] = useState("");
  const onProductionChange = async (e) => {
    SetProductionCode(e.target.value);
    setProductionCostId("");
    const request =
      await getProductionCostIdByProductionLineIdAndProductionCode(
        productionLineId,
        e.target.value
      );
    const result = request.data;
    SetProductionCost(result);
  };

  const onProductionCostIdChange = (e) => {
    setProductionCostId(e.target.value);
  };

  const [userId, SetUser] = useState("");
  const onUserIdChange = (e) => {
    SetUser(e.target.value);
  };

  const [description, Setdescription] = useState("");
  const onTextAreaChange = (e) => {
    Setdescription(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (productionLineId === "") {
      return toast.error("نام خط تولید را وارد کنید.");
    }
    if (productionCode === "") {
      return toast.error("نام محصول را وارد کنید.");
    }
    if (productionCostId === "") {
      return toast.error("شناسه محصول را وارد کنید.");
    }
    if (userId === "") {
      return toast.error(" کد پرسنلی را وارد کنید.");
    }

    let params = {
      productionLineId: productionLineId,
      productionCode: productionCode,
      productionCostId: productionCostId,
      userId: userId,
      description: description,
    };

    const request = await createProductionWorksheet(params);
    if (request.status == 200) {
      toast.success("سر برگ با موفقیت ایجاد شد.");
      handleClose();
      props.LoadProductionHeaders();
    }
  };

  return (
    <>
      <Button className="btn mt-3 px-4 py-2" id="addbtn" onClick={handleShow}>
        ایجاد سربرگ محصول
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
                value={productionLineId}
                onChange={(e) => onProductionLineChange(e)}
                autoComplete="off"
              >
                <option id="setdefaultcolor" hidden>
                  نام خط تولید را انتخاب کنید.
                </option>
                {productionLineName.map((cs) => (
                  <option key={cs.Id} value={cs.Id}>
                    {cs.ProductionLineName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>* محصول </Form.Label>
              <Form.Select
                className="form-control form-control-md mb-2 "
                type="text"
                name="ProductionCode"
                value={productionCode}
                onChange={(e) => onProductionChange(e)}
                autoComplete="off"
              >
                <option hidden>نام محصول را انتخاب کنید.</option>

                {productionName.map((cs) => (
                  <option key={cs.ProductionCode} value={cs.ProductionCode}>
                    {cs.ProductionName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>* شناسه محصول </Form.Label>
              <Form.Select
                className="form-control form-control-md mb-2 "
                type="text"
                name="productionCostId"
                value={productionCostId}
                onChange={(e) => onProductionCostIdChange(e)}
                autoComplete="off"
              >
                <option hidden> شناسه محصول را انتخاب کنید.</option>
                <option value={productionCost.ProductionCostId}>
                  شناسه محصول : {productionCost.ProductionCostId}| قیمت محصول :
                  {productionCost.ProductionCost}
                </option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>* ثبات </Form.Label>
              <Form.Control
                name="userId"
                autoComplete="off"
                value={userId}
                onChange={(e) => onUserIdChange(e)}
                type="number"
                placeholder="کد پرسنلی را وارد کنید ."
                onInput={(e) => (e.target.value = e.target.value.slice(0, 7))}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label> توضیحات</Form.Label>
              <Form.Control
                id="dale"
                name="description"
                autoComplete="off"
                value={description}
                onChange={(e) => onTextAreaChange(e)}
                placeholder="توضیحات الزامی نمی باشد, در صودت نیاز می توانید این قسمت را پر کنید."
                as="textarea"
                rows={3}
              />
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

export default AddProductionHeader;
