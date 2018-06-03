import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';




class LoginForm extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.flexParent}>

        <Card className={classes.card}>
          <CardContent>
            <h3>Welcome</h3>
          </CardContent>

          <CardActions style={{justifyContent: 'center',}}>
            
          </CardActions>
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
    minWidth: '40%',
    textAlign: 'center',
    margin: '2%'
  },

});

export default withStyles(styles)(LoginForm);
