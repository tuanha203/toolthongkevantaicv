import React from "react";
import ClickItemOfDeclareRoad from "./views/declareRoad/ClickItemOfDeclareRoad";
import DeclareRoad from "./views/declareRoad/DeclareRoad";
import AllTable from "./views/table/AllTable";
import TableInputRoad from "./views/table/TableInputRoad";
import TableInventoryCompany from "./views/table/TableInventoryCompany";

// đang ghép
import TableDeposit from "./views/table/TableDeposit";
import TableNXT from "./views/table/TableNXT";
import TableCashFund from "./views/table/TableCashFund";
import TableCongNo1311 from "./views/table/TableCongNo1311";
import TableCongNo3311 from "./views/table/TableCongNo3311";
import Table1311Detail from "./views/table/Table1311Detail";
import Table3311Detail from "./views/table/Table3311Detail";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));

function routes(tenDonVi) {
  return [
    { path: "/", exact: true, name: "Trang chủ" },
    { path: "/dashboard", name: "Biểu đồ doanh thu", component: Dashboard },
    {
      path: "/tables/input_road",
      name: "Nhập Số Liệu Nhật Trình",
      component: TableInputRoad,
    },
    {
      path: "/tables/inventory_trans_company",
      name: "DT vận chuyển toàn công ty",
      component: TableInventoryCompany,
    },
    {
      path: "/declare_road",
      name: "Khai báo nhật trình vận tải",
      exact: true,
      component: DeclareRoad,
    },
    {
      path: "/declare_road/detail",
      name: "Khai báo nhật trình vận tải",
      component: ClickItemOfDeclareRoad,
    },
    {
      path: "/tables/deposit",
      name: "Số tiền gửi ngân hàng",
      component: TableDeposit,
    },
    { path: "/tables/inventory", name: "Báo cáo tồn kho", component: TableNXT },
    {
      path: "/tables/cashfund",
      name: "Số quỹ tiền mặt",
      component: TableCashFund,
    },
    {
      path: "/tables/payClient-fact/detail",
      name: "Chi tiết công nợ phải trả",
      component: Table3311Detail,
    },
    {
      path: "/tables/payClient-fact",
      name: "Công nợ phải trả khách hàng",
      component: TableCongNo3311,
    },
    {
      path: "/tables/debt-fact/detail",
      name: "Chi tiết công nợ phải thu",
      component: Table1311Detail,
    },
    {
      path: "/tables/debt-fact",
      name: "Công nợ phải thu khách hàng",
      component: TableCongNo1311,
    },
  ];
}

export default routes;
