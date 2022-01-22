import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import { context } from "src/App";
import { isLogin } from "src/views/pages/login/Login";
import { TheContent, TheSidebar, TheFooter, TheHeader } from "./index";

const TheLayout = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);
  const { infoUser, setInfoUser } = useContext(context);
  const history = useHistory();

  useEffect(async () => {
    if (cookies.accessToken) {
      setInfoUser(cookies.accessToken.maXe);
    } else {
      history.push("/login");
    }
  }, []);
  return (
    <div className="c-app c-default-layout">
      <TheSidebar />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          <TheContent />
        </div>
        <TheFooter />
      </div>
    </div>
  );
};

export default TheLayout;
