import { CButton, CInput, CLabel } from "@coreui/react";
import vi from "date-fns/locale/vi";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("vi", vi);

function range(start, end) {
  return new Array(end - start + 1).fill(undefined).map((_, i) => i + start);
}

function convertToDateString(date) {
  if (!date) return "";
  return (
    date.getDate().toString().padStart(2, "0") +
    "/" +
    (date.getMonth() + 1).toString().padStart(2, "0") +
    "/" +
    date.getFullYear().toString().padStart(2, "0")
  );
}

function convertToDate(str) {
  return new Date(str.split("/").reverse().join("-"));
}

function checkValidateDateString(dateString) {
  if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) return false;

  var parts = dateString.split("/");
  var day = parseInt(parts[0], 10);
  var month = parseInt(parts[1], 10);
  var year = parseInt(parts[2], 10);

  if (year < 1000 || year > 3000 || month == 0 || month > 12) return false;

  var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
    monthLength[1] = 29;

  return day > 0 && day <= monthLength[month - 1];
}

function autoSlash(str) {
  str = str.replaceAll("/", "");
  let temp = str.match(/[\d]{1,4}/g);
  if (temp) {
    let dayMonth = temp[0].match(/[\d]{1,2}/g).join("/");
    let year = temp[1] || "";
    let date = dayMonth + "/" + year;
    return date;
  }
  return "";
}

const DateSelect = ({ dateRange, setDateRange }) => {
  const [startDate, endDate] = dateRange;
  const [toggle, setToggle] = useState(false);
  const [startDateInput, setStartDateInput] = useState();
  const [endDateInput, setEndDateInput] = useState();
  const lastPositionYScroll = useRef();
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <CButton
      onClick={(e) => {
        onClick(e);
        setToggle(!toggle);
      }}
      color="primary"
    >
      {value}
    </CButton>
  ));

  const years = range(1990, new Date().getFullYear());
  const months = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];

  useEffect(() => {
    setStartDateInput(convertToDateString(startDate));
    setEndDateInput(convertToDateString(endDate));
  }, [dateRange, toggle]);

  useEffect(() => {
    // lưu lại vị trí cuối cùng rồi quay trở lại, để maintain layout khi nhập input
    window.scrollTo(0, lastPositionYScroll.current);
  }, [dateRange]);

  return (
    <div className="rangeTime justify-content-between justify-content-md-center text-center">
      <CLabel className="labelTime">Khoảng thời gian</CLabel>
      <DatePicker
        selectsRange
        onChange={(update) => {
          setDateRange(update);
        }}
        shouldCloseOnSelect={false}
        startDate={startDate}
        endDate={endDate}
        locale="vi"
        withPortal
        dateFormat="dd/MM/yyyy"
        customInput={<ExampleCustomInput />}
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CLabel
                style={{
                  position: "relative",
                  fontSize: "16px",
                  top: "4px",
                  right: "3px",
                  color: "#3c4b64",
                }}
              >
                Từ
              </CLabel>

              <CInput
                id="date"
                style={{
                  width: "30%",
                }}
                type="tel"
                invalid={!checkValidateDateString(startDateInput)}
                placeholder="dd/mm/yyyy"
                value={startDateInput}
                onChange={(e) => {
                  let valueCurrent = e.target.value;
                  if (
                    startDateInput[startDateInput.length - 1] === "/" &&
                    e.target.value.length < startDateInput.length
                  ) {
                    valueCurrent = valueCurrent.substring(
                      0,
                      valueCurrent.length - 1
                    );
                  }
                  let result = autoSlash(valueCurrent);
                  setStartDateInput(result);
                  if (checkValidateDateString(result)) {
                    lastPositionYScroll.current = window.scrollY;
                    setDateRange([convertToDate(result), endDate]);
                  }
                }}
                pattern="\d*"
                onFocus={() => {
                  document
                    .querySelector(".react-datepicker__month")
                    .classList.add("d-none");
                }}
                onBlur={() => {
                  document
                    .querySelector(".react-datepicker__month")
                    .classList.remove("d-none");
                }}
              />

              <CLabel
                style={{
                  position: "relative",
                  fontSize: "16px",
                  top: "4px",
                  color: "#3c4b64",
                  marginLeft: "5px",
                  marginRight: "3px",
                }}
              >
                Đến
              </CLabel>

              <CInput
                id="date"
                style={{
                  width: "30%",
                }}
                type="tel"
                invalid={!checkValidateDateString(endDateInput)}
                placeholder="dd/mm/yyyy"
                value={endDateInput}
                onChange={(e) => {
                  let valueCurrent = e.target.value;
                  if (
                    endDateInput[endDateInput.length - 1] === "/" &&
                    e.target.value.length < endDateInput.length
                  ) {
                    valueCurrent = valueCurrent.substring(
                      0,
                      valueCurrent.length - 1
                    );
                  }
                  let result = autoSlash(valueCurrent);
                  setEndDateInput(result);
                  if (checkValidateDateString(result)) {
                    lastPositionYScroll.current = window.scrollY;
                    setDateRange([startDate, convertToDate(result)]);
                  }
                }}
                pattern="\d*"
                onFocus={() => {
                  document
                    .querySelector(".react-datepicker__month")
                    .classList.add("d-none");
                }}
                onBlur={() => {
                  document
                    .querySelector(".react-datepicker__month")
                    .classList.remove("d-none");
                }}
              />
            </div>
            <div
              style={{
                margin: 10,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CButton
                color="primary"
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
                style={{
                  marginRight: "6px",
                }}
              >
                {"<"}
              </CButton>

              <select
                className="form-control"
                style={{ width: "30%" }}
                value={date.getFullYear()}
                onChange={({ target: { value } }) => changeYear(value)}
              >
                {years.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <select
                className="form-control"
                style={{ width: "30%" }}
                value={months[date.getMonth()]}
                onChange={({ target: { value } }) =>
                  changeMonth(months.indexOf(value))
                }
              >
                {months.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <CButton
                color="primary"
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
                style={{
                  marginLeft: "6px",
                }}
              >
                {">"}
              </CButton>
            </div>
          </>
        )}
      />
    </div>
  );
};

export default DateSelect;
