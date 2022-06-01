import { React, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal, Button, Form } from "react-bootstrap";

const AddProductionHeader = (props) => {
  const [productionHeader, setProductionHeader] = useState({});

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    loadProductionLine();
  }, []);

  const [productionLineName, SetProductionLineName] = useState([]);
  const [productionLineId, setProductionLineId] = useState("");
  const loadProductionLine = async () => {
    const result = await axios.get(
      "https://localhost:7295/api/ProductionLines/GetProductionLineName"
    );
    var getData = result.data;
    SetProductionLineName(getData);
  };

  const [productionName, SetProductionName] = useState([]);
  const [productionCode, SetProductionCode] = useState("");
  const onProductionLineChange = async (e) => {
    setProductionLineId(e.target.value);
    const res = await axios.get(
      `https://localhost:7295/api/ProductionLines/GetActiveAssignedProductionByProductionLineId?productionLineId=${e.target.value}`
    );
    var getData = res.data;
    SetProductionName(getData);
  };

  const [productionCost, SetProductionCost] = useState([]);
  const [productionCostId, setProductionCostsId] = useState("");
  const onProductionChange = async (e) => {
    SetProductionCode(e.target.value);
    const res = await axios.get(
      `https://localhost:7295/api/ProductionLines/GetProductionCostIdByProductionLineIdAndProductionCode/${productionLineId}/${e.target.value}`
    );

    var getData = res.data;
    SetProductionCost(getData);
  };

  const onProductionCostIdChange = (e) => {
    setProductionCostsId(e.target.value);
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

    // var data = {
    //   params: {
    //     productionLineId,
    //     productionCode,
    //     productionCostId,
    //     userId,
    //     description,
    //   },
    // };
    console.log("getdata", productionHeader);
    var res = await axios
      .post(
        "https://localhost:7295/api/ProductionLines/CreateProductionHeader",
        productionHeader
      )

      .catch(function (error) {
        if (error.response) {
          toast.error(error.response.data);
        }
      });
    if (res.status == "200") {
      return toast.success("سر برگ با موفقیت ایجاد شد.");
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
              <Form.Label>* نام خط تولید </Form.Label>
              <select
                className="form-control form-control-md mb-2 "
                type="text"
                name="ProductionLineId"
                value={productionLineId}
                onChange={(e) => onProductionLineChange(e)}
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
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>* نام محصول </Form.Label>
              <select
                className="form-control form-control-md mb-2 "
                type="text"
                name="ProductionCode"
                value={productionCode}
                onChange={(e) => onProductionChange(e)}
                autoComplete="off"
              >
                <option defaultValue readOnly>
                  نام محصول را انتخاب کنید.
                </option>
                {productionName.map((cs) => (
                  <option key={cs.ProductionCode} value={cs.ProductionCode}>
                    {cs.ProductionName}
                  </option>
                ))}
              </select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>* شناسه محصول </Form.Label>
              <select
                className="form-control form-control-md mb-2 "
                type="text"
                name="productionCostId"
                value={productionCostId}
                onChange={(e) => onProductionCostIdChange(e)}
                autoComplete="off"
              >
                <option value={productionCost.ProductionCostId}>
                  شناسه محصول : {productionCost.ProductionCostId} | قیمت محصول :
                  {productionCost.ProductionCost}
                </option>
              </select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>* ثبات </Form.Label>
              <Form.Control
                name="userId"
                value={userId}
                onChange={(e) => onUserIdChange(e)}
                type="number"
                placeholder="کد پرسنلی را وارد کنید ."
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label> * توضیحات</Form.Label>
              <Form.Control
                name="Description"
                value={description}
                onChange={(e) => onTextAreaChange(e)}
                placeholder="توضیحات الزامی نمی باشد, در صودت نیاز می توانید این قسمت را پر کنید."
                as="textarea"
                rows={3}
              />
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

export default AddProductionHeader;
