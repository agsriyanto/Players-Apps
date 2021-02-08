const jwt = require('jsonwebtoken')
const { Player } = require('../models')

const authenticate = function (req, res,next) {
  try {
    const access_token = req.headers.access_token
    const currentUser = jwt.verify(access_token, process.env.SECRET)
    req.currentUser = currentUser
    next()
  } catch {
    res.status(400).json({
      message: 'invalid key'
    })
  }
}

const authorize = function (req, res, next) {
  const userId = req.currentUser.id
  const playerId = req.params.id

  Player.findByPk(playerId)
  .then(player => {
    if (player.UserId !== userId) {
      throw { message: 'Access Unauthorized' }
    } else {
      next()
    }
  })
  .catch(err => {
    res.status(401).json(err)
  })
}

module.exports = {
  authenticate,
  authorize
}