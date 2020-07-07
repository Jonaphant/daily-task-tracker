import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';

const Navbar = () => {
  return (
    <React.Fragment>
      <Grid container className="navbar" justify="center">
        <Grid
          item
          container
          xs={12}
          spacing={1}
          //   style={{ border: '1px solid red' }}
        >
          <Grid container item xs={12} sm={12} md={8} lg={9}>
            <Grid item xs={12} sm={12} md={3} lg={2}>
              <Box textAlign="center">
                <ButtonBase>
                  <Link to="/">
                    <Typography variant="h6" className="head">
                      Daily Task
                    </Typography>
                    <Typography variant="h4" className="variant">
                      Tracker
                    </Typography>
                  </Link>
                </ButtonBase>
              </Box>
            </Grid>
          </Grid>
          <Grid
            item
            container
            xs={12}
            sm={12}
            md={4}
            lg={3}
            justify="center"
            alignItems="center"
          >
            <Hidden smDown>
              <Grid item md={4} lg={4}></Grid>
            </Hidden>
            <Grid item sm={8} lg={8}>
              <Box textAlign="center">
                <Box display="inline">
                  <Link to="/login">
                    <Button color="secondary" size="large">
                      Login
                    </Button>
                  </Link>
                </Box>
                <Box m={2} display="inline">
                  <Link to="/register">
                    <Button
                      color="secondary"
                      variant="outlined"
                      size="large"
                      style={{ borderColor: 'white' }}
                    >
                      Sign Up
                    </Button>
                  </Link>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Navbar;
