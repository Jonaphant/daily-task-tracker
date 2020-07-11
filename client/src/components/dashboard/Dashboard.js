import React from 'react';
import PropTypes from 'prop-types';
import Table from './Table';

// Material UI
import { Grid, Typography, Button, Box } from '@material-ui/core';

const Dashboard = (props) => {
  return (
    <React.Fragment>
      <Grid
        container
        justify="center"
        alignItems="center"
        className="theme-color full-height"
      >
        <Grid
          item
          container
          //   justify="center"
          direction="column"
          //   className="border"
          style={{ height: '70vh' }}
        >
          <Grid
            container
            item
            // className="border"
            // style={{ borderColor: 'purple' }}
          >
            <Grid
              container
              item
              justify="center"
              alignItems="center"
              xs={12}
              md={6}
              //   className="border"
            >
              <Typography variant="h2" className="lead">
                Dashboard
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
                <Button variant="contained" color="secondary" fullWidth>
                  Create Task
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Box width="70%" mx="auto" my={2} className="border">
            <Table />
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
