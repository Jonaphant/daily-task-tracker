import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { login } from '../../actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Material UI
import { TextField, Grid, Typography, Button, Box } from '@material-ui/core';
import LockTwoToneIcon from '@material-ui/icons/LockTwoTone';
import Hidden from '@material-ui/core/Hidden';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <React.Fragment>
      <Grid container className="full-height" id="login-dashboard">
        <Hidden smDown>
          <Grid
            container
            item
            xs={12}
            sm={12}
            md={7}
            justify="center"
            alignItems="flex-start"
            direction="column"
          >
            <Box width="75%" ml={9}>
              <Typography variant="h1" className="lead">
                Create and Track
              </Typography>{' '}
            </Box>
            <Box width="60%" ml={10} mb={15}>
              <Typography variant="h2" className="lead">
                your tasks with a clean, minimalistic interface.
              </Typography>
            </Box>
          </Grid>
        </Hidden>
        <Grid
          container
          item
          xs={12}
          md={5}
          justify="center"
          alignItems="center"
        >
          <Box
            bgcolor="background.paper"
            borderRadius="borderRadius"
            width="80%"
            boxShadow={3}
            p={5}
          >
            <Grid container item xs={12} direction="column">
              <Box mx="auto" mb={5}>
                <Grid container alignItems="center">
                  <LockTwoToneIcon color="secondary" fontSize="large" />
                  <Typography variant="h2">Login</Typography>
                </Grid>
              </Box>
              <form onSubmit={(e) => onSubmit(e)}>
                <Box mb={3}>
                  <TextField
                    label="Email"
                    name="email"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => onChange(e)}
                    value={email}
                  />
                </Box>
                <Box mb={3}>
                  <TextField
                    label="Password"
                    type="password"
                    name="password"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => onChange(e)}
                    value={password}
                  />
                </Box>
                <Box mx="auto" mb={3}>
                  <Button
                    color="secondary"
                    variant="contained"
                    type="submit"
                    fullWidth
                  >
                    Sign In
                  </Button>
                </Box>
              </form>
            </Grid>
            <Grid container justify="center">
              <Link to="/register">Don't have an account? Sign Up</Link>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
