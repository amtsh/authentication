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

const executeQuery = (query, cb) => {
  db.query(query)
    .then(res => cb(res.rows[0]))
    .catch(e => console.error(e.stack))
}

module.exports = {
  create: createUser,
  find: findUser
}