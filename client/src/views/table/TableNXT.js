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
import { API, areas } from "src/const";
import DateSelect from "../common/DateSelect";
import { context } from "src/App";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { Spinner } from "src/Spinner";
import { useHistory } from "react-router-dom";
import GetToken from "../common/GetToken";
const typeFields = (type) => {
  switch (type) {
    case 1:
      return [
        {
          key: "TenVT",
          label: "Tên Vật Tư",
          _style: { whiteSpace: "nowrap" },
          sorter: false,
        },
        {
          key: "DVT",
          label: "ĐVT",
          _style: { whiteSpace: "nowrap" },
          sorter: false,
        },
        {
          key: "SLDK",
          label: "SL Đăng Ký",
          _style: { whiteSpace: "nowrap" },
          sorter: false,
        },
        {
          key: "SLNhap",
          label: "SL Nhập",
          _style: { whiteSpace: "nowrap" },
          sorter: false,
        },
        {
          key: "SLXuat",
          label: "SL Xuất",
          _style: { whiteSpace: "nowrap" },
          sorter: false,
        },
        {
          key: "SLCK",
          label: "SL Cuối Kỳ",
          _style: { whiteSpace: "nowrap" },
        },
      ];

    default:
      break;
  }
};
function TableNXT() {
  const history = useHistory();
  const [dateRange, setDateRange] = useState([
    new Date(new Date().setDate(new Date().getDate() - 31)),
    new Date(),
  ]);
  const [list, setList] = useState({ danhSachKho: [], danhSachNhom: [] });
  const [maNhom, setMaNhom] = useState("");
  const [maKho, setMaKho] = useState("");
  const [tenHang, setTenHang] = useState("");
  const [dataTable, setDataTable] = useState([]);
  const token = GetToken()

  


  const { promiseInProgress } = usePromiseTracker({
    area: areas.tableNxt,
    delay: 0,
  });

  const getList = async () => {
    const dataBody = {
      getList: true,
    };

    const res = await trackPromise(
      fetch(API + "/api/events/thue_rpt_baocaotonghop_banhang", {
        method: "post",
        body: JSON.stringify(dataBody),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
      }),
      areas.tableNxt
    );
    const { data } = await res.json();

    setList(data);
    setMaKho(data.danhSachKho[0].maKho);
  };

  const getDataTable = async () => {
    const dataBody = {
      startDate: dateRange[0],
      endDate: dateRange[1],
      maKho: maKho,
      maNhom: maNhom,
      tenHang: tenHang,
    };
    console.log(dataBody);
    const res = await trackPromise(
      fetch(API + "/api/events/EMLO_TONGHOP_NXT", {
        method: "post",
        body: JSON.stringify(dataBody),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
      }),
      areas.tableNxt
    );
    const { data } = await res.json();

    setDataTable(data);
  };

  useEffect(() => {
    getList();
  }, []);

  console.log(list.danhSachKho);

  useEffect(() => {
    if (list.danhSachKho[0] && dateRange[0] && dateRange[1]) {
      getDataTable();
    }
  }, [list, maKho, maNhom, dateRange]);

  const fields = typeFields(1);
  return (
    <CCard>
      <CCardHeader className="inputHeader">
        <h3 className="mb-3">Báo Cáo Hàng Tồn Kho</h3>
        <CRow>
          <CCol xl="7" className="mb-sm-3">
            <CRow className="pl-xl-3 justify-content-between">
              <CCol xl="5" sm="6" className="text-center mb-2">
                <DateSelect {...{ dateRange, setDateRange }} />
              </CCol>
              <CCol xl="7" sm="6" className="mb-2">
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <label className="mfe-2">Kho</label>
                  <select
                    className="form-control"
                    aria-label="changes number of visible items"
                    value={maKho}
                    onChange={(e) => {
                      setMaKho(e.target.value);
                    }}
                  >
                    {list.danhSachKho.map((item, index) => (
                      <option key={index} value={item.maKho}>
                        {item.TenKho}
                      </option>
                    ))}
                  </select>
                </div>
              </CCol>
            </CRow>
          </CCol>
          <CCol xl="5">
            <CRow>
              <CCol xl="7" sm="6" className="text-center mb-2">
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <label className="mfe-2">Nhóm</label>
                  <select
                    className="form-control"
                    aria-label="changes number of visible items"
                    value={maNhom}
                    onChange={(e) => {
                      setMaNhom(e.target.value);
                    }}
                  >
                    <option value={""}>Không</option>
                    {list.danhSachNhom.map((item, index) => (
                      <option key={index} value={item.maNhom}>
                        {item.TenNhom}
                      </option>
                    ))}
                  </select>
                </div>
              </CCol>
              <CCol xl="5" sm="6">
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <label className="mfe-2">Tên Hàng</label>

                  <CInputGroup>
                    <CInput
                      type="text"
                      id="input2-group2"
                      name="input2-group2"
                      placeholder="Từ khóa.."
                      value={tenHang}
                      onChange={(e) => {
                        setTenHang(e.target.value);
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
          </CCol>
        </CRow>
      </CCardHeader>
      <CCardBody>
        <Spinner area={areas.tableNxt} />
        {promiseInProgress ? null : (
          <CDataTable
            items={
              dataTable[0] && (dataTable[0].SLDK || dataTable[0].SLDK === 0)
                ? dataTable.map((item) => ({
                    ...item,
                    SLDK: item.SLDK.toLocaleString(),
                    SLNhap: item.SLNhap.toLocaleString(),
                    SLXuat: item.SLXuat.toLocaleString(),
                    SLCK: item.SLCK.toLocaleString(),
                  }))
                : []
            }
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
    </CCard>
  );
}

export default TableNXT;
