import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CDataTable,
} from "@coreui/react";
import { makeStyles } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { useHistory } from "react-router-dom";
import { context } from "src/App";
import { API, areas } from "src/const";
import { Spinner } from "src/Spinner";
import GetToken from "../common/GetToken";
import DatePickerUpdateClosingDate from "../common/DatePickerUpdateClosingDate";
import GetListInputDeclareRoad from "src/functionCommon/fetch/GetListInputDeclareRoad";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    width: "100%",
    top: "0",
    zIndex: "1040",
    left: "0",
    borderRadius: "0",
  },
}));

function convertToDateString(date) {
  return (
    date.getDate().toString().padStart(2, "0") +
    "/" +
    (date.getMonth() + 1).toString().padStart(2, "0") +
    "/" +
    date.getFullYear().toString().padStart(2, "0")
  );
}

function DeclareRoad() {
  const history = useHistory();

  const { promiseInProgress } = usePromiseTracker({
    area: areas.tableOwe,
    delay: 0,
  });
  const classes = useStyles();
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertUpdateKs, setShowAlertUpdateKs] = useState(false);
  const [eventChangePage, setEventChangePage] = useState();
  const refTable = useRef();
  const getListInputDeclareRoad = GetListInputDeclareRoad();
  const date = new Date(),
    y = date.getFullYear(),
    m = date.getMonth();
  const {
    setItemClick_DelareRoad,
    setTable_DelareRoad,
    setRecordTable_DelareRoad,
    setClosingDate,
  } = useStoreActions((actions) => actions);
  const token = GetToken();

  const {
    infoUser: { TenXe },
  } = useContext(context);

  const { closingDate, itemClick_DelareRoad, table_DelareRoad } = useStoreState(
    (state) => state
  );

  const filterDataTable = useMemo(() => {
    return table_DelareRoad.map((item) => ({
      ...item,
      dateSelect: convertToDateString(item.dateSelect),
      customer: item.customer.name || "",
      road: item.road.name || "",
      goods: item.goods.name || "",
      carrier: item.carrier.name || "",
      car: item.car.name || "",
    }));
  }, [table_DelareRoad]);

  const saveRecords = async () => {
    let records = table_DelareRoad.map((item) => ({
      ...item,
      dateSelect: new Date(item.dateSelect.setHours(12)),
      customer: item.customer.code || "",
      road: item.road.code || "",
      goods: item.goods.code || "",
      carrier: item.carrier.code || "",
      car: item.car.code || "",
    }));

    const dataBody = {
      records: records,
    };


    const res = await trackPromise(
      fetch(API + "/api/save_records_declare_road", {
        method: "post",
        body: JSON.stringify(dataBody),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      areas.tableOwe
    );

    let { data } = await res.json();
    if (data.status === "success") {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    } else {
      console.log(data);
      alert(data.error);
    }
  };

  const updateKs = async (value) => {
    const dataBody = {
      dateSelect: value,
    };

    const res = await trackPromise(
      fetch(API + "/api/updatekskhaibaonhattrinh", {
        method: "post",
        body: JSON.stringify(dataBody),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      areas.tableOwe
    );

    let { data } = await res.json();
    if (data.status === "success") {
      setShowAlertUpdateKs(true);
      setTimeout(() => {
        setShowAlertUpdateKs(false);
      }, 5000);
    } else {
      console.log(data);
      alert(data.error);
    }
  };

  useEffect(() => {
    getListInputDeclareRoad();
  }, []);

  useEffect(async () => {
    try {
      if (!closingDate) {
        const res = await trackPromise(
          fetch(API + "/api/ngayks", {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }),
          areas.tableOwe
        );
        let { data } = await res.json();
        if (data.error) return alert(data.error);
        setClosingDate(data[0].KSVC);
      }
    } catch (error) {
      alert(error);
    }
  }, []);

  useEffect(() => {
    // reset m???i khi quay tr??? l???i table
    if (itemClick_DelareRoad) {
      setItemClick_DelareRoad(undefined);
    }
  }, [itemClick_DelareRoad]);

  const fields = [
    {
      key: "dateSelect",
      label: "Ng??y ??i",
      _style: { whiteSpace: "nowrap" },
      sorter: false,
    },
    {
      key: "customer",
      label: "Kh??ch H??ng",
      _style: { whiteSpace: "nowrap" },
      sorter: false,
    },
    {
      key: "car",
      label: "Xe VC",
      _style: { whiteSpace: "nowrap" },
      sorter: false,
    },
    {
      key: "goods",
      label: "T??n H??ng",
      _style: { whiteSpace: "nowrap" },
      sorter: false,
    },
    {
      key: "rates",
      label: "Gi?? C?????c",
      _style: { whiteSpace: "nowrap" },
      sorter: false,
    },
    {
      key: "road",
      label: "Cung ???????ng",
      _style: { whiteSpace: "nowrap" },
      sorter: false,
    },

    {
      key: "carrier",
      label: "????n V??? VC",
      _style: { whiteSpace: "nowrap" },
      sorter: false,
    },
    {
      key: "note",
      label: "Ghi Ch??",
      _style: { whiteSpace: "nowrap" },
      sorter: false,
    },
  ];

  return (
    <>
      {showAlert ? (
        <Alert
          variant="filled"
          className={classes.root}
          onClose={() => {
            setShowAlert(false);
          }}
          severity="success"
        >
          Khai b??o nh???t tr??nh th??nh c??ng
        </Alert>
      ) : null}

      {showAlertUpdateKs ? (
        <Alert
          variant="filled"
          className={classes.root}
          onClose={() => {
            setShowAlertUpdateKs(false);
          }}
          severity="success"
        >
          C???p nh???p kh??a s??? th??nh c??ng
        </Alert>
      ) : null}
      <CCard>
        <CCardHeader className="inputHeader">
          <h4 className="mb-3">Khai B??o Nh???t Tr??nh V???n T???i</h4>

          <CButton
            onClick={(e) => {
              history.push("/declare_road/detail");
            }}
            color="primary"
          >
            {" "}
            <AddOutlinedIcon
              sx={{ position: "relative", top: "-2px" }}
              fontSize="small"
            />{" "}
            Th??m b???n ghi
          </CButton>
        </CCardHeader>
        <CCardBody innerRef={refTable}>
          <Spinner area={areas.tableOwe} />
          {promiseInProgress ? null : (
            <CDataTable
              sorter
              items={filterDataTable}
              fields={fields}
              itemsPerPage={5}
              hover
              pagination
              onPageChange={() => {
                setEventChangePage(!eventChangePage);
              }}
              noItemsView={{
                noResults: "Tr???ng",
                noItems: "Danh s??ch tr???ng",
              }}
              clickableRows
              onRowClick={(item, index) => {
                setItemClick_DelareRoad({ index });
                history.push("/declare_road/detail");
              }}
            />
          )}
        </CCardBody>
        <CCardFooter>
          <div style={{ display: "flex" }}>
            {TenXe === "general" ? (
              <DatePickerUpdateClosingDate
                value={closingDate || new Date()}
                setValue={setClosingDate}
                updateKs={updateKs}
              />
            ) : null}

            <CButton
              onClick={() => {
                if (table_DelareRoad.length > 0) {
                  saveRecords();
                  setTable_DelareRoad([]);
                  setRecordTable_DelareRoad({
                    dateSelect: new Date(),
                    customer: "",
                    road: "",
                    goods: "",
                    note: "",
                    carrier: "",
                    rates: "",
                    car: "",
                  });
                } else {
                  alert("Kh??ng c?? b???n ghi n??o");
                }
              }}
              style={{
                display: "block",
                marginLeft: "auto",
              }}
              color="primary"
            >
              Ho??n th??nh
            </CButton>
          </div>
        </CCardFooter>
      </CCard>
    </>
  );
}

export default DeclareRoad;
