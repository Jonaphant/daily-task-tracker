import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import PropTypes from 'prop-types';

import {
  Grid,
  Box,
  ButtonBase,
  Typography,
  Hidden,
  Button,
} from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HowToRegIcon from '@material-ui/icons/HowToReg';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <React.Fragment>
      <Box display="inline">
        <Link to="/dashboard">
          <Button color="secondary">
            <AssignmentIcon />
            <Hidden smDown>Dashboard</Hidden>
          </Button>
        </Link>
      </Box>

      <Box m={2} display="inline">
        <a onClick={logout} href="#!">
          <Button
            color="secondary"
            variant="outlined"
            style={{ borderColor: 'white', color: 'white' }}
          >
            <ExitToAppIcon />
            <Hidden smDown>Log Out</Hidden>
          </Button>
        </a>
      </Box>
    </React.Fragment>
  );

  const guestLinks = (
    <React.Fragment>
      <Box display="inline">
        <Link to="/">
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
            style={{ borderColor: 'white', color: 'white' }}
          >
            <HowToRegIcon />
            Sign Up
          </Button>
        </Link>
      </Box>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <Grid container className="navbar" justify="center">
        <Grid item container xs={12} spacing={1}>
          <Grid container item xs={12} sm={12} md={8} lg={9}>
            <Grid item xs={12} sm={12} md={3} lg={2}>
              <Box textAlign="center">
                <ButtonBase>
                  <Link to="/">
                    <Typography variant="h6" className="lead">
                      Daily Task
                    </Typography>
                    <Typography
                      variant="h4"
                      className="variant"
                      color="secondary"
                    >
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
              <Grid item sm={2} lg={3}></Grid>
            </Hidden>
            <Grid item sm={12} md={11} lg={10}>
              <Box textAlign="center">
                {!loading && (
                  <React.Fragment>
                    {isAuthenticated ? authLinks : guestLinks}
                  </React.Fragment>
                )}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
