import axios from "axios";
import { React, useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import moment from "moment-jalaali";
import { getProductionWorksheetDetailByProductionWorksheetId } from "../../services/ProductionWorksheet-Service";

const ShowProductionWorksheetDetail = (props) => {
  const [productionHeaderState, setProductionHeaderState] = useState(props);
  const [productionWorksheetDetail, setProductionWorksheetDetail] = useState({
    productionWorksheetDetail: productionHeaderState.ProductionWorksheetId,
  });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    loadProductionWorksheetDetail();
  });

  const loadProductionWorksheetDetail = async () => {
    var res = await getProductionWorksheetDetailByProductionWorksheetId(
      productionHeaderState.ProductionWorksheetId
    );
    var getData = res.data;
    setProductionWorksheetDetail(getData);
  };

  return (
    <>
      <Button
        variant="outline-success"
        className="btn  mx-2 px-3"
        onClick={handleShow}
        disabled={productionHeaderState.HasDetails === false}
      >
        مشاهده جزئیات
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Body>
          <div className="form-group row mb-3">
            <label htmlFor="RegistrarId" className="col-sm-4 col-form-label">
              ثبات :
            </label>
            <div className="col-sm-8">
              <input
                disabled
                type="text"
                className="form-control"
                id="RegistrarId"
                placeholder={productionWorksheetDetail.RegistrarId}
              />
            </div>
          </div>
          <div className="form-group row mb-3">
            <label htmlFor="Timestamp" className="col-sm-4 col-form-label">
              زمان ثبت :
            </label>
            <div className="col-sm-8">
              <input
                disabled
                type="text"
                className="form-control"
                id="Timestamp"
                placeholder={
                  productionWorksheetDetail.Timestamp === null
                    ? "  ندارد "
                    : moment(
                        productionWorksheetDetail.Timestamp,
                        "YYYY-M-D HH:mm:ss"
                      ).format("HH:mm:ss - jYYYY/jM/jD")
                }
              />
            </div>
          </div>
          <div className="form-group row mb-3">
            <label htmlFor="ScannerId" className="col-sm-4 col-form-label">
              اسکن کننده :
            </label>
            <div className="col-sm-8">
              <input
                disabled
                type="text"
                className="form-control"
                id="ScannerId"
                placeholder={
                  productionWorksheetDetail.ScannerId === null
                    ? "ندارد"
                    : productionWorksheetDetail.ScannerId
                }
              />
            </div>
          </div>
          <div className="form-group row mb-3">
            <label htmlFor="IsScan" className="col-sm-4 col-form-label">
              وضعیت اسکن :
            </label>
            <div className="col-sm-8">
              <input
                disabled
                type="text"
                className="form-control"
                id="IsScan"
                placeholder={
                  productionWorksheetDetail.IsScan === true
                    ? "اسکن شده است "
                    : "اسکن نشده است"
                }
              />
            </div>
          </div>
          <div className="form-group row mb-3">
            <label htmlFor="ScanTime" className="col-sm-4 col-form-label">
              زمان اسکن :
            </label>
            <div className="col-sm-8">
              <input
                disabled
                type="text"
                className="form-control"
                id="ScanTime"
                placeholder={
                  productionWorksheetDetail.ScanTime === null
                    ? "  ندارد "
                    : moment(
                        productionWorksheetDetail.ScanTime,
                        "YYYY-M-D HH:mm:ss"
                      ).format("HH:mm:ss - jYYYY/jM/jD")
                }
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer dir={"ltr"}>
          <Button
            variant="warning"
            className="btn  m-2 w-25 "
            onClick={handleClose}
          >
            بستن
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ShowProductionWorksheetDetail;
