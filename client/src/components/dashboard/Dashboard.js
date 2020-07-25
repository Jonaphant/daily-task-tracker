import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import OneTimeTaskTable from './OneTimeTaskTable';
import RepeatTaskTable from './RepeatTaskTable';
import Spinner from '../layout/Spinner';
import { loadUser } from '../../actions/auth';
import { getTasks, resetLoading } from '../../actions/task';

// Material UI
import { Grid, Typography, Button, Box } from '@material-ui/core';

// import Particles from 'react-particles-js';

const Dashboard = ({
  loadUser,
  getTasks,
  resetLoading,
  auth: { user, loading },
  tasks: { tasks, loadingTasks },
}) => {
  const [isFirstLoad, setIsFirstLoad] = useState(false);

  useEffect(() => {
    if (!isFirstLoad) {
      resetLoading();
      setIsFirstLoad(true);
    }
    // Load user data
    loadUser();
    // Get all tasks
    getTasks();
  }, [loadUser, getTasks]);

  const oneTimeTasks = tasks.filter((task) => task.isRepeating === false);
  const repeatingTasks = tasks.filter((task) => task.isRepeating === true);

  return loading || loadingTasks || user === null ? (
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
          {tasks.length === 0 ? (
            <Box mt={10} textAlign="center">
              <Typography variant="h1" id="dashboard-lead">
                Create your first task to get started!
              </Typography>
            </Box>
          ) : oneTimeTasks.length !== 0 && repeatingTasks.length !== 0 ? (
            <React.Fragment>
              <OneTimeTaskTable tasks={oneTimeTasks} />
              <RepeatTaskTable tasks={repeatingTasks} />
            </React.Fragment>
          ) : oneTimeTasks.length !== 0 ? (
            <OneTimeTaskTable tasks={oneTimeTasks} />
          ) : (
            repeatingTasks.length !== 0 && (
              <RepeatTaskTable tasks={repeatingTasks} />
            )
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  tasks: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
  getTasks: PropTypes.func.isRequired,
  resetLoading: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  tasks: state.task,
});

export default connect(mapStateToProps, { loadUser, getTasks, resetLoading })(
  Dashboard
);
