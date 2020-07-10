import React from 'react';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import LockTwoToneIcon from '@material-ui/icons/LockTwoTone';
import Hidden from '@material-ui/core/Hidden';

const Login = () => {
  const onSubmit = (e) => {
    e.preventDefault();
    console.log('Clicked on submit');
  };

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
              <Typography variant="h1" id="lead">
                Create and Track
              </Typography>{' '}
            </Box>
            <Box width="60%" ml={10} mb={15}>
              <Typography variant="h2" id="lead">
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
            width="90%"
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
                  />
                </Box>
                <Box mb={3}>
                  <TextField
                    label="Password"
                    type="password"
                    name="password"
                    variant="outlined"
                    fullWidth
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

export default Login;
