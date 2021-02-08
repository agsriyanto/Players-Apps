const { Player } = require('../models')

class PlayerController {
  static showPlayer(req, res) {
    const id = req.currentUser.id
    Player.findAll({
      where: {
        UserId: id
      }
    })
    .then(players => {
      res.status(200).json(players)
    })
    .catch(err => {
      res.json(err)
    })
  }

  static addPlayer(req, res) {
    const { name, position } = req.body
    const { id } = req.currentUser
    const newPlayer = { name, position, UserId: id }
    Player.findAll()
    .then(players => {
      const isExisted = players.find(el => el.name === name)
      if (players.length >= 7) {
        throw { message: 'team is full' }
      } else if (isExisted) {
        throw { message: 'players already existed' }
      } else {
        const count = players.filter(player => player.position === position)
        let maxPlayer = 0
        switch (position) {
          case 'Chaser':
            maxPlayer = 3
            break;
          case 'Beater':
            maxPlayer = 2
            break;
          default:
            maxPlayer = 1
            break;
        }
        if (count.length < maxPlayer) {
          return Player.create(newPlayer)
        } else {
          throw { message: `${position} is full` }
        }
      }
    })
    .then(player => {
      res.status(200).json(player)
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }

  static delete(req, res) {
    const playerId = req.params.id
    Player.destroy({
      where: {
        id: playerId
      }
    })
    .then(player => {
      res.status(200).json({ "message": "Successfully delete player from your team" })
    })
    .catch(err => {
      res.status(404).json({
        message: 'Player not found!'
      })
    })
  }
}

module.exports = PlayerController;