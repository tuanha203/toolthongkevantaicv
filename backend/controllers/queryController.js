const callQuery = require('../codeSQL/query/indexQuery.js');

const updateKS = async (req, res, next) => {
  const { id } = req.body;
  try {
    const response = await callQuery.updateKS({ id, addressDB: req.addressDB });

    res.send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const get_listCar = async (req, res, next) => {
  try {
    const response = await callQuery.get_listCar({ addressDB: req.addressDB });

    res.send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAll_listInput_declareRoad = async (req, res, next) => {
  try {
    const response = await callQuery.getAll_listInput_declareRoad({
      addressDB: req.addressDB,
    });

    res.send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const get_dsNganHang = async (req, res, next) => {
  try {
    const response = await callQuery.get_dsNganHang({
      addressDB: req.addressDB,
    });

    res.send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const get_dsDonVi = async (req, res, next) => {
  try {
    const response = await callQuery.get_dsDonVi({ addressDB: req.addressDB });

    res.send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getdstaikhoan = async (req, res, next) => {
  try {
    const response = await callQuery.getdstaikhoan({
      addressDB: req.addressDB,
    });

    res.send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const get_ngayks = async (req, res, next) => {
  try {
    const response = await callQuery.get_ngayks({ addressDB: req.addressDB });

    res.send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateKhoaSo = async (req, res, next) => {
  try {
    const { dateSelect } = req.body;
    if (dateSelect) {
      const response = await callQuery.updateKhoaSo({
        dateSelect,
        addressDB: req.addressDB,
      });
      res.send(response);
    } else {
      res.send({ data: { error: 'tham số phải là kiểu date' } });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  updateKS,
  get_listCar,
  getAll_listInput_declareRoad,
  get_dsNganHang,
  get_dsDonVi,
  getdstaikhoan,
  get_ngayks,
  updateKhoaSo,
}; 
