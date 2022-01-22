import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import React, { useRef } from "react";

const useStyles = makeStyles((theme) => ({
  ul_Autocomplete: {
    "& + div ul.MuiAutocomplete-listbox ": {
      maxHeight: "100vh",
    },
  },
}));

export default function AutocompleteInput({
  label,
  options,
  onChange,
  defaultValue,
}) {
  const refInput = useRef();
  const demo = useRef();
  const classes = useStyles();
  const lastPositionYScroll = useRef();

  function handleClickOutside(event) {
    if (refInput.current && !refInput.current.contains(event.target)) {
      refInput.current.classList.remove("move-top");
      document.querySelector("body").classList.remove("invisible");
      // tắt keyboard
      refInput.current.querySelector("input").blur();
      document.querySelector("html").classList.remove("no-scroll");
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }

  return (
    <div ref={refInput}>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        ref={demo}
        options={options}
        onChange={onChange}
        defaultValue={defaultValue || null}
        /* isOptionEqualToValue={(option, value) => option.code === value.code} */
        className={classes.ul_Autocomplete}
        noOptionsText="Không có kết quả"
        onClose={() => {
          refInput.current.classList.remove("move-top");
          document.querySelector("body").classList.remove("invisible");
          // tắt keyboard
          refInput.current.querySelector("input").blur();
          document.querySelector("html").classList.remove("no-scroll");
          document.removeEventListener("mousedown", handleClickOutside);
          // di chuyển lại vị trí cuối cùng
          setTimeout(() => {
            window.scrollTo(0, lastPositionYScroll.current);
          }, 0);
        }}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField
            onFocus={(e) => {
              // lưu lại vị trí cuối cùng khi focus input
              lastPositionYScroll.current = window.scrollY;
              // ẩn hết mọi thứ, hiện mỗi input
              refInput.current.classList.add("move-top");
              document.querySelector("body").classList.add("invisible");
              // kéo scroll lên trên, setTime để việc này xử lý cuối cùng
              setTimeout(() => {
                window.scrollTo(0, 0);
              }, 0);
              // không cho scroll toàn màn hình
              document.querySelector("html").classList.add("no-scroll");
              //
              document.addEventListener("mousedown", handleClickOutside);
            }}
            fullWidth
            {...params}
            label={label}
          />
        )}
      />
    </div>
  );
}
