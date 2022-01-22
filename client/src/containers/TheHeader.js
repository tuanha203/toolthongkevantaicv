import {
  CHeader, CHeaderNav, CToggler
} from "@coreui/react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ArrowBackIosOutlinedIcon from "@material-ui/icons/ArrowBackIosOutlined";
import IconButton from '@mui/material/IconButton';
import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useContext } from "react";
import { useHistory } from "react-router";
import { HashRouter, Route, Switch } from "react-router-dom";
import { context } from "src/App";
import {
  TheHeaderDropdown
} from "./index";



const useStyles = makeStyles((theme) => ({
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  appBar: {
    position: "sticky",
  },
}));

const TheHeader = () => {
  const sidebarShow = useStoreState((state) => state.changeState.sidebarShow);
  const setChangeState = useStoreActions((actions) => actions.setChangeState);
  const { infoUser } = useContext(context);
  const classes = useStyles();
  const history = useHistory();

  const {
    itemClick_DelareRoad,
    table_DelareRoad,
    recordTable_DelareRoad,
    closingDate,
  } = useStoreState((state) => state);
  const { setTable_DelareRoad } = useStoreActions((actions) => actions);

  const toggleSidebar = () => {
    const val = [true, "responsive"].includes(sidebarShow)
      ? false
      : "responsive";

    setChangeState({ type: "set", sidebarShow: val });
  };

  const toggleSidebarMobile = () => {
    const val = [false, "responsive"].includes(sidebarShow)
      ? true
      : "responsive";
    setChangeState({ type: "set", sidebarShow: val });
  };

  return (
    <HashRouter>
      <Switch>
        <Route path="/declare_road/detail">
          <AppBar className={classes.appBar} id="navbar-declareRoad__detail">
            <Toolbar>
              <IconButton
                onClick={() => {
                  history.push("/declare_road");
                }}
                edge="start"
                color="inherit"
                aria-label="close"
              >
                <ArrowBackIosOutlinedIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                {itemClick_DelareRoad ? "Chỉnh sửa" : "Thêm mới"}
              </Typography>
              <Button
                onClick={() => {
                  // click or add
                  let {
                    dateSelect,
                    customer,
                    road,
                    goods,
                    carrier,
                    rates,
                    car,
                  } = recordTable_DelareRoad;

                  console.log(recordTable_DelareRoad)

                  if (
                    dateSelect &&
                    customer &&
                    road &&
                    goods &&
                    carrier &&
                    rates &&
                    car
                  ) {
                    if (new Date(closingDate) >= new Date(dateSelect)) {
                      alert("Đã khóa sổ đến ngày này!");
                    } else {
                      if (itemClick_DelareRoad) {
                        let temp = [...table_DelareRoad];
                        temp.splice(itemClick_DelareRoad.index, 1, {
                          ...recordTable_DelareRoad,
                        });

                        setTable_DelareRoad(temp);
                      } else {
                        setTable_DelareRoad([
                          ...table_DelareRoad,
                          { ...recordTable_DelareRoad },
                        ]);
                      }
                      history.push("/declare_road");
                    }
                  } else {
                    alert("Nhập không đủ thông tin");
                  }
                }}
                color="inherit"
              >
                Lưu
              </Button>
            </Toolbar>
          </AppBar>
        </Route>
        <Route path="/">
          <CHeader style={{ alignItems: "center" }}>
            <CToggler
              inHeader
              className="ml-md-3 d-lg-none"
              onClick={toggleSidebarMobile}
            />
            <CToggler
              inHeader
              className="ml-3 d-md-down-none"
              onClick={toggleSidebar}
            />
            <h6 className="titleNavBar">Vận Tải</h6>

            <CHeaderNav className="px-3 ml-auto">
              <TheHeaderDropdown />
            </CHeaderNav>
          </CHeader>
        </Route>
      </Switch>
    </HashRouter>
  );
};

export default TheHeader;
