import React from 'react'
import request from './../utils/apiService.js'

const LogoutScreen = (props) => {

  const goToLogin = () => {
    props.history.push('/login')
  }

  const logout = (() => {
    request.get('/api/v1/logout', (response) => {
      if (response.status) {
        goToLogin()
      }
    })
  })()

  return (
    <div className="App">
      <p>Logging out ...</p>
    </div>

  )
}

export default LogoutScreen