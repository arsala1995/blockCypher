const Pool = require('pg').Pool
const pool = new Pool({
  user: 'sher',
  host: 'localhost',
  database: 'api',
  password: 'sher',
  port: 5432,
})

// to get all the results from database
const getResults = (request, response) => {
  pool.query('SELECT * FROM results ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

//it will create new results into database
const createResults = (dataFetched, response) => {
  let max = -999999;
  let dataForMax=[];
  for(let data of dataFetched) {
    if(data.size > max) {
      max = data.size;
    }
  }
  for(let data of dataFetched) {
    if(data.size === max) {
      dataForMax.push(data)
    }
  }


  pool.query('INSERT INTO results(hash, total, fees, outpult_value, address, script_type, value, output_address, output_script_type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', [dataForMax[0].hash,dataForMax[0].total,dataForMax[0].fees,dataForMax[0].inputs[0].output_value,dataForMax[0].inputs[0].addresses,dataForMax[0].inputs[0].script_type,dataForMax[0].outputs[0].value,dataForMax[0].outputs[0].addresses,dataForMax[0].outputs[0].script_type], (error, results) => {
    if (error) {
      throw error
    }
    
  })
}




module.exports = {
  getResults,
  createResults,
}