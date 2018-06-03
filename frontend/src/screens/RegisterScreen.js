import React from 'react'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'

import HeaderBar from './../components/HeaderBar'
import RegisterForm from './../components/RegisterForm'

const RegisterScreen = (props) => {

  const headerRight = () => {
    return (
      <Link to="/login">
        <Button color="inherit">Login</Button>
      </Link>
    )
  }

  const goToHome = () => {
    props.history.push('/home')
  }

  return (
    <div className="App">
      <HeaderBar title="Register" right={headerRight()} />
      <RegisterForm onAuthentication={goToHome} />
    </div>
  )
}

export default RegisterScreen