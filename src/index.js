const express = require('express')
const bodyParser = require("body-parser");
const authenticating = require('./controllers/auth/authentication')

const app = express()
const PORT = process.env.PORT || 8080

// const apiKey = '16e8a0391d250b1bb02b79751c286816'
// const baseUrl = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`

app.use(express.json())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Welcome')
})

app.use(authenticating)


app.listen(PORT, () => console.log(`server is running on port ${PORT}`))