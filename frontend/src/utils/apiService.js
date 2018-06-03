const post = (url, data, cb) => {
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers:{
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(response => cb(response));
}

const get = (url, cb) => {
  fetch(url)
  .then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(response => { cb(response); console.log(response) });
}

export default {
  post: post,
  get: get,
}