import { React, useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
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
    //loadProductionWorksheetDetail();
    setProductionHeaderState(props);
  }, [props]);

  const loadProductionWorksheetDetail = async () => {
    const request = await getProductionWorksheetDetailByProductionWorksheetId(
      productionHeaderState.ProductionWorksheetId
    );
    const result = request.data;
    setProductionWorksheetDetail(result);
  };

  return (
    <>
      <Button
        variant="outline-success"
        className="btn  mx-2 px-3"
        onClick={() => {
          handleShow();
          loadProductionWorksheetDetail();
        }}
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
            <label htmlFor="Scanned" className="col-sm-4 col-form-label">
              کارتن های اسکن شده :
            </label>
            <div className="col-sm-8">
              <input
                disabled
                type="text"
                className="form-control "
                id="Scanned"
                placeholder={productionWorksheetDetail.Scanned}
              />
            </div>
          </div>
          <div className="form-group row mb-3">
            <label htmlFor="UnScanned" className="col-sm-4 col-form-label">
              کارتن های اسکن نشده :
            </label>
            <div className="col-sm-8">
              <input
                disabled
                type="text"
                className="form-control"
                id="UnScanned"
                placeholder={productionWorksheetDetail.UnScanned}
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
