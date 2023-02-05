const bcrypt = require("bcrypt");

module.exports = {
  comparePassword: (password, userPassword) => {
    return new Promise(function (resolve, reject) {
      bcrypt.compare(password, userPassword, function (err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  },
};
