import React from 'react'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'

import HeaderBar from './../components/HeaderBar'
import RegisterForm from './../components/RegisterForm'
import request from './../utils/apiService.js'

const RegisterScreen = (props) => {

  const headerRight = () => {
    return (
      <Link to="/login">
        <Button color="inherit">Login</Button>
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
      <HeaderBar title="Register" right={headerRight()} />
      <RegisterForm onAuthentication={goToHome} />
    </div>
  )
}

export default RegisterScreen