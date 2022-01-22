import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
} from "@coreui/react";
import { makeStyles } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import React, { useContext, useEffect, useRef, useState } from "react";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { context } from "src/App";
import { API, areas } from "src/const";
import { Spinner } from "src/Spinner";
import DateSelect from "../common/DateSelect";
import DialogFullScreen from "./DialogFullScreen";
import GetToken from "../common/GetToken";

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

function TableInputRoad() {
  const [openDialog, setOpenDialog] = useState(false);

  const { promiseInProgress } = usePromiseTracker({
    area: areas.tableOwe,
    delay: 0,
  });
  const classes = useStyles();
  const [itemIsClicked, setItemIsClicked] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const { infoUser, setInfoUser } = useContext(context);
  const { BSXE, TenXe } = infoUser;
  const [eventChangePage, setEventChangePage] = useState();
  const refTable = useRef();
  const date = new Date(),
    y = date.getFullYear(),
    m = date.getMonth();
  const [dateRange, setDateRange] = useState([new Date(y, m, 1), date]);
  const [dataTable, setDataTable] = useState([]);
  const token = GetToken()

  


  const getDataTable = async () => {
    // Why: startDate 0 giờ <= .. <= endDate 24 giờ
    let endDateAllDay = new Date(dateRange[1]);
    if (endDateAllDay) endDateAllDay.setDate(endDateAllDay.getDate() + 1);

    const dataBody = {
      maXe: BSXE,
      startDate: dateRange[0],
      endDate: endDateAllDay,
      loai: 0,
    };

    const res = await trackPromise(
      fetch(API + "/api/callProc_XuatBT_GetVC", {
        method: "post",
        body: JSON.stringify(dataBody),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
      }),
      areas.tableOwe
    );

    let { data } = await res.json();
    console.log(data);
    data = data.map((item) => ({
      ...item,
      NgayDi: convertToDateString(new Date(item.NgayDi)),
      SLdau: item.SLdau.toLocaleString(),
      SLcuoi: item.SLcuoi.toLocaleString(),
      ChiPhi: item.ChiPhi.toLocaleString(),
      TienDau: item.TienDau && item.TienDau.toLocaleString(),
      ST141: item.ST141.toLocaleString(),
      SoTienV: item.SoTienV.toLocaleString(),
    }));

    setDataTable(data);
  };

  useEffect(() => {
    if (BSXE) {
      getDataTable();
    }
  }, [dateRange, infoUser]); // {BSXE} = infoUser
  

  /* useEffect(() => {
    if (refTable.current && dataTable[0]) {
      const tableRowsTBody = [...refTable.current.querySelectorAll("tbody tr")];

      const indexSoLuongCuoi = [
        ...refTable.current.querySelectorAll("thead th div"),
      ].findIndex((item) => item.textContent === "Số Lượng Cuối");
      if (indexSoLuongCuoi !== -1) {
        tableRowsTBody.forEach((item) => {
          if (
            Number(
              [...item.querySelectorAll("td")][indexSoLuongCuoi].textContent
            ) === 0
          ) {
            item.style.backgroundColor = "bisque";
          } else {
            item.style.backgroundColor = "white";
          }
        });
      }
    }
  }, [dataTable, eventChangePage]); */

  const fields = [
    {
      key: "NgayDi",
      label: "Ngày Đi",
      _style: { whiteSpace: "nowrap" },
      sorter: false,
    },
    {
      key: "TenVT",
      label: "Tên Hàng",
      _style: { whiteSpace: "nowrap" },
      sorter: false,
    },
    {
      key: "SLdau",
      label: "Số Lượng Đầu",
      _style: { whiteSpace: "nowrap" },
      sorter: false,
    },
    {
      key: "SLcuoi",
      label: "Số Lượng Cuối",
      _style: { whiteSpace: "nowrap" },
      sorter: false,
    },
    {
      key: "DongiaV",
      label: "Đơn Giá",
      _style: { whiteSpace: "nowrap" },
      sorter: false,
    },
    {
      key: "SoTienV",
      label: "Số Tiền",
      _style: { whiteSpace: "nowrap" },
      sorter: false,
    },

    {
      key: "TuyenDuong",
      label: "Tuyến Đường",
      _style: { whiteSpace: "nowrap" },
      sorter: false,
    },
    {
      key: "ChiPhi",
      label: "Chi Phí",
      _style: { whiteSpace: "nowrap" },
      sorter: false,
    },
    {
      key: "TienDau",
      label: "Tiền Dầu",
      _style: { whiteSpace: "nowrap" },
      sorter: false,
    },
    {
      key: "ST141",
      label: "Tiền Ứng",
      _style: { whiteSpace: "nowrap" },
      sorter: false,
    },
    {
      key: "GhiChu",
      label: "Ghi Chú",
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
          Đã hoàn thành nhập liệu
        </Alert>
      ) : null}
      <CCard>
        <DialogFullScreen
          {...{ itemIsClicked, setItemIsClicked, getDataTable, setShowAlert }}
          open={openDialog}
          setOpen={setOpenDialog}
        />
        <CCardHeader className="inputHeader">
          <h4 className="mb-3">Nhập Số Liệu Nhật Trình</h4>
          <CRow>
            <CCol xl="7" className="mb-sm-3">
              <CRow className="pl-xl-3 justify-content-between">
                <CCol xl="5" sm="6" className="text-center mb-2">
                  <DateSelect {...{ dateRange, setDateRange }} />
                </CCol>
              </CRow>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody innerRef={refTable}>
          <Spinner area={areas.tableOwe} />
          {promiseInProgress ? null : (
            <CDataTable
              sorter
              items={dataTable}
              fields={fields}
              itemsPerPage={5}
              hover
              pagination
              onPageChange={() => {
                setEventChangePage(!eventChangePage);
              }}
              noItemsView={{
                noResults: "Trống",
                noItems: "Danh sách trống",
              }}
              clickableRows
              onRowClick={(item) => {
                setItemIsClicked(item);
                setOpenDialog(true);
              }}
            />
          )}
        </CCardBody>
      </CCard>
    </>
  );
}

export default TableInputRoad;
