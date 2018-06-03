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


class LoginForm extends React.Component {
  state = {
    email: '',
    password: '',
    emailError: false,
    passwordError: false,
    errorMsg: ''
  };

  Messages = {
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

    for (var i of ["email", "password"]) { this.validateInput(i, this.state[i]) }

    if (this.state.passwordError || this.state.emailError) {

    } else {

      request.post('/api/v1/login', {
        'email': this.state.email,
        'password': this.state.password
      }, this.onSuccess)
    }
  }

  onSuccess = (response) => {
    if(response && response.error) {
      this.setState({ errorMsg: response.error });
    } else {
      this.setState({ errorMsg: '' });
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
                type="email"
                id="email"
                label="Email"
                className={classes.textField}
                value={this.state.email}
                onChange={this.handleChange('email')}
                onFocus={this.handleFocus('email')}
                onBlur={this.handleBlur('email')}
                autoFocus={true}
                margin="normal"
                required={true}
                error={this.state.emailError}
                helperText={this.state.emailMsg}
              />
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
                <Button type="submit" className={classes.button} variant="raised" color="primary">
                  Login
                </Button>
              </CardActions>

            </form>
          </CardContent>
        </Card>

      </div>
    );
  }
}

LoginForm.propTypes = {
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

export default withStyles(styles)(LoginForm);
