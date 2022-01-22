import React, { useRef, useState } from "react";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import viLocale from "date-fns/locale/vi";
import TextField from "@mui/material/TextField";
import { CButton } from "@coreui/react";

function convertToDateString(date) {
  return (
    date.getDate().toString().padStart(2, "0") +
    "/" +
    (date.getMonth() + 1).toString().padStart(2, "0") +
    "/" +
    date.getFullYear().toString().padStart(2, "0")
  );
}

function DatePickerUpdateClosingDate({ setValue, value, label, updateKs }) {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={viLocale}>
        <MobileDatePicker
          label={label || "Ngày tháng"}
          value={value}
          okText="Hoàn Thành"
          cancelText="Hủy"
          onChange={() => {}}
          onAccept={(value) => {
            setValue(value);
            updateKs(value);
          }}
          renderInput={(params) => {
            return (
              <CButton
                onClick={() => {
                  params.inputProps.onClick();
                }}
                color="primary"
              >
                {`Khóa sổ: ${convertToDateString(new Date(value))}`}
              </CButton>
            );
          }}
        />
      </LocalizationProvider>
    </>
  );
}

export default DatePickerUpdateClosingDate;
