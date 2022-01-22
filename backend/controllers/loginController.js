const callQuery = require('../codeSQL/query/indexQuery.js');

const verify_login = async (req, res, next) => {
  try {
    const { user, pass } = req.body;

    if (
      new Array(pass, user).findIndex((item) => typeof item === 'undefined') !==
      -1
    ) {
      res.send({
        data: {
          error: 'chưa mật khẩu hoặc sai tài khoản',
        },
      });
      return;
    }

    const response = await callQuery.verify_login(user, pass);

    res.send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  verify_login,
};
