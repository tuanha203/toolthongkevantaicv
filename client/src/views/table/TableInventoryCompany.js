import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CDataTable,
  CInput,
  CInputGroup,
  CInputGroupAppend,
  CRow,
} from "@coreui/react";
import React, { useContext, useEffect, useState } from "react";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { context } from "src/App";
import { API, areas } from "src/const";
import { Spinner } from "src/Spinner";
import DateSelect from "../common/DateSelect";
import GetToken from "../common/GetToken";

function convertToDateString(date) {
  return (
    date.getDate().toString().padStart(2, "0") +
    "/" +
    (date.getMonth() + 1).toString().padStart(2, "0") +
    "/" +
    date.getFullYear().toString().padStart(2, "0")
  );
}

function TableInventoryCompany() {
  const { promiseInProgress } = usePromiseTracker({
    area: areas.tableOwe,
    delay: 0,
  });

  const { infoUser, setInfoUser } = useContext(context);

  const date = new Date(),
    y = date.getFullYear(),
    m = date.getMonth();
  const [dateRange, setDateRange] = useState([new Date(y, m, 1), date]);
  const [selectCar, setSelectCar] = useState("");
  const [listNameCar, setListNameCar] = useState([]);
  const [routeInput, setRouteInput] = useState("");
  const [dataTable, setDataTable] = useState([]);
  const token = GetToken()

  


  const getDataTable = async () => {
    // Why: startDate 0 giờ <= .. <= endDate 24 giờ
    let endDateAllDay = new Date(dateRange[1]);
    if (endDateAllDay) endDateAllDay.setDate(endDateAllDay.getDate() + 1);
    const dataBody = {
      maXe: "",
      startDate: dateRange[0],
      endDate: endDateAllDay,
      TuyenDuong: routeInput,
      TenXe: selectCar,
      loai: 2,
    };
    console.log(
      "🚀 ~ file: TableInventoryTrans.js ~ line 69 ~ getDataTable ~ dataBody",
      dataBody
    );

    const res = await trackPromise(
      fetch(API + "/api/callProc_XuatBT_GetVC", {
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

    data = data.map((item) => ({
      ...item,
      Ngayct: convertToDateString(new Date(item.Ngayct)),
      SLdau: item.SLdau.toLocaleString(),
      SLcuoi: item.SLcuoi.toLocaleString(),
      ChiPhi: item.ChiPhi.toLocaleString(),
      ST141: item.ST141.toLocaleString(),
    }));

    setDataTable(data);
  };

  const getListCar = async () => {
    const res = await trackPromise(
      fetch(API + "/api/get_listCar", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      areas.tableOwe
    );
    let { data } = await res.json();
    console.log(data)
    setListNameCar(data);
    // set giá trị đầu cho select
    setSelectCar(data[0]);
  };

  useEffect(() => {
    getListCar();
  }, []);

  useEffect(() => {
    if (selectCar) {
      getDataTable();
    }
  }, [dateRange, infoUser, selectCar]); // {BSXE} = infoUser

  const fields = [
    {
      key: "Ngayct",
      label: "Thời Gian",
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
      key: "TuyenDuong",
      label: "Tuyến Đường",
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
      key: "ChiPhi",
      label: "Chi Phí",
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
    <CCard>
      <CCardHeader className="inputHeader">
        <h4 className="mb-3">DT Vận Chuyển Toàn Công Ty</h4>
        <CRow className="pl-xl-3 justify-content-between">
          <CCol className="mb-sm-3" className="text-center mb-2">
            <DateSelect {...{ dateRange, setDateRange }} />
          </CCol>
        </CRow>

        <CRow className="pl-xl-3 justify-content-between">
          <CCol className="mb-sm-3" className="text-center mb-2">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <label className="mfe-2">Chọn xe</label>
              <select
                className="form-control"
                value={selectCar}
                onChange={(e) => {
                  setSelectCar(e.target.value);
                }}
              >
                {listNameCar[0] &&
                  listNameCar.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
              </select>
            </div>
          </CCol>
        </CRow>

        <CRow className="pl-xl-3 justify-content-between">
          <CCol className="mb-sm-3" className="text-center mb-2">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CInputGroup>
                <CInput
                  type="text"
                  id="input2-group2"
                  name="input2-group2"
                  placeholder="Lọc theo tuyến đường.."
                  value={routeInput}
                  onChange={(e) => {
                    setRouteInput(e.target.value);
                  }}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      getDataTable();
                    }
                  }}
                />
                <CInputGroupAppend>
                  <CButton
                    onClick={() => {
                      getDataTable();
                    }}
                    type="button"
                    color="primary"
                  >
                    Tìm kiếm
                  </CButton>
                </CInputGroupAppend>
              </CInputGroup>
            </div>
          </CCol>
        </CRow>
      </CCardHeader>
      <CCardBody>
        <Spinner area={areas.tableOwe} />
        {promiseInProgress ? null : (
          <CDataTable
            sorter
            items={dataTable}
            fields={fields}
            itemsPerPage={5}
            hover
            pagination
            noItemsView={{
              noResults: "Trống",
              noItems: "Danh sách trống",
            }}
          />
        )}
      </CCardBody>
      <CCardFooter>
        {promiseInProgress || !dataTable[0] ? null : (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ whiteSpace: "normal" }} className="mfe-2">
              <strong>Tổng doanh thu vận chuyển:</strong>
              {` ${dataTable
                .reduce(
                  (tong, currentValue) => tong + parseInt(currentValue.SoTienV),
                  0
                )
                .toLocaleString()}
             VNĐ`}
            </label>
          </div>
        )}
      </CCardFooter>
    </CCard>
  );
}

export default TableInventoryCompany;
