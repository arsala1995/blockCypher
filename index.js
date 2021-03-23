const db = require('./queries')
const axios = require('axios');
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch');
const helmet = require('helmet');

const app = express()
const port = 3000

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use(helmet());

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

const getMachineAction = async () => {

//function that will run and fetch data from the blockcypher and perform checks on them
const data = fetch('https://api.blockcypher.com/v1/btc/main/txs')
  .then(response => response.json())
  .then(data => {
    app.post('/results/new', db.createResults(data))
  })
  .catch(err => console.log('error'))
  
}

setInterval(getMachineAction, 300000); 

app.get('/results', db.getResults)
app.post('/results/new', db.createResults)


app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})