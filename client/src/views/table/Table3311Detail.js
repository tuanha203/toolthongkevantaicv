import {
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
} from "@coreui/react";
import React, { useEffect, useRef, useState } from "react";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { useHistory } from "react-router-dom";
import { API, areas } from "src/const";
import { Spinner } from "src/Spinner";
import DateSelect from "../common/DateSelect";
import { useStoreActions, useStoreState } from "easy-peasy";
import GetToken from "../common/GetToken";
const typeFields = (type) => {
  switch (type) {
    case 1:
      return [
        {
          key: "SoHieuCT",
          label: "S.H Chứng Từ",
          _style: { whiteSpace: "nowrap" },
          sorter: false,
        },
        {
          key: "NgayCT",
          label: "Ngày Chứng Từ",
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
          key: "SoLuong",
          label: "Số Lượng",
          _style: { whiteSpace: "nowrap" },
          sorter: false,
        },
        {
          key: "DonGiaBan",
          label: "Đơn Giá",
          _style: { whiteSpace: "nowrap" },
          sorter: false,
        },
        {
          key: "PhaiTHu",
          label: "Đã Trả",
          _style: { whiteSpace: "nowrap" },
          sorter: false,
        },
        {
          key: "DaThu",
          label: "Phải Trả",
          _style: { whiteSpace: "nowrap" },
          sorter: false,
        },
      ];

    default:
      break;
  }
};

const styleInline = {
  h5: { position: "relative", top: "15px" },
};

function Table3311Detail() {
  const { promiseInProgress } = usePromiseTracker({
    area: areas.tableOwe,
    delay: 0,
  });

  const history = useHistory();

  const {
    table3311: { dateRange: dateRangeFromParent, MaKH, TenDonVi },
  } = useStoreState((state) => state);

  const [dateRange, setDateRange] = useState(dateRangeFromParent);

  const [dataTable, setDataTable] = useState([]);
  const token = GetToken();

  const fields = useRef(typeFields(1));
  const listOptionClient = useRef([]);

  const getDataTable = async () => {
    const dataBody = {
      startDate: dateRange[0],
      endDate: dateRange[1],
      MaTK: "3311",
      MaCT: MaKH,
    };
    const res = await trackPromise(
      fetch(API + "/api/events/EMLO_ChiTiet_CongNo_131_331", {
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
          PhaiTHu: item.PhaiTHu.toLocaleString(),
          DaThu: item.DaThu.toLocaleString(),
        }))
      : [];

    setDataTable(temp);
  };

  useEffect(() => {
    if (dateRange[0] && dateRange[1]) getDataTable();
  }, [dateRange]);

  useEffect(() => {
    if (dataTable[0] && dataTable[0].TenDonVi) {
      listOptionClient.current = dataTable.map((item) => ({
        MaKH: item.MaKH,
        TenDonVi: item.TenDonVi,
      }));
    }
  }, [dataTable]);

  fields.current = typeFields(1);
  return (
    <CCard>
      <CCardHeader className="inputHeader">
        <h3 className="mb-3">Chi Tiết Công Nợ Phải Trả</h3>
        <CRow>
          <CCol md="12" className="mb-sm-3">
            <CRow className="pl-xl-3 justify-content-between">
              <CCol md="12" sm="6" className="text-center mb-2">
                <DateSelect {...{ dateRange, setDateRange }} />
              </CCol>
              <CCol md="12" sm="6" className="text-center mb-2">
                <h5 style={styleInline.h5}>{TenDonVi}</h5>
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
            striped
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
            <label className="mfe-2">
              <strong>Tổng đã trả:</strong>
              {` ${dataTable
                .reduce(
                  (tong, currentValue) =>
                    tong + parseInt(currentValue.PhaiTHu.replace(/,/g, "")),
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
                    tong + parseInt(currentValue.DaThu.replace(/,/g, "")),
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

export default Table3311Detail;
