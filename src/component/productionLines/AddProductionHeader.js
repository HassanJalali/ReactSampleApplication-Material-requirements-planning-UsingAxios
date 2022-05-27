import { React, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
//import { useNavigate } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
//import { Link } from "react-router-dom";

const AddProductionHeader = (props) => {
  var params = useParams();
  const [productionHeader, setProductionHeader] = useState({
    ProductionLineId: "",
    ProductionCostId: "",
    ProductionCode: "",
    UserId: "",
    Description: "",
  });

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  const [productionName, SetProductionName] = useState([]);
  const onProductionLineChange = async (e) => {
    setProductionHeader({ ProductionLineId: e.target.value });
    const res = await axios.get(
      `https://localhost:7295/api/ProductionLines/GetActiveAssignedProductionByProductionLineId?productionLineId=${e.target.value}`
    );
    var getData = res.data;
    SetProductionName(getData);
  };

  const [productionCostId, SetProductionCostId] = useState([]);
  const onProductionChange = async (e) => {
    const data = {
      params: {
        ProductionLineId: productionHeader.ProductionLineId,
        ProductionCode: e.target.value,
      },
    };
    const res = await axios.get(
      `https://localhost:7295/api/ProductionLines/GetProductionCostIdByProductionLineIdAndProductionCode`,
      data
    );
    var getData = res.data;
    SetProductionCostId(getData);
  };

  const onProductionCostIdChange = (e) => {
    setProductionHeader({ ProductionCostId: e.target.value });
  };

  const onUserIdChange = (e) => {
    setProductionHeader({ UserId: e.target.value });
  };

  const onTextAreaChange = (e) => {
    setProductionHeader({ Description: e.target.value });
  };

  const onSubmit = async (e) => {
    console.log("???", productionHeader);
    if (productionHeader.ProductionLineId === "") {
      return toast.error("نام خط تولید را وارد کنید.");
    }
    if (productionHeader.ProductionCode === "") {
      return toast.error("نام محصول را وارد کنید.");
    }
    if (productionHeader.ProductionCostId === "") {
      return toast.error("شناسه محصول را وارد کنید.");
    }
    if (productionHeader.UserId === "") {
      return toast.error(" کد پرسنلی را وارد کنید.");
    }

    var res = await axios.post("", productionHeader).catch(function (error) {
      if (error.response) {
        toast.error(error.response.data);
      }
    });

    if (res.status == "200") {
      toast.success("سر برگ با موفقیت ایجاد شد.");
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
                value={productionHeader.ProductionLineId}
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
                value={productionHeader.ProductionCode}
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
                name="ProductionCostId"
                value={productionHeader.ProductionCostId}
                onChange={(e) => onProductionCostIdChange(e)}
                autoComplete="off"
              >
                <option defaultValue readOnly>
                  شناسه محصول را انتخاب کنید.
                </option>
                <option>
                  شناسه محصول : {productionCostId.ProductionCostId} | قیمت محصول
                  : {productionCostId.ProductionCost}
                </option>
              </select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>* ثبات </Form.Label>
              <Form.Control
                name="UserId"
                value={productionHeader.UserId}
                onChange={(e) => onUserIdChange(e)}
                type="text"
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
                value={productionHeader.Description}
                onChange={(e) => onTextAreaChange(e)}
                placeholder="توضیحات الزامی نمی باشد, در صودت نیاز می توانید این قسمت را پر کنید."
                as="textarea"
                rows={3}
                //   textarea {
                //     resize: none;
                //  }
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
