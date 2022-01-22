import React, { useContext,useEffect } from "react";
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import { context } from "src/App";
const TheHeaderDropdown = () => {
  const history = useHistory();
  const [cookies, setCookie, removeCookie] = useCookies(["pass"]);
  const { infoUser } = useContext(context);
  const { BSXE, TenXe } = infoUser;
  const handleSignOut = () => {
    removeCookie("accessToken");
    history.push("/login");
  };

  

  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2 ml-auto"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={"avatars/6.jpg"}
            className="c-avatar-img"
            alt="admin@bootstrapmaster.com"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem header tag="div" color="light" className="text-center">
          <strong>Tài Khoản</strong>
        </CDropdownItem>

        <CDropdownItem className="d-block d-flex justify-content-between">
          <div>
            <strong>Tên Xe:</strong>
          </div>
          <div>{TenXe ? TenXe : "Tài khoản chung"}</div>
        </CDropdownItem>

        <CDropdownItem divider />
        <CDropdownItem
          onClick={() => {
            handleSignOut();
          }}
        >
          <CIcon name="cil-lock-locked" className="mfe-2" />
          Đăng Xuất
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdown;
