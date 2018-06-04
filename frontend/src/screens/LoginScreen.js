import React from 'react'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'

import HeaderBar from './../components/HeaderBar'
import LoginForm from './../components/LoginForm'
import request from './../utils/apiService.js'

const LoginScreen = (props) => {

  const headerRight = () => {
    return (
      <Link to="/register">
        <Button color="inherit">Register</Button>
      </Link>
    )
  }

  const goToHome = () => {
    console.log("redirecting to home")
    props.history.push('/home')
  }

  (() => {
    request.get('/api/v1/authstatus', (response) => {
      if (response.status) { goToHome() }
    })
  })()

  return (
    <div className="App">
      <HeaderBar title="Login to your account" right={headerRight()} />
      <LoginForm onAuthentication={goToHome}/>
    </div>

  )
}

export default LoginScreen