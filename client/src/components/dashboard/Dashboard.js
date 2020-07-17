import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import EnhancedTable from './EnhancedTable';
import Spinner from '../layout/Spinner';

// Material UI
import { Grid, Typography, Button, Box } from '@material-ui/core';

const Dashboard = ({ auth: { user, loading } }) => {
  return loading || user === null ? (
    <Spinner />
  ) : (
    <React.Fragment>
      <Box pt={17}></Box>
      <Grid item container justify="center">
        <Grid container item style={{ marginBottom: '10px' }}>
          <Grid
            container
            item
            justify="center"
            alignItems="center"
            xs={12}
            md={6}
          >
            <Typography variant="h4" className="lead" gutterBottom>
              Welcome, <span className="secondary-color">{user.name}</span>
            </Typography>
          </Grid>
          <Grid
            container
            item
            justify="center"
            alignItems="center"
            xs={12}
            md={6}
          >
            <Grid container item xs={5} md={4} lg={3} xl={2} justify="center">
              <Link to="/createtask">
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  fullWidth
                >
                  Create a Task
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
        <Grid container item xs={8}>
          <EnhancedTable repeating={false} />
          <EnhancedTable repeating={true} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Dashboard);
