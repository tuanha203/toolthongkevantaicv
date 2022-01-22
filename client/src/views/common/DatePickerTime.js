import React from "react";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import viLocale from "date-fns/locale/vi";
import TextField from "@mui/material/TextField";
import { CButton } from "@coreui/react";
function DatePickerTime({ value, onChange, label }) {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={viLocale}>
        <MobileDatePicker
          label={label || "Ngày tháng"}
          value={value}
          okText="Hoàn Thành"
          cancelText="Hủy"
          onChange={onChange}
          renderInput={(params) => {
            return <TextField fullWidth {...params} />;
          }}
        />
      </LocalizationProvider>
    </>
  );
}

export default DatePickerTime;
