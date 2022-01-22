import React, { useEffect, useRef, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useHistory } from "react-router-dom";
import { API, areas } from "src/const";
import { useContext } from "react";
import { context } from "src/App";
import { useCookies } from "react-cookie";
import { Backdrop, makeStyles } from "@material-ui/core";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { Spinner } from "src/Spinner";
export const isLogin = async (user, pass) => {
  let dataBody = { user, pass };

  const res = await trackPromise(
    fetch(API + "/api/verifylogin", {
      method: "post",
      body: JSON.stringify(dataBody),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }),
    areas.tableOwe
  );

  const resData = await res.json();
  return resData;
};

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
    "& .spinner": {
      margin: 0,
      "& div": {
        height: "100%",
      },
    },
  },
}));

const Login = (props) => {
  const [pass, setPass] = useState("");
  const [user, setUser] = useState();
  const history = useHistory();
  const { infoUser, setInfoUser } = useContext(context);
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);
  const classes = useStyles();
  const { promiseInProgress } = usePromiseTracker({
    area: areas.tableOwe,
    delay: 0,
  });

  const handleEnterInput = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!pass) return;
      let res = await isLogin(user, pass);
      if (!res.data.error) {
        setInfoUser(res.data.maXe);
        setCookie("accessToken", res.data, {
          path: "/",
          expires: new Date("3200-1-1"),
        });
        return history.replace("dashboard");
      }
      return alert(res.data.error);
    }
  };

  const handleButton = async () => {
    if (!pass) return;
    let res = await isLogin(user, pass);

    if (!res.data.error) {
      setInfoUser(res.data.maXe);
      setCookie("accessToken", res.data, {
        path: "/",
        expires: new Date("3200-1-1"),
      });
      return history.replace("dashboard");
    }
    return alert(res.data.error);
  };

  useEffect(async () => {
    if (cookies.accessToken) {
      setInfoUser(cookies.accessToken.maXe);
      return history.replace("/dashboard");
    }
  }, []);

  return (
    <div
      className="c-app c-default-layout flex-row align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <Backdrop className={classes.backdrop} open={promiseInProgress}>
        <Spinner area={areas.tableOwe} />
      </Backdrop>

      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="6">
            <CCard className="p-4">
              <CCardBody>
                <CForm>
                  <h1>Đăng Nhập</h1>
                  <div className="wrap-input">
                    <CInputGroup>
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        value={user}
                        onChange={(e) => {
                          setUser(e.target.value);
                        }}
                        onKeyPress={handleEnterInput}
                        placeholder="Nhập tài khoản"
                        autoComplete="username"
                      />
                    </CInputGroup>
                  </div>

                  <div className="wrap-input">
                    <CInputGroup>
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="password"
                        placeholder="Nhập mật mã"
                        autoComplete="current-password"
                        value={pass}
                        onChange={(e) => {
                          setPass(e.target.value);
                        }}
                        onKeyPress={handleEnterInput}
                      />
                    </CInputGroup>
                  </div>

                  <CRow>
                    <CCol xs="6">
                      <CButton
                        onClick={handleButton}
                        className="px-4"
                        color="primary"
                        style={{ color: "white" }}
                      >
                        Tiếp Tục
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
