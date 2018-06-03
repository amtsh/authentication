import React from 'react'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'

import HeaderBar from './../components/HeaderBar'
import WelcomeCard from './../components/WelcomeCard'

const HomeScreen = (props) => {

  const headerRight = () => {
    return (
      <Link to="/logout">
        <Button color="inherit">Logout</Button>
      </Link>
    )
  }

  return (
    <div className="App">
      <HeaderBar title="Welcome to your account" right={headerRight()} />
      <WelcomeCard />
    </div>
  )
}

export default HomeScreen