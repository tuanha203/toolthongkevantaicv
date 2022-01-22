import React from "react";
import EqualizerOutlinedIcon from "@material-ui/icons/EqualizerOutlined";
import BookOutlinedIcon from "@material-ui/icons/BookOutlined";
import TableChartOutlinedIcon from "@material-ui/icons/TableChartOutlined";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";

const _navForGeneralAccount = [
  {
    _tag: "CSidebarNavItem",
    name: "Biểu Đồ Doanh Thu",
    to: "/dashboard",
    icon: <EqualizerOutlinedIcon style={{ marginRight: "16px" }} />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "DT Vận Chuyển Toàn Công Ty",
    to: "/tables/inventory_trans_company",
    icon: <HomeWorkOutlinedIcon style={{ marginRight: "16px" }} />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Khai Báo Nhật Trình Vận Tải",
    to: "/declare_road",
    icon: <AssignmentOutlinedIcon style={{ marginRight: "16px" }} />,
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Bảng",
    route: "/tables",
    icon: <TableChartOutlinedIcon style={{ marginRight: "16px" }} />,
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Sổ Tiền Gửi Ngân Hàng",
        to: "/tables/deposit",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Báo Cáo Hàng Tồn Kho",
        to: "/tables/inventory",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Sổ Quỹ Tiền Mặt",
        to: "/tables/cashfund",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Công Nợ Phải Thu Khách Hàng",
        to: "/tables/debt-fact",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Công Nợ Phải Trả Khách Hàng",
        to: "/tables/payClient-fact",
      },
    ],
  },
];

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Biểu Đồ Doanh Thu",
    to: "/dashboard",
    icon: <EqualizerOutlinedIcon style={{ marginRight: "16px" }} />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "DT Vận Chuyển Toàn Công Ty",
    to: "/tables/inventory_trans_company",
    icon: <HomeWorkOutlinedIcon style={{ marginRight: "16px" }} />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Nhập Số Liệu Nhật Trình",
    to: "/tables/input_road",
    icon: <BookOutlinedIcon style={{ marginRight: "16px" }} />,
  },

  {
    _tag: "CSidebarNavDropdown",
    name: "Bảng",
    route: "/tables",
    icon: <TableChartOutlinedIcon style={{ marginRight: "16px" }} />,
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Sổ Tiền Gửi Ngân Hàng",
        to: "/tables/deposit",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Báo Cáo Hàng Tồn Kho",
        to: "/tables/inventory",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Sổ Quỹ Tiền Mặt",
        to: "/tables/cashfund",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Công Nợ Phải Thu Khách Hàng",
        to: "/tables/debt-fact",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Công Nợ Phải Trả Khách Hàng",
        to: "/tables/payClient-fact",
      },
    ],
  },
];

export { _nav, _navForGeneralAccount };
