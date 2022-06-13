import axios from "axios";
import { React, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const ProductionWorksheetDetail = (props) => {
  const [productionHeaderState, setProductionHeaderState] = useState(props);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [productionHeaderId, setProductionHeaderId] = useState(
    productionHeaderState.ProductionWorksheetId
  );

  const [userId, setUserId] = useState("");
  const onUserIdChange = async (e) => {
    setUserId(e.target.value);
  };

  const [numberOfRow, setNumberOfRow] = useState("");
  const onNumberOfRowChange = async (e) => {
    setNumberOfRow(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (userId === "") {
      return toast.error("کد پرسنلی را وارد کنید.");
    }
    if (numberOfRow === "") {
      return toast.error("تعداد ردیف ها را وارد کنید.");
    }
    let params = {
      ProductionWorksheetId: productionHeaderId,
      RegistrarId: userId,
      NumberOfRow: numberOfRow,
    };

    var res = axios
      .post(
        "https://localhost:7295/api/ProductionWorksheet/CreateProductionWorksheetDetail",
        params
      )
      .catch(function (error) {
        if (error.response) {
          toast.error(error.response.data);
        }
      });
    if (res.status == 200) {
      toast.success("جزئیات محصول تولیدی  با موفقیت ایجاد شد.");
      handleClose();
      //props.LoadProductionHeaders();
    }
  };

  return (
    <>
      <Button variant="outline-primary" className="btn" onClick={handleShow}>
        ثبت جزئیات
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={(e) => onSubmit(e)}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label> سر برگ محصول </Form.Label>
              <Form.Control
                disabled
                type="text"
                placeholder={productionHeaderState.ProductId}
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>* ثبات </Form.Label>
              <Form.Control
                name="userId"
                autoComplete="off"
                type="number"
                placeholder="کد پرسنلی را وارد کنید ."
                onInput={(e) => (e.target.value = e.target.value.slice(0, 7))}
                value={userId}
                onChange={(e) => onUserIdChange(e)}
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
              <Form.Label>* تعداد ردیف </Form.Label>
              <Form.Control
                name="numberOfRow"
                autoComplete="off"
                value={numberOfRow}
                type="number"
                placeholder="تعداد ردیف های مورد نیاز را وارد کنید ."
                onChange={(e) => onNumberOfRowChange(e)}
              />
            </Form.Group>
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
                ثبت
              </Button>
            </Modal.Footer>
          </Modal.Body>
        </Form>
      </Modal>
    </>
  );
};

export default ProductionWorksheetDetail;
