import { CFormGroup, CInput, CLabel, CTextarea } from "@coreui/react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ArrowBackIosOutlinedIcon from "@material-ui/icons/ArrowBackIosOutlined";
import React, { useEffect, useRef, useState } from "react";
import { API } from "src/const";
import DatePickerTime from "../common/DatePickerTime";
import TextField from "@mui/material/TextField";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

function convertToDate(str) {
  return new Date(str.split("/").reverse().join("-"));
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const convertCurrency = (money) => {
  if (money == "") return "";
  // 100.0000 => 1.000.000
  return Number(money.replaceAll(/\D/g, "")).toLocaleString();
};

const checkValidToUpdateKs = (a, b) => {
  if (
    Number(a.replaceAll(/\D/g, "")) > 0 &&
    Number(b.replaceAll(/\D/g, "")) > 0
  )
    return true;
  return false;
};

export default function DialogFullScreen({
  open,
  setOpen,
  itemIsClicked,
  getDataTable,
  setShowAlert,
}) {
  const { TenVT, ID, DongiaV } = itemIsClicked || {};
  const soTienInputRef = useRef();
  const [SLdau, setSLdau] = useState();
  const [GhiChu, setGhiChu] = useState();
  const [SoTienV, setSoTienV] = useState();
  const [SLcuoi, setSLcuoi] = useState();
  const [ST141, setST141] = useState();
  const [ChiPhi, setChiPhi] = useState();
  const [tienDau, setTienDau] = useState();
  const [dateSelect, setDateSelect] = useState(new Date());
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };
  console.log('itemIsClicked', itemIsClicked)
  useEffect(() => {
    if (itemIsClicked) {
      setSLdau(itemIsClicked.SLdau);
      setGhiChu(itemIsClicked.GhiChu);
      setSoTienV(itemIsClicked.SoTienV + " VND");
      setSLcuoi(itemIsClicked.SLcuoi);
      setST141(itemIsClicked.ST141 + " VND");
      setChiPhi(itemIsClicked.ChiPhi + " VND");
      setTienDau(itemIsClicked.TienDau + " VND");
      setDateSelect(new Date(itemIsClicked.Ngayct));
    }
  }, [itemIsClicked]);

  const updateNhatTrinh = async () => {
    const dataBody = {
      slDau: Number(SLdau.replaceAll(/\D/g, "")),
      slCuoi: Number(SLcuoi.replaceAll(/\D/g, "")),
      soTienV: Number(SoTienV.replaceAll(/\D/g, "")),
      ghiChu: GhiChu,
      chiPhi: Number(ChiPhi.replaceAll(/\D/g, "")),
      tienDau: Number(tienDau.replaceAll(/\D/g, "")),
      tamUng: Number(ST141.replaceAll(/\D/g, "")),
      id: ID,
      dateSelect: dateSelect,
    };

    console.log(
      "🚀 ~ file: DialogFullScreen.js ~ line 85 ~ updateNhatTrinh ~ dataBody",
      dataBody
    );

    let res = await fetch(API + "/api/updateNhatTrinh", {
      method: "post",
      body: JSON.stringify(dataBody),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    let { data } = await res.json();
    data = data || {};
    if (data.status !== "1") {
      alert("update không thành công!");
      return;
    }
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        disableEnforceFocus
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <ArrowBackIosOutlinedIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {`${TenVT} (${ID})`}
            </Typography>
            <Button
              color="inherit"
              onClick={async () => {
                if (
                  new Date(dateSelect) < convertToDate(itemIsClicked.NgayDi)
                ) {
                  alert("Ngày trả hàng không được nhỏ hơn ngày đi");
                  return;
                }
                handleClose();
                await updateNhatTrinh();
                getDataTable();
              }}
            >
              Lưu
            </Button>
          </Toolbar>
        </AppBar>
        <div className="container_list_inputRoad">
          <ul>
            <li>
              <DatePickerTime
                value={dateSelect}
                onChange={(value) => {
                  setDateSelect(value);
                }}
                label="Ngày trả hàng"
              />
            </li>
            <li>
              <TextField
                id="outlined-basic"
                label="Số lượng đầu"
                variant="outlined"
                fullWidth
                pattern="\d*"
                type="tel"
                value={SLdau == "0" ? "" : SLdau}
                onChange={(e) => {
                  setSLdau(convertCurrency(e.target.value));
                }}
              />
            </li>
            <li>
              <TextField
                id="outlined-basic"
                label="Số lượng cuối"
                variant="outlined"
                fullWidth
                pattern="\d*"
                type="tel"
                value={SLcuoi == "0" ? "" : SLcuoi}
                onChange={(e) => {
                  setSLcuoi(convertCurrency(e.target.value));
                }}
                onBlur={() => {
                  console.log(
                    (
                      Number(SLcuoi.replaceAll(/\D/g, "")) * DongiaV
                    ).toLocaleString()
                  );
                  setSoTienV(
                    (
                      Number(SLcuoi.replaceAll(/\D/g, "")) * DongiaV
                    ).toLocaleString() + " VND"
                  );
                }}
              />
            </li>
            <li>
              <TextField
                id="outlined-basic"
                inputRef={soTienInputRef}
                label="Số tiền"
                variant="outlined"
                fullWidth
                pattern="\d*"
                type="tel"
                value={SoTienV == "0" ? "" : SoTienV}
                onFocus={(e) => {
                  // disable input
                  soTienInputRef.current.blur();
                }}
              />

              {/* <CFormGroup>
                <CLabel htmlFor="SoTienV">Số tiền</CLabel>
                <CInput
                  innerRef={soTienInputRef}
                  size="lg"
                  id="SoTienV"
                  defaultValue={SoTienV == "0" ? "" : SoTienV}
                  autoComplete="off"
                  onFocus={(e) => {
                    // disable input
                    soTienInputRef.current.blur();
                  }}
                />
              </CFormGroup> */}
            </li>
            <li>
              <TextField
                id="outlined-basic"
                label="Chi phí"
                variant="outlined"
                fullWidth
                pattern="\d*"
                type="tel"
                value={ChiPhi == "0" ? "" : ChiPhi}
                onChange={(e) => {
                  setChiPhi(convertCurrency(e.target.value));
                }}
                onFocus={() => {
                  if (ChiPhi.length > 8) {
                    setChiPhi(ChiPhi.slice(0, ChiPhi.length - 8));
                  } else {
                    setChiPhi(ChiPhi.slice(0, ChiPhi.length - 4));
                  }
                }}
                onBlur={() => {
                  if (ChiPhi.length > 0) {
                    setChiPhi(ChiPhi + ".000 VND");
                  } else {
                  }
                }}
              />
            </li>

            <li>
              <TextField
                id="outlined-basic"
                label="Tiền Dầu"
                variant="outlined"
                fullWidth
                pattern="\d*"
                type="tel"
                value={tienDau == "0" ? "" : tienDau}
                onChange={(e) => {
                  setTienDau(convertCurrency(e.target.value));
                }}
                onFocus={() => {
                  if (tienDau.length > 8) {
                    setTienDau(tienDau.slice(0, tienDau.length - 8));
                  } else {
                    setTienDau(tienDau.slice(0, tienDau.length - 4));
                  }
                }}
                onBlur={() => {
                  if (tienDau.length > 0) {
                    setTienDau(tienDau + ".000 VND");
                  } else {
                  }
                }}
              />
            </li>
            <li>
              <TextField
                id="outlined-basic"
                label="Tiền ứng"
                variant="outlined"
                fullWidth
                pattern="\d*"
                type="tel"
                value={ST141 == "0" ? "" : ST141}
                onChange={(e) => {
                  setST141(convertCurrency(e.target.value));
                }}
                onFocus={() => {
                  if (ST141.length > 8) {
                    setST141(ST141.slice(0, ST141.length - 8));
                  } else {
                    setST141(ST141.slice(0, ST141.length - 4));
                  }
                }}
                onBlur={() => {
                  if (ST141.length > 0) {
                    setST141(ST141 + ".000 VND");
                  } else {
                  }
                }}
              />
            </li>
            <li>
              <TextField
                id="outlined-basic"
                label="Ghi chú"
                variant="outlined"
                fullWidth
                minRows={3}
                multiline
                value={GhiChu == "0" ? "" : GhiChu}
                onChange={(e) => {
                  setGhiChu(e.target.value);
                }}
              />
            </li>
          </ul>
        </div>
      </Dialog>
    </div>
  );
}
