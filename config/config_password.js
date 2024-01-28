const bcrypt = require("bcrypt");
function ConfigPassword (password, userPassword) {
  this.match = () => {
    const match = bcrypt.compare(password, userPassword);
    return match;
  };
};

module.exports = ConfigPassword;
