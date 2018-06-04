const db = require('../db/database')()

const createUser = (user, cb) => {
  const query = {
    text: 'INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING *',
    values: [user.username, user.email, user.password],
  }

  executeQuery(query, cb)
}

const findUser = (user, cb) => {

  var params = [user.email]
  var subquery = 'email=$1'

  if ('username' in user) {
    subquery += ' OR username=$2'
    params.push(user.username)
  }

  const query = {
    text: 'SELECT * from users WHERE ' + subquery,
    values: params,
  }
  
  executeQuery(query, cb)
}

const createTable = () => {
  const query = {
    text: "CREATE TABLE users ( ID SERIAL PRIMARY KEY, username VARCHAR, email VARCHAR, password VARCHAR )",
  }
  
  db.query(query).then(res => console.log("Table users created") )
}

const executeQuery = (query, cb) => {
  db.query(query)
    .then(res => cb(res.rows[0]))
    .catch(e => { 
      if (e.code == '42P01') { 
        createTable() 
      } else {
        console.log(e.stack())
      }
    })
}


module.exports = {
  create: createUser,
  find: findUser
}