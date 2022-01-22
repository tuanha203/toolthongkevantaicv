const sql = require('mssql');
const jwt = require('jsonwebtoken');
const instantPool = require('../../controllers/pool');
const configLib = require('config');
const config = configLib.get('configServer');

const verify_login = async (user, pass) => {
  try {
    console.log(user, pass)
    const keyDBAddress = configLib.get('keyDBAddress');
    if (!keyDBAddress[user]) return { data: { error: 'sai tài khoản' } };
    let dbAddress = configLib.get('dbAddress')[keyDBAddress[user]];

    const sqlEncrypt = process.env.SQL_ENCRYPT === 'true';

    dbAddress = {
      ...dbAddress,
      options: {
        encrypt: sqlEncrypt,
        enableArithAbort: true,
      },
    };


    const pool = await instantPool.getPool(dbAddress.database, dbAddress);
    let maXe = await pool
      .request()
      .input('pass', sql.VarChar(30), pass)
      .query(
        'select BSXE, TenXe, pass from dsxeVt where nhom=2 and pass=@pass'
      );

    if (!maXe.recordsets[0][0])
      return {
        data: {
          error: 'Sai mật khẩu',
        },
      };

    const token = jwt.sign(
      {
        keyDBAddress: keyDBAddress[user],
      },
      process.env.SECRET_KEY
    );

    return {
      data: {
        accessToken: token,
        maXe: maXe.recordsets[0][0],
      },
    };
  } catch (error) {
    return {
      data: {
        error: error,
      },
    };
  }
};

const get_listCar = async ({ addressDB }) => {
  try {
    const pool = await instantPool.getPool(addressDB.database, addressDB);
    let data = await pool
      .request()
      .input('general', sql.VarChar(10), 'general')
      .query('Select BSXE,TenXe from DSXeVT where TenXe <> @general');

    if (!data.recordsets[0][0])
      return {
        data: {
          error: 'Lỗi query',
        },
      };

    let filterData = data.recordsets[0].map((item) => item.TenXe);

    return {
      data: filterData,
    };
  } catch (error) {
    console.log(error.message);
  }
};

const getAll_listInput_declareRoad = async ({ addressDB }) => {
  try {
    const pool = await instantPool.getPool(addressDB.database, addressDB);
    let dataXe = await pool
      .request()
      .input('general', sql.VarChar(10), 'general')
      .query(
        'select BSXE as code, TenXe as name from DSXeVT  where TenXe <> @general '
      );

    let dataTuyenDuong = await pool
      .request()
      .query(
        'select MaTuyenVC as code, TuyenDuong as name from View_CungDuong'
      );

    let dataHang = await pool
      .request()
      .query('select MaVT_pk as code, TenVT as name from viewDanhMucVT');

    let dataKhachHang = await pool
      .request()
      .query('select MaKH_pk as code, TenDonVi as name from ViewDSKH ');

    if (!dataXe.recordsets[0][0])
      return {
        data: {
          error: 'Lỗi query',
        },
      };

    return {
      data: {
        listCar: dataXe.recordsets[0],
        listRoad: dataTuyenDuong.recordsets[0],
        listGoods: dataHang.recordsets[0],
        listCustomer: dataKhachHang.recordsets[0],
      },
    };
  } catch (error) {
    console.log(error.message);
  }
};

const updateKS = async ({ id, addressDB }) => {
  try {
    const pool = await instantPool.getPool(addressDB.database, addressDB);

    let result = await pool
      .request()
      .input('id', sql.VarChar(), id)
      .query(`update BangKeBT set KS='True' where ID=@id`);

    return {
      data: {
        success: 'update thành công',
      },
    };
  } catch (error) {
    console.log(error.message);
  }
};

const get_dsNganHang = async ({ addressDB }) => {
  try {
    const pool = await instantPool.getPool(addressDB.database, addressDB);

    let result = await pool
      .request()
      .query(
        `SELECT MATK_PK AS MATK,TenTK AS TENTK FROM HTTK WHERE LEFT(MATK_PK,3)='112' AND Logic='2'`
      );

    return {
      data: result.recordsets[0],
    };
  } catch (error) {
    console.log(error.message);
  }
};

const callProc_Thue_rpt_BaoCaoTongHop_BanHang_DANHSACH = async ({
  addressDB,
}) => {
  try {
    const pool = await instantPool.getPool(addressDB.database, addressDB);

    let result_DSKHO = await pool
      .request()
      .query('select MaKho_pk as maKho, TenKho from dskho');

    let result_DSNHOM = await pool
      .request()
      .query('select MaNhom_pk as maNhom, TenNhom from dsnhom ');
    return {
      data: {
        danhSachKho: result_DSKHO.recordsets[0],
        danhSachNhom: result_DSNHOM.recordsets[0],
      },
    };
  } catch (error) {
    console.log(error.message);
  }
};

const get_dsDonVi = async ({ addressDB }) => {
  try {
    const pool = await instantPool.getPool(addressDB.database, addressDB);

    let result = await pool.request().query(`SELECT MaDV, TenDV from DM_DonVi`);
    return {
      data: result.recordsets[0],
    };
  } catch (error) {
    console.log(error.message);
  }
};

const getdstaikhoan = async ({ addressDB }) => {
  try {
    const pool = await instantPool.getPool(addressDB.database, addressDB);

    let result = await pool
      .request()
      .query(`select * from vHTTK where left(MaTK_pk,3)='111'`);
    return {
      data: result.recordsets[0],
    };
  } catch (error) {
    console.log(error.message);
  }
};

const get_ngayks = async ({ addressDB }) => {
  try {
    const pool = await instantPool.getPool(addressDB.database, addressDB);

    let result = await pool.request().query(`select KSVC from ngayks`);
    return {
      data: result.recordsets[0],
    };
  } catch (error) {
    console.log(error.message);
  }
};

const updateKhoaSo = async ({ dateSelect, addressDB }) => {
  try {
    const pool = await instantPool.getPool(addressDB.database, addressDB);

    let result = await pool
      .request()
      .input('date', sql.DateTime, dateSelect)
      .query(`Update NgayKS set KSVC=@date`);
    return {
      data: {
        status: 'success',
      },
    };
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  verify_login,
  updateKS,
  get_listCar,
  getAll_listInput_declareRoad,
  get_dsNganHang,
  callProc_Thue_rpt_BaoCaoTongHop_BanHang_DANHSACH,
  get_dsDonVi,
  getdstaikhoan,
  get_ngayks,
  updateKhoaSo,
};
