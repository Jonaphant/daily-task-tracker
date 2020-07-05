import React from 'react';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import LockTwoToneIcon from '@material-ui/icons/LockTwoTone';
import infographics from './img/infographics.png';

const Login = () => {
  const onSubmit = (e) => {
    e.preventDefault();
    console.log('Clicked on submit');
  };

  return (
    <React.Fragment>
      <Grid container xs={12} className="fullheight">
        <Grid
          item
          md={7}
          only="md"
          style={{
            background:
              "url('https://source.unsplash.com//zJDqiEGUCHY') no-repeat center center/cover",
          }}
        ></Grid>
        <Grid
          container
          xs={12}
          md={5}
          justify="center"
          alignItems="center"
          className="theme-color"
        >
          <Box
            bgcolor="background.paper"
            borderRadius="borderRadius"
            width="90%"
            boxShadow={3}
            p={5}
          >
            <Grid item container xs={12} direction="column">
              <Box mx="auto" mb={3}>
                <Grid container alignItems="center">
                  <LockTwoToneIcon color="secondary" fontSize="large" />
                  <Typography variant="h2">Login</Typography>
                </Grid>
              </Box>
              <form onSubmit={(e) => onSubmit(e)}>
                <Box mb={3}>
                  <TextField
                    id="standard-basic"
                    label="Email"
                    name="email"
                    variant="outlined"
                    fullWidth
                  />
                </Box>
                <Box mb={3}>
                  <TextField
                    id="standard-password-input"
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
              <Link to="/">Don't have an account? Sign Up</Link>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Login;
