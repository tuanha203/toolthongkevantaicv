import React, { useContext } from "react";
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from "@coreui/react";
import { useStoreState, useStoreActions } from "easy-peasy";
import CIcon from "@coreui/icons-react";
// sidebar nav config
import { _nav as navigation, _navForGeneralAccount } from "./_nav";
import { context } from "src/App";

const TheSidebar = () => {
  const show = useStoreState((state) => state.changeState.sidebarShow);
  const setChangeState = useStoreActions((actions) => actions.setChangeState);
  const {
    infoUser: { TenXe },
  } = useContext(context);
  return (
    <CSidebar
      show={show}
      onShowChange={(val) => setChangeState({ type: "set", sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <img width={40} src="./img/logo192.png" alt="" />
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={TenXe === "general" ? _navForGeneralAccount : navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
