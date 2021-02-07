const express = require('express')
const app = express()
const PORT = 3000;
const cors = require('cors')
const router = require('./routes/index')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(router)

app.listen(PORT, () => {
  console.log(`Server running on PORT : ${PORT}`);
})