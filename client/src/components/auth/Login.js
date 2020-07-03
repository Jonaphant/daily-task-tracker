import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const Login = () => {
  return (
    <React.Fragment>
      <Grid
        container
        xs={12}
        style={{
          border: '1px solid red',
          position: 'absolute',
          height: '100vh',
        }}
      >
        <Grid
          item
          xs={8}
          style={{
            background:
              "url('https://source.unsplash.com/f2C59x5uvn8') no-repeat center center/cover",
          }}
        ></Grid>
        <Grid
          container
          xs={4}
          justify="center"
          alignItems="center"
          style={{ backgroundColor: 'purple' }}
        >
          <Box
            bgcolor="background.paper"
            p={5}
            borderRadius="borderRadius"
            width="75%"
          >
            <Grid
              item
              container
              xs={12}
              direction="column"
              style={{ border: '1px dotted red' }}
            >
              <Typography variant="h2" gutterBottom>
                Login
              </Typography>
              <TextField id="standard-basic" label="Email" />
              <TextField
                id="standard-password-input"
                label="Password"
                type="password"
              />
              <Grid
                item
                container
                xs={5}
                // justify="center"
                style={{ border: '1px solid red' }}
              >
                <Button color="primary" variant="contained">
                  Login
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Login;
