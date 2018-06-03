const { Client } = require('pg');

var client

const connectDatabase = (cb) => {

  client = new Client({
    connectionString: process.env.DATABASE_URL || 'postgresql://localhost:5432/gamico',
    ssl: true,
  })

  client.connect( (err) => { 
    if(!err) 
      console.log("Database connected")
    else
      console.log("Error connecting to database")
  })
}

const getDatabaseConnection = () => {
  if(!client) { connectDatabase() }
  return client
}

module.exports = getDatabaseConnection
