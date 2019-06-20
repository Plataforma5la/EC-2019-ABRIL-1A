const S = require('sequelize');
const db = require('../db');
const crypto = require("crypto")

const User = db.define('users', {
  name: { 
    type: S.STRING,
    allowNull: false
  },
  lastname : {
      type: S.STRING,
      allowNull: false
  },
  email: {
    type:S.STRING,
    isEmail:true,
    allowNull: false
  },
  password:{
    type:S.STRING,
    allowNull:false
  },
  admin : {
      type : S.BOOLEAN
  }
})
User.beforeCreate((user) => {
  user.salt=crypto.randomBytes(20).toString('hex')
  user.password=crypto.createHmac('sha1', user.salt).update(user.password).digest('hex')
});
User.saltGenerator = function () {
return crypto.randomBytes(20).toString('hex')
}


User.prototype.hashFunction = function (password) {
 return crypto.createHmac('sha1', this.salt).update(password).digest('hex')
}

User.prototype.autenticate = function (password) {
 return this.hashFunction(password) === this.password
}

module.exports = User
