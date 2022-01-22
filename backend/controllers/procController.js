const callProcs = require('../codeSQL/procs/indexProcSQL.js');
const callQuery = require('../codeSQL/query/indexQuery.js');

const callProc_XuatBT_GetVC = async (req, res, next) => {
  try {
    const { maXe, startDate, endDate, loai, TuyenDuong, TenXe } = req.body;

    if (
      new Array(maXe, startDate, endDate, loai).findIndex(
        (item) => typeof item === 'undefined'
      ) !== -1
    ) {
      res.send({
        error: 'Không truyền đủ tham số',
      });
      return;
    }

    const response = await callProcs.callProc_XuatBT_GetVC({
      maXe,
      startDate,
      endDate,
      loai,
      TuyenDuong,
      TenXe,
      addressDB: req.addressDB,
    });
    res.send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const callProc_XuatBT_Up_DienThoai = async (req, res, next) => {
  try {
    const {
      slDau,
      slCuoi,
      soTienV,
      ghiChu,
      chiPhi,
      tamUng,
      id,
      tienDau,
      dateSelect,
    } = req.body;

    if (
      new Array(
        slDau,
        slCuoi,
        soTienV,
        ghiChu,
        chiPhi,
        tamUng,
        tienDau,
        dateSelect,
        id,
        req.addressDB
      ).findIndex((item) => typeof item === 'undefined') !== -1
    ) {
      res.send({
        data: {
          error: 'Không truyền đủ tham số',
        },
      });
      return;
    }

    const response = await callProcs.callProc_XuatBT_Up_DienThoai({
      slDau,
      slCuoi,
      soTienV,
      ghiChu,
      chiPhi,
      tamUng,
      id,
      tienDau,
      dateSelect,
      addressDB: req.addressDB,
    });
    res.send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const callProc_XuatBT_TongHopDT_CongTy = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.body;

    if (
      new Array(startDate, endDate).findIndex(
        (item) => typeof item === 'undefined'
      ) !== -1
    ) {
      res.send({
        data: {
          error: 'Không truyền đủ tham số',
        },
      });
      return;
    }

    const response = await callProcs.callProc_XuatBT_TongHopDT_CongTy({
      startDate,
      endDate,
      addressDB: req.addressDB,
    });
    res.send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const callProc_save_records_declare_road = async (req, res, next) => {
  try {
    const { records } = req.body;

    if (
      new Array(records).findIndex((item) => typeof item === 'undefined') !== -1
    ) {
      res.send({
        data: {
          status: 'fail',
          error: 'Không truyền đủ tham số',
        },
      });
      return;
    }

    const response = await callProcs.callProc_save_records_declare_road({
      records,
      addressDB: req.addressDB,
    });
    res.send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const callProc_EMLO_So_TienGui = async (req, res, next) => {
  try {
    const { startDate, endDate, matk } = req.body;
    console.log(startDate, endDate, matk);
    if (
      new Array(startDate, endDate, matk).findIndex(
        (item) => typeof item === 'undefined'
      ) !== -1
    ) {
      res.send({
        error: 'Không truyền đủ tham số',
      });
      return;
    }
    const response = await callProcs.callProc_EMLO_So_TienGui({
      startDate,
      endDate,
      matk,
      addressDB: req.addressDB,
    });

    res.send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const callProc_EMLO_TONGHOP_131_331 = async (req, res, next) => {
  try {
    const { startDate, endDate, MaTK, TimKiem } = req.body;

    if (
      new Array(startDate, endDate, MaTK).findIndex(
        (item) => typeof item === 'undefined'
      ) !== -1
    ) {
      res.send({
        error: 'Không truyền đủ tham số',
      });
      return;
    }
    const response = await callProcs.callProc_EMLO_TONGHOP_131_331({
      startDate,
      endDate,
      MaTK,
      TimKiem,
      addressDB: req.addressDB,
    });

    res.send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const callProc_EMLO_ChiTiet_CongNo_131_331 = async (req, res, next) => {
  try {
    const { startDate, endDate, MaTK, MaCT } = req.body;
    if (
      new Array(startDate, endDate, MaCT, MaTK).findIndex(
        (item) => typeof item === 'undefined'
      ) !== -1
    ) {
      res.send({
        error: 'Không truyền đủ tham số',
      });
      return;
    }
    const response = await callProcs.callProc_EMLO_ChiTiet_CongNo_131_331({
      startDate,
      endDate,
      MaTK,
      MaCT,
      addressDB: req.addressDB,
    });

    res.send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const callProc_Thue_rpt_BaoCaoTongHop_BanHang = async (req, res, next) => {
  try {
    const { getList } = req.body;

    if (getList === true) {
      const response =
        await callQuery.callProc_Thue_rpt_BaoCaoTongHop_BanHang_DANHSACH({
          addressDB: req.addressDB,
        });

      res.send(response);
      return;
    }
    /*  const { startDate, endDate, maKho, maNhom, tenHang } = req.body;

    if (
      new Array(startDate, endDate, maKho, maNhom, tenHang).findIndex(
        (item) => typeof item === 'undefined'
      ) !== -1
    ) {
      res.send({
        error: 'Không truyền đủ tham số',
      });
      return;
    }
    const response = await callProcs.callProc_Thue_rpt_BaoCaoTongHop_BanHang(
      startDate,
      endDate,
      maKho,
      maNhom,
      tenHang,
      config
    );

    res.send(response); */
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const callProc_EMLO_TONGHOP_NXT = async (req, res, next) => {
  try {
    const { getList } = req.body;

    if (getList === true) {
      const response =
        await callQuery.callProc_Thue_rpt_BaoCaoTongHop_BanHang_DANHSACH({
          addressDB: req.addressDB,
        });

      res.send(response);
      return;
    }

    const { startDate, endDate, maKho, maNhom, tenHang } = req.body;

    if (
      new Array(startDate, endDate, maKho, maNhom, tenHang).findIndex(
        (item) => typeof item === 'undefined'
      ) !== -1
    ) {
      res.send({
        error: 'Không truyền đủ tham số',
      });
      return;
    }
    const response = await callProcs.callProc_EMLO_TONGHOP_NXT({
      startDate,
      endDate,
      maKho,
      maNhom,
      tenHang,
      addressDB: req.addressDB,
    });

    res.send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const callProc_EMLO_Soquy_TM = async (req, res, next) => {
  try {
    const { startDate, endDate, matk } = req.body;
    if (
      new Array(startDate, endDate, matk).findIndex(
        (item) => typeof item === 'undefined'
      ) !== -1
    ) {
      res.send({
        error: 'Không truyền đủ tham số',
      });
      return;
    }
    const response = await callProcs.callProc_EMLO_Soquy_TM({
      startDate,
      endDate,
      matk,
      addressDB: req.addressDB,
    });

    res.send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const callProc_themVaoListKhaiBaoNhatTrinh = async (req, res, next) => {
  try {
    const { data, nameList } = req.body;
    if (
      new Array(data, nameList).findIndex(
        (item) => typeof item === 'undefined'
      ) !== -1
    ) {
      res.send({
        data: {
          error: 'Không truyền đủ tham số',
        },
      });
      return;
    }
    const response = await callProcs.callProc_themVaoListKhaiBaoNhatTrinh({
      ...req.body,
      addressDB: req.addressDB,
    });

    res.send(response);
  } catch (error) {
    res.status(400).send({ data: { error: error.message } });
  }
};

module.exports = {
  callProc_XuatBT_GetVC,
  callProc_XuatBT_Up_DienThoai,
  callProc_XuatBT_TongHopDT_CongTy,
  callProc_save_records_declare_road,
  callProc_EMLO_So_TienGui,
  callProc_EMLO_TONGHOP_131_331,
  callProc_EMLO_ChiTiet_CongNo_131_331,
  callProc_EMLO_TONGHOP_NXT,
  callProc_Thue_rpt_BaoCaoTongHop_BanHang,
  callProc_EMLO_Soquy_TM,
  callProc_themVaoListKhaiBaoNhatTrinh,
};
