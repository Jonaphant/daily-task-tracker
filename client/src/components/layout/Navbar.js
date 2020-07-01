import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';

const Navbar = () => {
  return (
    <React.Fragment>
      <Grid
        container
        justify="center"
        style={{ backgroundColor: 'lightblue', padding: '5px' }}
      >
        <Grid item container xs={12} spacing={1}>
          <Grid item xs={6}>
            <ButtonBase>
              <Link to="/">
                <Typography variant="h3">Daily Task Tracker</Typography>{' '}
              </Link>
            </ButtonBase>
          </Grid>
          <Grid item container xs={6} justify="flex-end" alignItems="center">
            <Grid item container xs={3} justify="space-evenly">
              <Grid item xs={4}>
                <ButtonBase>
                  <Link to="/login">
                    <Typography variant="h6">Login</Typography>
                  </Link>
                </ButtonBase>
              </Grid>
              <Grid item xs={4}>
                <ButtonBase>
                  <Link to="/register">
                    <Typography variant="h6">Register</Typography>
                  </Link>
                </ButtonBase>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Navbar;
