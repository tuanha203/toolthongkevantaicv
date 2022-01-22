const config = require('../../config');
const instantPool = require('../../controllers/pool');
const sql = require('mssql');

const callProc_XuatBT_GetVC = async ({
  maXe,
  startDate,
  endDate,
  loai,
  TuyenDuong,
  TenXe,
  addressDB,
}) => {
  try {
    const pool = await instantPool.getPool(addressDB.database, addressDB);

    console.log('connect thanh cong');
    let result = await pool
      .request()
      .input('Ma_Xe', sql.VarChar(30), maXe)
      .input('TuNgay', sql.DateTime, startDate)
      .input('DenNgay', sql.DateTime, endDate)
      .input('TuyenDuong', sql.NVarChar(30), TuyenDuong)
      .input('TenXe', sql.VarChar(30), TenXe)
      .input('Loai', sql.Int, parseInt(loai))
      .execute(`XuatBT_GetVC`);

    return { data: result.recordsets[0] };
  } catch (error) {
    console.log(error.message);
  }
};

const callProc_XuatBT_Up_DienThoai = async ({
  slDau,
  slCuoi,
  soTienV,
  ghiChu,
  chiPhi,
  tamUng,
  id,
  tienDau,
  dateSelect,
  addressDB,
}) => {
  try {
    const pool = await instantPool.getPool(addressDB.database, addressDB);

    console.log('connect thanh cong');
    let result = await pool
      .request()
      .input('SLDau', sql.Numeric(18, 2), parseInt(slDau))
      .input('SLCuoi', sql.Numeric(18, 2), parseInt(slCuoi))
      .input('sotienv', sql.Numeric(18, 2), parseInt(soTienV))
      .input('GhiChu', sql.NVarChar(30), ghiChu)
      .input('ChiPhi', sql.Numeric(18, 2), parseInt(chiPhi))
      .input('tamung', sql.Numeric(18, 2), parseInt(tamUng))
      .input('ID', sql.Int, parseInt(id))
      .input('TienDau', sql.Int, parseInt(tienDau))
      .input('NgayTra', sql.DateTime, dateSelect)
      .execute(`XuatBT_Up_DienThoai`);

    return { data: result.recordsets[0][0] };
  } catch (error) {
    console.log(error.message);
  }
};

const callProc_XuatBT_TongHopDT_CongTy = async ({
  startDate,
  endDate,
  addressDB,
}) => {
  try {
    const pool = await instantPool.getPool(addressDB.database, addressDB);

    console.log('connect thanh cong');
    let result = await pool
      .request()
      .input('TuNgay', sql.DateTime, startDate)
      .input('DenNgay', sql.DateTime, endDate)
      .execute(`XuatBT_TongHopDT_CongTy`);

    return { data: result.recordsets[0] };
  } catch (error) {
    console.log(error.message);
  }
};

const callProc_save_records_declare_road = async ({ records, addressDB }) => {
  try {
    const pool = await instantPool.getPool(addressDB.database, addressDB);

    console.log('connect thanh cong');

    console.log('====================================');
    console.log(records);
    console.log('====================================');

    for (let index = 0; index < records.length; index++) {
      let { dateSelect, customer, road, goods, note, carrier, rates, car } =
        records[index];

      console.log({
        dateSelect,
        customer,
        road,
        goods,
        note,
        carrier,
        rates,
        car,
      });
      await pool
        .request()
        .input('MaCT_pk', sql.VarChar(20), '')
        .input('shct', sql.VarChar(20), '')
        .input('ctngay', sql.DateTime, new Date(dateSelect))
        .input('Mavt', sql.VarChar(30), goods)
        .input('MaKH', sql.VarChar(50), customer)
        .input('MaXe', sql.VarChar(50), car)
        .input('soluong', sql.Numeric(18, 2), 0)
        .input('dongiav', sql.Numeric(18, 2), Number(rates))
        .input('sotienv', sql.Numeric(18, 2), 0)
        .input('TKNo', sql.VarChar(5), '1311')
        .input('MaNV', sql.VarChar(30), 'th')
        .input('SLdau', sql.Numeric(18, 2), 0)
        .input('GhiChu', sql.NVarChar(50), note)
        .input('ST141', sql.Numeric(18, 0), 0)
        .input('LoaiViec', sql.VarChar(5), '0')
        .input('CungDuong', sql.VarChar(30), road)
        .input('CtCo', sql.VarChar(30), carrier)
        .input('MaDV', sql.VarChar(10), 'VTTT')
        .input('ChiPhi', sql.Numeric(18, 0), 0)
        .input('GiaCuoc', sql.Numeric(18, 0), 0)
        .input('MaKho', sql.VarChar(30), 'VCHH')
        .input('TienDau', sql.Numeric(18, 0), 0)
        .input('GiaBX', sql.Numeric(18, 0), 0)
        .input('Luat', sql.Numeric(18, 0), 0)
        .input('Lop', sql.Numeric(18, 0), 0)
        .input('NC', sql.Numeric(18, 0), 0)
        .input('SC', sql.Numeric(18, 0), 0)
        .input('Khac', sql.Numeric(18, 0), 0)
        .input('MuaHang', sql.Numeric(18, 0), 0)
        .input('MaPhi', sql.VarChar(5), '')
        .execute(`XuatBT_add`);
    }

    return { data: { status: 'success' } };
    console.log("haha")
  } catch (error) {
    console.log(error)
    return { data: { status: 'fail', error: error } };
  }
};

