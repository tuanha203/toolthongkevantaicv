'use strict';

const express = require('express');
const procController = require('../controllers/procController');
const queryController = require('../controllers/queryController');
const loginController = require('../controllers/loginController');
const jwt = require('jsonwebtoken');
const router = express.Router();
const configLib = require('config');

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.SECRET_KEY, (err, dataBody) => {
      if (err) {
        return res.send({
          data: {
            error: 'Token không có hiệu lực, vui lòng đăng nhập lại',
          },
        });
      }

      const sqlEncrypt = process.env.SQL_ENCRYPT === 'true';
      const dbAddress = configLib.get('dbAddress');

      req.addressDB = {
        ...dbAddress[dataBody.keyDBAddress],
        options: {
          encrypt: sqlEncrypt,
          enableArithAbort: true,
        },
      };
      next();
    });
  } else {
    res.send({
      data: {
        error: 'lỗi authorized',
      },
    });
  }
};

router.post('/verifylogin', loginController.verify_login);
router.post(
  '/callProc_XuatBT_GetVC',
  authenticateJWT,
  procController.callProc_XuatBT_GetVC
);
router.post(
  '/updateNhatTrinh',
  authenticateJWT,
  procController.callProc_XuatBT_Up_DienThoai
);
router.post('/updateks', authenticateJWT, queryController.updateKS);
router.post(
  '/updatekskhaibaonhattrinh',
  authenticateJWT,
  queryController.updateKhoaSo
);
router.post(
  '/XuatBT_TongHopDT_CongTy',
  authenticateJWT,
  procController.callProc_XuatBT_TongHopDT_CongTy
);
router.post(
  '/save_records_declare_road',
  authenticateJWT,
  procController.callProc_save_records_declare_road
);
router.get('/get_listCar', authenticateJWT, queryController.get_listCar);
router.get(
  '/getAll_listInput_declareRoad',
  authenticateJWT,
  queryController.getAll_listInput_declareRoad
);

router.get('/ngayks', authenticateJWT, queryController.get_ngayks);

// -------------------------------------------

router.post(
  '/events/getdsnganhang',
  authenticateJWT,
  queryController.get_dsNganHang
);

router.post(
  '/events/EMLO_So_TienGui',
  authenticateJWT,
  procController.callProc_EMLO_So_TienGui
);

router.post(
  '/events/EMLO_TONGHOP_131_331',
  authenticateJWT,
  procController.callProc_EMLO_TONGHOP_131_331
);

router.post(
  '/events/EMLO_ChiTiet_CongNo_131_331',
  authenticateJWT,
  procController.callProc_EMLO_ChiTiet_CongNo_131_331
);

router.post(
  '/events/thue_rpt_baocaotonghop_banhang',
  authenticateJWT,
  procController.callProc_Thue_rpt_BaoCaoTongHop_BanHang
);

router.post(
  '/events/EMLO_TONGHOP_NXT',
  authenticateJWT,
  procController.callProc_EMLO_TONGHOP_NXT
);

router.post(
  '/events/EMLO_Soquy_TM',
  authenticateJWT,
  procController.callProc_EMLO_Soquy_TM
);

router.post('/events/getdsdonvi', authenticateJWT, queryController.get_dsDonVi);

router.post(
  '/events/getdstaikhoan',
  authenticateJWT,
  queryController.getdstaikhoan
);

router.post(
  '/themVaoListKhaiBaoNhatTrinh',
  authenticateJWT,
  procController.callProc_themVaoListKhaiBaoNhatTrinh
);

module.exports = {
  routes: router,
};
