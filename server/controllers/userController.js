const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const generateToken = require('../helpers/jwt')

class UserController {
  static register(req, res) {
    const { email, password } = req.body
    const newUser = { email, password }
    User.create(newUser)
      .then(user => {
        res.status(201).json(user)
      })
      .catch(err => {
        res.status(400).json(err.message)
      })
  }

  static login(req, res) {
    const { email, password } = req.body
    const newUser = { email, password }
    User.findOne({
      where: {
        email: newUser.email
      }
    })
    .then(user => {
      if(!user) {
        throw { message: 'Invalid Email/Password' }
      }
      const comparedPassword = comparePassword(password, user.password)
      if (!comparedPassword) {
        throw { message: 'Invalid Email/Password' }
      }
      const access_token = generateToken({
        id: user.id,
        email: user.email
      })
      res.status(200).json({ access_token })
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({
        message : 'Invalid Email/Password'
      })
    })
  }
}

module.exports = UserController;