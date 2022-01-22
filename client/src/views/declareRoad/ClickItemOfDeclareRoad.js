import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import TextField from "@mui/material/TextField";
import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { usePromiseTracker } from "react-promise-tracker";
import { useHistory } from "react-router";
import { areas } from "src/const";
import AddItemIntoList from "src/functionCommon/fetch/AddItemIntoList";
import DatePickerTime from "../common/DatePickerTime";
import AutocompleteInput from "./AutocompleteInput";
import AutocompleteInputAddList from "./AutocompleteInputAddList";
import { Spinner } from "src/Spinner";
import GetListInputDeclareRoad from "src/functionCommon/fetch/GetListInputDeclareRoad";
import { Alert } from "@mui/material";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    top: "0",
    zIndex: "1040",
    left: "0",
    borderRadius: "0",
    position: "relative",
    marginBottom: "20px",
  },
}));

function ClickItemOfDeclareRoad(props) {
  const history = useHistory();
  const classes = useStyles();
  const addItemIntoList = AddItemIntoList();
  const nameListIsAdd = useRef();
  const refInput = useRef();
  const getListInputDeclareRoad = GetListInputDeclareRoad();
  const [showAlertAddList, setShowAlertAddList] = useState(false);
  const { promiseInProgress } = usePromiseTracker({
    area: areas.tableOwe,
    delay: 0,
  });

  const {
    itemClick_DelareRoad,
    API_listInput_DelareRoad,
    recordTable_DelareRoad,
    table_DelareRoad,
  } = useStoreState((state) => state);

  const { setTable_DelareRoad, setRecordTable_DelareRoad } = useStoreActions(
    (actions) => actions
  );

  const [danger, setDanger] = useState(false);
  const [modalAdd, setModalAdd] = useState(false);

  useEffect(() => {
    if (!API_listInput_DelareRoad.listCar) history.push("/declare_road");
  }, []);

  // lấy các giá trị default:
  //nếu click thì đồng bộ recordTable_DelareRoad và record click
  // không thì lấy default của recordTable_DelareRoad
  //**** */
  const { customer, road, goods, car, carrier } = useMemo(() => {
    if (itemClick_DelareRoad) {
      return table_DelareRoad[itemClick_DelareRoad.index];
    } else {
      return {
        ...recordTable_DelareRoad /* ,
        carrier: API_listInput_DelareRoad.listCustomer.find(
          (item) => item.code === "KH00024"
        ), */,
      };
    }
  }, [itemClick_DelareRoad]);

  useEffect(() => {
    if (itemClick_DelareRoad) {
      setRecordTable_DelareRoad(table_DelareRoad[itemClick_DelareRoad.index]);
    } else {
      setRecordTable_DelareRoad({
        ...recordTable_DelareRoad,
      });
    }
  }, [itemClick_DelareRoad]);
  //**** */

  useEffect(() => {
    getListInputDeclareRoad();
  }, []);
  return (
    <div>
      {showAlertAddList ? (
        <Alert
          variant="filled"
          className={classes.root}
          onClose={() => {
            setShowAlertAddList(false);
          }}
          severity="success"
        >
          {`Thêm ${
            nameListIsAdd.current == "customer"
              ? "khách hàng"
              : nameListIsAdd.current == "road"
              ? "cung đường"
              : null
          } vào danh sách thành công`}
        </Alert>
      ) : null}
      {API_listInput_DelareRoad.listCar ? (
        <>
          <Spinner area={areas.tableOwe} />
          <CModal
            style={{ top: "20vh" }}
            show={danger}
            onClose={() => {
              setDanger(!danger);
            }}
            color="danger"
          >
            <CModalHeader closeButton>
              <CModalTitle>Xóa bản ghi?</CModalTitle>
            </CModalHeader>
            <CModalBody>Bạn có chắc chắn muốn xóa bản ghi này?</CModalBody>
            <CModalFooter>
              <CButton
                color="danger"
                onClick={() => {
                  let temp = [...table_DelareRoad];
                  temp.splice(itemClick_DelareRoad.index, 1);

                  setTable_DelareRoad(temp);
                  history.push("/declare_road");
                }}
              >
                Xác nhận
              </CButton>{" "}
              <CButton color="secondary" onClick={() => setDanger(!danger)}>
                Hủy
              </CButton>
            </CModalFooter>
          </CModal>

          <CModal
            style={{ top: "20vh" }}
            show={modalAdd}
            onClose={() => setModalAdd(!modalAdd)}
            color="info"
            className="addIntoListModal"
          >
            <CModalHeader>
              <CModalTitle>{`Thêm ${
                nameListIsAdd.current == "customer"
                  ? "Khách Hàng"
                  : nameListIsAdd.current == "road"
                  ? "Cung Đường"
                  : null
              }?`}</CModalTitle>
            </CModalHeader>
            <CModalBody>{`Bạn có chắc chắn muốn thêm ${
              nameListIsAdd.current == "customer"
                ? "khách hàng"
                : nameListIsAdd.current == "road"
                ? "cung đường"
                : null
            } này?`}</CModalBody>
            <CModalFooter>
              <CButton
                color="info"
                onClick={async () => {
                  setModalAdd(!modalAdd);

                  let { data } = await addItemIntoList({
                    nameList: nameListIsAdd.current,
                    data: recordTable_DelareRoad[nameListIsAdd.current],
                  });
                  if (!data.error && data[0]) {
                    setShowAlertAddList(true);
                    setTimeout(() => {
                      setShowAlertAddList(false);
                    }, 3000);
                  }

                  setRecordTable_DelareRoad({
                    ...recordTable_DelareRoad,
                    [nameListIsAdd.current]: data[0],
                  });
                  // reset list input
                  getListInputDeclareRoad();
                }}
              >
                Xác nhận
              </CButton>{" "}
              <CButton
                color="secondary"
                onClick={() => {
                  setRecordTable_DelareRoad({
                    ...recordTable_DelareRoad,
                    [nameListIsAdd.current]: "",
                  });
                  refInput.current();
                  setModalAdd(!modalAdd);
                }}
              >
                Hủy
              </CButton>
            </CModalFooter>
          </CModal>

          <div
            className={`container_list_declareRoad ${
              promiseInProgress ? "d-none" : ""
            }`}
          >
            <ul>
              <li>
                <DatePickerTime
                  value={recordTable_DelareRoad.dateSelect}
                  onChange={(value) => {
                    setRecordTable_DelareRoad({
                      ...recordTable_DelareRoad,
                      dateSelect: new Date(value.setHours(12)),
                    });
                  }}
                  label={"Ngày đi"}
                />
              </li>
              <li>
                <AutocompleteInputAddList
                  options={API_listInput_DelareRoad.listCustomer}
                  label="Khách hàng"
                  modalAdd={modalAdd}
                  setModalAdd={setModalAdd}
                  nameListIsAdd={nameListIsAdd}
                  refInputClone={refInput}
                  onChange={(e, value) => {
                    setRecordTable_DelareRoad({
                      ...recordTable_DelareRoad,
                      customer: value,
                    });
                  }}
                  defaultValue={customer}
                />
              </li>
              <li>
                <AutocompleteInput
                  options={API_listInput_DelareRoad.listCar}
                  label="Xe VC"
                  onChange={(e, value) => {
                    setRecordTable_DelareRoad({
                      ...recordTable_DelareRoad,
                      car: value,
                    });
                  }}
                  defaultValue={car}
                />
              </li>
              <li>
                <AutocompleteInput
                  options={API_listInput_DelareRoad.listGoods}
                  label="Tên Hàng"
                  onChange={(e, value) => {
                    setRecordTable_DelareRoad({
                      ...recordTable_DelareRoad,
                      goods: value,
                    });
                  }}
                  defaultValue={goods}
                />
              </li>
              <li>
                <TextField
                  id="outlined-basic"
                  label="Giá cước"
                  variant="outlined"
                  name="b"
                  fullWidth
                  pattern="\d*"
                  type="tel"
                  value={recordTable_DelareRoad.rates}
                  onChange={(e) => {
                    setRecordTable_DelareRoad({
                      ...recordTable_DelareRoad,
                      rates: e.target.value,
                    });
                  }}
                  /*   defaultValue={rates || ""} */
                />
              </li>
              <li>
                <AutocompleteInputAddList
                  options={API_listInput_DelareRoad.listRoad}
                  label="Cung đường"
                  modalAdd={modalAdd}
                  setModalAdd={setModalAdd}
                  refInputClone={refInput}
                  nameListIsAdd={nameListIsAdd}
                  onChange={(e, value) => {
                    setRecordTable_DelareRoad({
                      ...recordTable_DelareRoad,
                      road: value,
                    });
                  }}
                  defaultValue={road}
                />
              </li>
              <li>
                <AutocompleteInput
                  options={API_listInput_DelareRoad.listCustomer}
                  label="Đơn vị VC"
                  onChange={(e, value) => {
                    setRecordTable_DelareRoad({
                      ...recordTable_DelareRoad,
                      carrier: value,
                    });
                  }}
                  defaultValue={carrier}
                />
              </li>
              <li>
                <TextField
                  id="outlined-basic"
                  label="Ghi chú"
                  variant="outlined"
                  name="b"
                  multiline
                  minRows={3}
                  fullWidth
                  value={recordTable_DelareRoad.note}
                  onChange={(e) => {
                    setRecordTable_DelareRoad({
                      ...recordTable_DelareRoad,
                      note: e.target.value,
                    });
                  }}
                  /*  defaultValue={note || ""} */
                />
              </li>
            </ul>
            {itemClick_DelareRoad ? (
              <CButton
                onClick={() => {
                  setDanger(!danger);
                }}
                block
                color="danger"
                className="mb-3"
              >
                Xóa
              </CButton>
            ) : null}
          </div>
        </>
      ) : null}
    </div>
  );
}

export default ClickItemOfDeclareRoad;
