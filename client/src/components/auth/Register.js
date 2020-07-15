import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';
import { register } from '../../actions/auth';

// Material UI
import { TextField, Grid, Box, Typography, Button } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'error');
      console.log('Passwords do not match');
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <React.Fragment>
      <Grid
        container
        justify="center"
        alignItems="center"
        className="theme-color full-height"
      >
        <Grid
          container
          item
          xs={11}
          sm={6}
          justify="center"
          className="border pink"
        >
          <Box
            bgcolor="background.paper"
            borderRadius="borderRadius"
            width="100%"
            boxShadow={3}
            p={5}
            className="border red"
          >
            <Grid container direction="column">
              <Box mb={5} textAlign="center">
                <Typography variant="h2">Sign Up</Typography>
                <Grid container alignItems="center" justify="center">
                  <PersonIcon color="secondary" fontSize="large" />
                  <Typography variant="h6">Create your account</Typography>
                </Grid>
              </Box>
            </Grid>

            <form onSubmit={(e) => onSubmit(e)}>
              <Box mb={3}>
                <TextField
                  label="Name"
                  name="name"
                  variant="outlined"
                  fullWidth
                  value={name}
                  onChange={(e) => onChange(e)}
                />
              </Box>
              <Box mb={3}>
                <TextField
                  required
                  label="Email"
                  name="email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={(e) => onChange(e)}
                />
              </Box>
              <Box mb={3}>
                <TextField
                  required
                  label="Password"
                  type="password"
                  name="password"
                  variant="outlined"
                  fullWidth
                  value={password}
                  onChange={(e) => onChange(e)}
                />
              </Box>
              <Box mb={3}>
                <TextField
                  required
                  label="Confirm Password"
                  type="password"
                  name="password2"
                  variant="outlined"
                  fullWidth
                  value={password2}
                  onChange={(e) => onChange(e)}
                />
              </Box>
              <Box mx="auto" mb={3}>
                <Button
                  color="secondary"
                  variant="contained"
                  type="submit"
                  fullWidth
                >
                  Register
                </Button>
              </Box>
            </form>
            <Grid container justify="center">
              <Link to="/">Already have an account? Login</Link>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
