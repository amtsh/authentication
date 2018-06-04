import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './App.css';

import RegisterScreen from './screens/RegisterScreen'
import LoginScreen from './screens/LoginScreen'
import LogoutScreen from './screens/LogoutScreen'
import HomeScreen from './screens/HomeScreen'

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={RegisterScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/logout" component={LogoutScreen} />
          <Route path="/home" component={HomeScreen} />
          <Route path="*" component={RegisterScreen}/>
        </Switch>

      </div>
    </Router>
  );
}

export default App;
