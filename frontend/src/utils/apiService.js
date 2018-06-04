const post = (url, data, cb) => {
  fetch(url, {
    method: 'POST',
    credentials: 'include',
    mode: 'same-origin',
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
  fetch(url, {
    method: 'GET',
    credentials: 'include',
    mode: 'same-origin',
  })
  .then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(response => { cb(response); });
}

export default {
  post: post,
  get: get,
}