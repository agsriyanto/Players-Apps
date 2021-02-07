const { Student } = require("../models")

class StudentController {
  static find(req, res, next){
    Student.findAll()
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json({
        message : "Internal Server Error"
      })
    })
  }
}

module.exports = StudentController