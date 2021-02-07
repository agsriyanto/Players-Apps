const bcrypt = require('bcryptjs')

function hassPassword(password) {
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(password, salt)
}

function comparePassword(password, hassedPassword) {
  return bcrypt.compareSync(password, hassedPassword)
}

module.exports = {
  hassPassword,
  comparePassword
}