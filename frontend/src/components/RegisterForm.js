import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ErrorIcon from '@material-ui/icons/Error';

import Validators from './../utils/validator.js';
import request from './../utils/apiService.js';

class RegisterForm extends React.Component {
  state = {
    username: '',
    email: '',
    password: '', 
    usernameError: false,
    emailError: false,
    passwordError: false,
    errorMsg: ''
  };

  Messages = {
    username: 'Should be alphanumberic with minimum 4 characters and maximum 20 characters.',
    email: 'Should be valid email with maximum 50 characters',
    password: 'Should have minimum 8 characters and maximum 20 characters.'
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  validateInput = (inputName, value) => {
    let valid = Validators['validate_' + inputName](value)

    valid ?
      this.setState({ 
        [inputName + 'Msg']: '',
        [inputName + 'Error']: false 
      })
    :
      this.setState({ [inputName + 'Error']: true });
  }

  handleBlur = name => event => {
    this.validateInput(name, event.target.value)
  };

  handleFocus = name => event => {
    this.setState({ [name + 'Msg']: this.Messages[name] });
  };

  submitHandler = (e) => {
    e.preventDefault();

    for (var i of ["username", "email", "password"]) { this.validateInput(i, this.state[i]) }

    if (this.state.usernameError || this.state.passwordError || this.state.emailError) {

    } else {

      request.post('/api/v1/users', {
        'username': this.state.username,
        'email': this.state.email,
        'password': this.state.password
      }, this.onSuccess)
    }
  }

  onSuccess = (response) => {
    if(response && response.error) {
      this.setState({ errorMsg: response.error })
    } else {
      this.setState({ errorMsg: '' })
      this.props.onAuthentication()
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.flexParent}>

        <Card className={classes.card}>
          <CardContent>

            <form 
              className={classes.container} 
              noValidate 
              autoComplete="off"
              onSubmit={this.submitHandler}
            >
              <TextField
                type="text"
                id="username"
                label="Username"
                className={classes.textField}
                value={this.state.username}
                onChange={this.handleChange('username')}
                onFocus={this.handleFocus('username')}
                onBlur={this.handleBlur('username')}
                margin="normal"
                required={true}
                error={this.state.usernameError}
                helperText={this.state.usernameMsg}
              />
              <br/>
              <TextField
                type="email"
                id="email"
                label="Email"
                className={classes.textField}
                value={this.state.email}
                onChange={this.handleChange('email')}
                onFocus={this.handleFocus('email')}
                onBlur={this.handleBlur('email')}
                margin="normal"
                required={true}
                error={this.state.emailError}
                helperText={this.state.emailMsg}
              />
              <br/>
              <TextField
                type="password"
                id="password"
                label="Password"
                className={classes.textField}
                value={this.state.password}
                onChange={this.handleChange('password')}
                onFocus={this.handleFocus('password')}
                onBlur={this.handleBlur('password')}
                margin="normal"
                required={true}
                error={this.state.passwordError}
                helperText={this.state.passwordMsg}
              />
              <br/>

              {
                this.state.errorMsg ? 
                  (<ListItem>
                    <ListItemIcon>
                      <ErrorIcon style={{color: 'red'}}/>
                    </ListItemIcon>
                    <ListItemText>
                      <span style={{color:'red'}}>{this.state.errorMsg}</span>
                    </ListItemText>
                  </ListItem>) : ""
              }

              <CardActions style={{justifyContent: 'center',}}>
                <Button
                  type="submit" 
                  className={classes.button} 
                  variant="raised" 
                  color="primary"
                >
                  Register account
                </Button>
              </CardActions>
            </form>

          </CardContent>
        </Card>

      </div>
    );
  }
}

RegisterForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = (theme) => ({

  flexParent: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '8%',
  },
  card: {
    minWidth: '50%',
    textAlign: 'center',
    margin: '2%'
  },
  form: {
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%'
  },
  button: {
    margin: theme.spacing.unit,
  },

});

export default withStyles(styles)(RegisterForm);