const callProc_EMLO_So_TienGui = async ({
  startDate,
  endDate,
  matk,
  addressDB,
}) => {
  try {
    const pool = await instantPool.getPool(addressDB.database, addressDB);
    let result = await pool
      .request()
      .input('Tu_Ngay', sql.DateTime, startDate)
      .input('Den_Ngay', sql.DateTime, endDate)
      .input('matk', sql.VarChar(30), matk)
      .execute(`EMLO_So_TienGui`);

    return {
      data: result.recordsets[0],
    };
  } catch (error) {
    console.log(error.message);
  }
};

const callProc_EMLO_TONGHOP_131_331 = async ({
  startDate,
  endDate,
  MaTK,
  TimKiem,
  addressDB,
}) => {
  try {
    const pool = await instantPool.getPool(addressDB.database, addressDB);
    let result = await pool
      .request()
      .input('TuNgay', sql.DateTime, startDate)
      .input('DenNgay', sql.DateTime, endDate)
      .input('TimKiem', sql.NVarChar(30), TimKiem)
      .input('MaTK', sql.VarChar(30), MaTK)

      .execute(`EMLO_TONGHOP_131_331`);

    return {
      data: result.recordsets[0],
    };
  } catch (error) {
    console.log(error.message);
  }
};

const callProc_EMLO_ChiTiet_CongNo_131_331 = async ({
  startDate,
  endDate,
  MaTK,
  MaCT,
  addressDB,
}) => {
  try {
    const pool = await instantPool.getPool(addressDB.database, addressDB);
    let result = await pool
      .request()
      .input('Tu_Ngay', sql.DateTime, startDate)
      .input('Den_Ngay', sql.DateTime, endDate)
      .input('MaTK', sql.VarChar(5), MaTK)
      .input('MaCT', sql.VarChar(5), MaCT)
      .execute(`EMLO_ChiTiet_CongNo_131_331`);

    return {
      data: result.recordsets[0],
    };
  } catch (error) {
    console.log(error.message);
  }
};

const callProc_EMLO_TONGHOP_NXT = async ({
  startDate,
  endDate,
  maKho,
  maNhom,
  tenHang,
  addressDB,
}) => {
  try {
    const pool = await instantPool.getPool(addressDB.database, addressDB);
    let result = await pool
      .request()
      .input('tuNgay', sql.DateTime, startDate)
      .input('denNgay', sql.DateTime, endDate)
      .input('maKho', sql.VarChar(30), maKho)
      .input('maNhom', sql.VarChar(30), maNhom)
      .input('tenHang', sql.NVarChar(30), tenHang)
      .execute(`EMLO_TONGHOP_NXT`);

    return {
      data: result.recordsets[0],
    };
  } catch (error) {
    console.log(error.message);
  }
};

const callProc_EMLO_Soquy_TM = async ({
  startDate,
  endDate,
  matk,
  addressDB,
}) => {
  try {
    const pool = await instantPool.getPool(addressDB.database, addressDB);
    let result = await pool
      .request()
      .input('Tu_Ngay', sql.DateTime, startDate)
      .input('Den_Ngay', sql.DateTime, endDate)
      .input('matk', sql.VarChar(30), matk)
      .execute(`EMLO_Soquy_TM`);

    return {
      data: result.recordsets[0],
    };
  } catch (error) {
    console.log(error.message);
  }
};

const callProc_themVaoListKhaiBaoNhatTrinh = async ({
  data,
  nameList,
  addressDB,
}) => {
  try {
    const pool = await instantPool.getPool(addressDB.database, addressDB);

    if (nameList === 'customer') {
      let result = await pool
        .request()
        .input('TenDVi', sql.NVarChar(80), data)
        .execute(`DSKH_add_DienThoai`);

      return {
        data: result.recordsets[0],
      };
    } else if (nameList === 'road') {
      console.log(data);
      let result = await pool
        .request()
        .input('TenTuyen', sql.NVarChar(80), data)
        .execute(`TuyenDuong_add_DienTHoai`);

      return {
        data: result.recordsets[0],
      };
    } else {
      return {
        data: { error: 'nameList không hợp lệ' },
      };
    }
  } catch (error) {
    console.log(error.message);
    return {
      data: { error: error.message },
    };
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
  callProc_EMLO_Soquy_TM,
  callProc_themVaoListKhaiBaoNhatTrinh,
};
