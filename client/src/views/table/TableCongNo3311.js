import CIcon from "@coreui/icons-react";
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
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
import DateSelect from "../common/DateSelect";
import GetToken from "../common/GetToken";
import { useHistory } from "react-router-dom";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { Spinner } from "src/Spinner";
import { useStoreActions, useStoreState } from "easy-peasy";

const typeFields = (type) => {
  switch (type) {
    case 0:
      return [
        {
          key: "TenDonVi",
          label: "Tên Đơn Vị",
          _style: { whiteSpace: "nowrap" },
          sorter: false,
        },
        {
          key: "PHAI_THU",
          label: "Đã Trả",
          _style: { whiteSpace: "nowrap" },
          sorter: false,
        },
        {
          key: "DA_THU",
          label: "Phải Trả",
          _style: { whiteSpace: "nowrap" },
          sorter: false,
        },
      ];

    default:
      break;
  }
};

function TableCongNo3311() {
  const { promiseInProgress } = usePromiseTracker({
    area: areas.tableOwe,
    delay: 0,
  });

  const { setTable3311 } = useStoreActions((actions) => actions);
  const { table3311 } = useStoreState((state) => state);

  const history = useHistory();
  const [dateRange, setDateRange] = useState([
    new Date(new Date().setDate(new Date().getDate() - 31)),
    new Date(),
  ]);
  const token = GetToken();

  const [dataTable, setDataTable] = useState([]);
  const [searchClient, setSearchClient] = useState("");

  const fields = useRef(typeFields(0));
  const listOptionClient = useRef([]);

  const getDataTable = async () => {
    const dataBody = {
      startDate: dateRange[0],
      endDate: dateRange[1],
      MaTK: "3311",
      TimKiem: searchClient,
    };

    const res = await trackPromise(
      fetch(API + "/api/events/EMLO_TONGHOP_131_331", {
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
    const { data } = await res.json();
    let temp = data[0]
      ? data.map((item) => ({
          ...item,
          PHAI_THU: item.PHAI_THU.toLocaleString(),
          DA_THU: item.DA_THU.toLocaleString(),
        }))
      : [];

    setDataTable(temp);
  };

  useEffect(() => {
    if (dateRange[0] && dateRange[1]) {
      getDataTable();
      setTable3311({ ...table3311, dateRange: dateRange });
    }
  }, [dateRange]);

  fields.current = typeFields(0);
  return (
    <CCard>
      <CCardHeader className="inputHeader">
        <h3 className="mb-3">Công Nợ Phải Trả Khách Hàng</h3>
        <CRow>
          <CCol md="6" className="mb-sm-3">
            <CRow className="pl-xl-3 justify-content-between">
              <CCol md="12" sm="6" className="text-center mb-2">
                <DateSelect {...{ dateRange, setDateRange }} />
              </CCol>
            </CRow>
          </CCol>
          <CCol md="6">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <label className="mfe-2">Khách hàng</label>

              <CInputGroup>
                <CInput
                  type="text"
                  id="input2-group2"
                  name="input2-group2"
                  placeholder="Từ khóa.."
                  value={searchClient}
                  onChange={(e) => setSearchClient(e.target.value)}
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
            fields={fields.current}
            itemsPerPage={5}
            hover
            pagination
            noItemsView={{
              noResults: "Trống",
              noItems: "Danh sách trống",
            }}
            clickableRows
            onRowClick={(item) => {
              setTable3311({
                ...table3311,
                MaKH: item.MaKH,
                TenDonVi: item.TenDonVi,
              });
              history.push("/tables/payClient-fact/detail");
            }}
          />
        )}
      </CCardBody>
      <CCardFooter>
        {promiseInProgress || !dataTable[0] ? null : (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label className="mfe-2">
              <strong>Tổng đã trả:</strong>
              {` ${dataTable
                .reduce(
                  (tong, currentValue) =>
                    tong + parseInt(currentValue.PHAI_THU.replace(/,/g, "")),
                  0
                )
                .toLocaleString()}
             VNĐ`}
            </label>
            <label className="mfe-2">
              <strong>Tổng phải trả:</strong>
              {` ${dataTable
                .reduce(
                  (tong, currentValue) =>
                    tong + parseInt(currentValue.DA_THU.replace(/,/g, "")),
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

export default TableCongNo3311;
