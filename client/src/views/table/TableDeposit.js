import CIcon from "@coreui/icons-react";
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CCollapse,
  CDataTable,
  CFormGroup,
  CInput,
  CInputGroup,
  CInputGroupAppend,
  CInputRadio,
  CLabel,
  CRow,
  CSwitch,
} from "@coreui/react";
import React, { useContext, useEffect, useState } from "react";
import { useRef } from "react";
import { context } from "src/App";
import { API, areas } from "src/const";
import GetToken from "../common/GetToken";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { Spinner } from "src/Spinner";
import { useHistory } from "react-router-dom";
import DateSelect from "../common/DateSelect";
const typeFields = (type) => {
  switch (type) {
    case 0:
      return [
        {
          key: "sohieuCT",
          label: "Số Hiệu CT",
          _style: { whiteSpace: "nowrap" },
          sorter: false,
        },
        {
          key: "NgayCT",
          label: "Ngày CT",
          _style: { whiteSpace: "nowrap" },
          sorter: false,
        },
        {
          key: "NoiDung",
          label: "Nội Dung",
          _style: { whiteSpace: "nowrap" },
          sorter: false,
        },
        {
          key: "Thu",
          label: "Thu",
          _style: { whiteSpace: "nowrap" },
          sorter: false,
        },
        {
          key: "Chi",
          label: "Chi",
          _style: { whiteSpace: "nowrap" },
          sorter: false,
        },
        {
          key: "Ton",
          label: "Tồn",
          _style: { whiteSpace: "nowrap" },
          sorter: false,
        },
      ];

    default:
      break;
  }
};

function TableDeposit() {
  const history = useHistory();
  const { promiseInProgress } = usePromiseTracker({
    area: areas.tableOwe,
    delay: 0,
  });

  const [list, setList] = useState([]);
  const [matk, setMatk] = useState("11211");
  const [dateRange, setDateRange] = useState([
    new Date(new Date().setDate(new Date().getDate() - 31)),
    new Date(),
  ]);
  const token = GetToken()

  


  const [dataTable, setDataTable] = useState([]);
  const fields = useRef(typeFields(0));

  const getList = async () => {
    const dataBody = {};

    const res = await trackPromise(
      fetch(API + "/api/events/getdsnganhang", {
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

    const { data } = await res.json();
    setList(data);
  };

  const getDataTable = async () => {
    const dataBody = {
      startDate: dateRange[0],
      endDate: dateRange[1],
      matk: matk,
    };

    console.log(dataBody)

    const res = await trackPromise(
      fetch(API + "/api/events/EMLO_So_TienGui", {
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
    const { data } = await res.json();
    let temp = data[0]
      ? data.map((item) => ({
          ...item,
          Thu: item.Thu.toLocaleString(),
          Chi: item.Chi.toLocaleString(),
          Ton: item.Ton.toLocaleString(),
        }))
      : [];

    setDataTable(temp);
  };

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    if (list[0] && dateRange[0] && dateRange[1]) getDataTable();
  }, [dateRange, list, matk]);

  fields.current = typeFields(0);
  return (
    <CCard>
      <CCardHeader className="inputHeader">
        <h3 className="mb-3">Sổ Tiền Gửi Ngân Hàng</h3>
        <CRow>
          <CCol xl="7" className="mb-sm-3">
            <CRow className="pl-xl-3 justify-content-between">
              <CCol xl="5" sm="6" className="text-center mb-2">
                <DateSelect {...{ dateRange, setDateRange }} />
              </CCol>

              <CCol xl="7" sm="6" className="mb-2">
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <label className="mfe-2">Tài Khoản</label>
                  <select
                    className="form-control"
                    aria-label="changes number of visible items"
                    value={matk}
                    onChange={(e) => {
                      setMatk(e.target.value);
                    }}
                  >
                    {list.map((item, index) => (
                      <option key={index} value={item.MATK}>
                        {item.TENTK}
                      </option>
                    ))}
                  </select>
                </div>
              </CCol>
            </CRow>
          </CCol>
        </CRow>
      </CCardHeader>
      <CCardBody>
        <Spinner area={areas.tableOwe} />
        {promiseInProgress ? null : (
          <CDataTable
            sorter
            items={dataTable}
            fields={fields.current}
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
    </CCard>
  );
}

export default TableDeposit;
