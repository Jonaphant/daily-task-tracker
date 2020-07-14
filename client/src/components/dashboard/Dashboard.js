import React from 'react';
import PropTypes from 'prop-types';
import EnhancedTable from './EnhancedTable';

// Material UI
import { Grid, Typography, Button, Box } from '@material-ui/core';

const Dashboard = (props) => {
  return (
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
              Welcome, Jonathan
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
              <Button
                variant="contained"
                color="secondary"
                size="small"
                fullWidth
              >
                Create Task
              </Button>
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

Dashboard.propTypes = {};

export default Dashboard;
