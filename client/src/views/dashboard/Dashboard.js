import { CCard, CCardBody, CCardFooter, CCardHeader } from "@coreui/react";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { useHistory } from "react-router-dom";
import { API, areas } from "src/const";
import { Spinner } from "src/Spinner";
import DateSelect from "../common/DateSelect";
import GetToken from "../common/GetToken";
import { config_Bar } from "./configCharts";

const styleInline = {
  labelFooter: {
    fontSize: "16px",
  },
  divFooter: {
    display: "flex",
    flexDirection: "column",
  },
};

const Dashboard = () => {
  const history = useHistory();
  const [dataBar, setDataBar] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState();
  const date = new Date(),
    y = date.getFullYear(),
    m = date.getMonth();
  const [dateRange, setDateRange] = useState([new Date(y, m, 1), date]);

  const { promiseInProgress: promiseInProgressBar } = usePromiseTracker({
    area: areas.bar,
    delay: 0,
  });

  const token = GetToken();
  const configBar = config_Bar(dataBar);
  useEffect(async () => {
    // Why: startDate 0 giờ <= .. <= endDate 24 giờ
    let endDateAllDay = new Date(dateRange[1]);
    if (endDateAllDay) endDateAllDay.setDate(endDateAllDay.getDate() + 1);

    const dataBody = {
      startDate: dateRange[0],
      endDate: endDateAllDay,
    };

    const res = await trackPromise(
      fetch(API + "/api/XuatBT_TongHopDT_CongTy", {
        method: "post",
        body: JSON.stringify(dataBody),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      areas.bar
    );
    const { data } = await res.json();
    setDataBar(data);
    setTotalRevenue(data.reduce((tong, current) => tong + current.SoTienV, 0));
  }, [dateRange]);
  console.log(dataBar);
  return (
    <>
      <>
        <CCard>
          <CCardHeader id="titleChart">
            <h4 className="mb-3">{`Biểu Đồ Doanh Thu`}</h4>
            <DateSelect {...{ dateRange, setDateRange }} />
          </CCardHeader>

          <CCardBody
            style={{
              overflow: "auto",
              padding: "1.5rem 0",
              paddingTop: "10px",
            }}
          >
            {promiseInProgressBar ? null : dataBar[0] ? (
              <Chart
                className={"charBar"}
                options={configBar.options}
                series={configBar.series}
                type="bar"
                width={
                  dataBar.length < 13
                    ? "100%"
                    : 31.25 * dataBar.length
                }
                height="400"
              />
            ) : (
              <h4
                style={{
                  color: "rgb(253 140 140)",
                  textAlign: "center",
                  marginTop: "16px",
                }}
              >
                Không có dữ liệu
              </h4>
            )}
            <Spinner area={areas.bar} />
          </CCardBody>
          <CCardFooter>
            {promiseInProgressBar || !dataBar[0] ? null : (
              <div style={styleInline.divFooter}>
                <label style={styleInline.labelFooter} className="mfe-2">
                  <strong>Tổng doanh thu: </strong>
                  {(totalRevenue && totalRevenue.toLocaleString()) || ""} VND
                </label>
              </div>
            )}
          </CCardFooter>
        </CCard>
      </>
    </>
  );
};

export default Dashboard;
