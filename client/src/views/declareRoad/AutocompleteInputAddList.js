import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import React, { createRef, useRef, useState } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";

const useStyles = makeStyles((theme) => ({
  ul_Autocomplete: {
    "& + div ul.MuiAutocomplete-listbox ": {
      maxHeight: "100vh",
    },
  },
}));

export default function AutocompleteInputAddList({
  label,
  options,
  onChange,
  defaultValue,
  modalAdd,
  setModalAdd,
  nameListIsAdd,
  refInputClone,
}) {
  const refInput = useRef();
  const demo = useRef();
  const classes = useStyles();
  const [valueInputState, setValueInputState] = useState("");
  const valueInput = useRef();
  const lastPositionYScroll = useRef();
  const { API_listInput_DelareRoad } = useStoreState((state) => state);

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

  function clearTextInput() {
    setValueInputState("");
  }

  return (
    <div
      className={
        label == "Khách hàng"
          ? "customer"
          : label == "Cung đường"
          ? "road"
          : null
      }
      ref={refInput}
    >
      <Autocomplete
        disablePortal
        freeSolo
        id="combo-box-demo"
        ref={demo}
        options={options}
        onChange={(e, value) => {
          onChange(e, value);
          valueInput.current = value;
        }}
        defaultValue={defaultValue || null}
        /* isOptionEqualToValue={(option, value) => option.code === value.code} */
        className={classes.ul_Autocomplete}
        noOptionsText="Không có kết quả"
        inputValue={valueInputState}
        onInputChange={(e, value) => {
          onChange(e, value);
          setValueInputState(value);
          valueInput.current = value;
        }}
        onClose={(e) => {
          refInputClone.current = clearTextInput;

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
          // handle add item into list db

          if (typeof valueInput.current === "string" && valueInput.current !== "") {
            if (label === "Khách hàng") {
              if (
                API_listInput_DelareRoad.listCustomer.findIndex(
                  (item) =>
                    item.name.toLowerCase() == valueInput.current.toLowerCase()
                ) == -1
              ) {
                setModalAdd(!modalAdd);
                nameListIsAdd.current = "customer";
              }
            } else if (label === "Cung đường") {
              if (
                API_listInput_DelareRoad.listRoad.findIndex(
                  (item) =>
                    item.name.toLowerCase() == valueInput.current.toLowerCase()
                ) == -1
              ) {
                setModalAdd(!modalAdd);
                nameListIsAdd.current = "road";
              }
            }
          }
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
