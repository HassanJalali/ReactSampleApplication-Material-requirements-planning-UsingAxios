import axios from "axios";
import { React, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Form, Button, Modal } from "react-bootstrap";

const AssignWorkstationToProductionLine = (props) => {
  const [assignWorkstation, setAssignWorkstation] = useState({
    ProductionLineId: "",
    WorkstationTypeId: "",
    workstationOrder: "",
  });
  const [productionLineName, SetProductionLineName] = useState([]);
  const [workstationTypes, setWorkstationTypes] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setAssignWorkstation({
      ProductionLineId: "",
      WorkstationTypeId: "",
      workstationOrder: "",
    });
    setShow(true);
  };

  useEffect(() => {
    loadProductionLine();
    loadWorkstationTypes();
  }, []);

  const loadProductionLine = async () => {
    const result = await axios.get(
      "https://localhost:7295/api/ProductionLines/GetProductionLineName"
    );
    var getData = result.data;
    SetProductionLineName(getData);
  };

  const loadWorkstationTypes = async () => {
    const result = await axios.get(
      "https://localhost:7295/api/Workstations/GetWorkstations"
    );
    var getData = result.data;
    setWorkstationTypes(getData);
  };

  const { ProductionLineId, WorkstationTypeId, workstationOrder } =
    assignWorkstation;
  const onInputChange = (e) => {
    setAssignWorkstation({
      ...assignWorkstation,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (assignWorkstation.ProductionLineId === "") {
      return toast.error("نام خط تولید را وارد کنید.");
    }
    if (assignWorkstation.WorkstationTypeId === "") {
      return toast.error("نوع ایستگاه کاری را انتخاب کنید.");
    }
    if (assignWorkstation.workstationOrder === "") {
      return toast.error("ترتیب ایستگاه کاری را انتخاب کنید.");
    }
    var res = await axios
      .post(
        "https://localhost:7295/api/ProductionLines/AssignWorkStationToProductionLine",
        assignWorkstation
      )
      .catch(function (error) {
        if (error.response) {
          toast.error(error.response.data);
        }
      });
    if (res.status == 200) {
      toast.success("ایستگاه کاری با موفقیت به خط تولید تخصیص داده شد.");
      handleClose();
      props.loadAssignedWorkstations();
    }
  };

  return (
    <>
      <Button id="addbtn" className="btn mt-3 px-4 py-2" onClick={handleShow}>
        تخصیص ایستگاه کاری به خط تولید
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={(e) => onSubmit(e)}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>* خط تولید </Form.Label>
              <div className="form-group">
                <Form.Select
                  className="form-control form-control-md mb-2 "
                  type="text"
                  name="ProductionLineId"
                  value={ProductionLineId}
                  onChange={(e) => onInputChange(e)}
                  autoComplete="off"
                >
                  <option hidden>نام خط تولید را انتخاب کنید.</option>
                  {productionLineName.map((cs) => (
                    <option key={cs.Id} value={cs.Id}>
                      {cs.ProductionLineName}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>* ایستگاه کاری </Form.Label>
              <div className="form-group">
                <Form.Select
                  className="form-control form-control-md mb-2 "
                  type="text"
                  placeholder="نوع ایستگاه کاری را انتخاب کنید."
                  name="WorkstationTypeId"
                  value={WorkstationTypeId}
                  onChange={(e) => onInputChange(e)}
                  autoComplete="off"
                >
                  <option hidden>نوع ایستگاه کاری را انتخاب کنید</option>
                  {workstationTypes.map((cs) => (
                    <option key={cs.WorkstationId} value={cs.WorkstationId}>
                      {cs.WorkstationType}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>* ترتیب ایستگاه کاری </Form.Label>
              <div className="form-group mb-2">
                <input
                  autoComplete="off"
                  type="text"
                  className="form-control form-control-md"
                  placeholder="ترتیب ایستگاه کاری را وارد کنید."
                  name="workstationOrder"
                  value={workstationOrder}
                  onChange={(e) => onInputChange(e)}
                />
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

export default AssignWorkstationToProductionLine;
