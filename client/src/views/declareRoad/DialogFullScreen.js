import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ArrowBackIosOutlinedIcon from "@material-ui/icons/ArrowBackIosOutlined";
import TextField from "@mui/material/TextField";
import React, { useEffect, useRef, useState } from "react";
import { API } from "src/const";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const checkValidToUpdateKs = (a, b) => {
  console.log(Number(a.replaceAll(/\D/g, "")));
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
  setItemIsClicked,
  getDataTable,
  setShowAlert,
}) {
  const { TenVT, ID } = itemIsClicked || {};

  const [SLdau, setSLdau] = useState();
  const [GhiChu, setGhiChu] = useState();
  const [SoTienV, setSoTienV] = useState();
  const [SLcuoi, setSLcuoi] = useState();
  const [ST141, setST141] = useState();
  const [ChiPhi, setChiPhi] = useState();
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (itemIsClicked) {
      setSLdau(itemIsClicked.SLdau);
      setGhiChu(itemIsClicked.GhiChu);
      setSoTienV(itemIsClicked.SoTienV + " VND");
      setSLcuoi(itemIsClicked.SLcuoi);
      setST141(itemIsClicked.ST141 + " VND");
      setChiPhi(itemIsClicked.ChiPhi + " VND");
    }
  }, [itemIsClicked]);

  const updateNhatTrinh = async () => {
    const dataBody = {
      slDau: Number(SLdau.replaceAll(/\D/g, "")),
      slCuoi: Number(SLcuoi.replaceAll(/\D/g, "")),
      soTienV: Number(SoTienV.replaceAll(/\D/g, "")),
      ghiChu: GhiChu,
      chiPhi: Number(ChiPhi.replaceAll(/\D/g, "")),
      tamUng: Number(ST141.replaceAll(/\D/g, "")),
      id: ID,
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
    if (checkValidToUpdateKs(SLcuoi, ChiPhi)) {
      updateKS();
      console.log("update ks");
    } else {
      getDataTable();
      console.log("khong update");
    }
  };

  const updateKS = async () => {
    const dataBody = {
      id: ID,
    };

    let res = await fetch(API + "/api/updateKS", {
      method: "post",
      body: JSON.stringify(dataBody),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    let { data } = await res.json();
    data = data || {};
    if (!data.success) {
      alert("update khóa sổ không thành công!");
      return;
    }
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
    getDataTable();
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        onChange={(e) => {
          console.log(e.target.name, e.target.value);
        }}
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
              onClick={() => {
                updateNhatTrinh();
                handleClose();
              }}
            >
              Lưu
            </Button>
          </Toolbar>
        </AppBar>
        <div className="container_list_declareRoad">
          <ul>
            <li></li>
            <li>
              <TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
                name="b"
                sx={{ width: "100%" }}
              />
            </li>
            <li>
              <TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
                name="b"
                sx={{ width: "100%" }}
              />
            </li>
          </ul>
        </div>
      </Dialog>
    </div>
  );
}
