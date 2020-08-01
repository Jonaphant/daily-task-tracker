import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { createTask } from '../../actions/task';

import {
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const CreateTask = ({ createTask }) => {
  const today = moment(new Date()).format('YYYY-MM-DD');
  const history = useHistory();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: today,
    isRepeating: false,
    repeatOccurence: 1,
  });

  const {
    name,
    description,
    startDate,
    isRepeating,
    repeatOccurence,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onChangeCheck = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // Parse date in local time instead of UTC
    const startDateWithTZ = new Date(startDate.replace(/-/g, '/'));

    createTask({
      name,
      description,
      startDate: startDateWithTZ,
      isRepeating,
      repeatOccurence,
    });

    setTimeout(() => {
      history.push('/dashboard');
    }, 1000);
  };

  return (
    <React.Fragment>
      <Grid
        container
        justify="center"
        alignItems="center"
        className="theme-color full-height"
      >
        <Grid container item xs={11} sm={9} md={7} lg={5} justify="center">
          <Box
            bgcolor="background.paper"
            borderRadius="borderRadius"
            width="100%"
            boxShadow={3}
            p={5}
          >
            <Grid container direction="column">
              <Box mb={3} textAlign="center">
                <Typography variant="h2">Create a Task</Typography>
                <Grid container alignItems="center" justify="center">
                  <Typography variant="h6" className="secondary-color">
                    Start organizing you life one task at a time.
                  </Typography>
                </Grid>
              </Box>
            </Grid>

            <form onSubmit={(e) => onSubmit(e)}>
              <Box mb={3}>
                <TextField
                  required
                  label="Name"
                  name="name"
                  variant="outlined"
                  fullWidth
                  value={name}
                  onChange={(e) => onChange(e)}
                />
              </Box>
              <Box mb={3}>
                <TextField
                  multiline
                  label="Description"
                  name="description"
                  type="description"
                  variant="outlined"
                  fullWidth
                  rows={4}
                  value={description}
                  onChange={(e) => onChange(e)}
                />
              </Box>
              <Box mb={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isRepeating}
                      onChange={onChangeCheck}
                      name="isRepeating"
                    />
                  }
                  label="isRepeating"
                />
                {isRepeating && (
                  <React.Fragment>
                    <TextField
                      label="Repeat Occurence"
                      name="repeatOccurence"
                      type="number"
                      variant="outlined"
                      size="small"
                      helperText="Ex: 1 is every day , 2 is every other day , 3 is every three days and so on."
                      value={repeatOccurence}
                      onChange={(e) => onChange(e)}
                    />
                    <Box mt={3}>
                      <TextField
                        required
                        type="date"
                        name="startDate"
                        label="Start Date"
                        variant="outlined"
                        inputProps={{ min: today }}
                        value={startDate}
                        onChange={(e) => onChange(e)}
                      />
                    </Box>
                  </React.Fragment>
                )}
              </Box>
              <Box>
                <Grid container justify="space-between" alignItems="flex-end">
                  <Link to="/dashboard">
                    <Button variant="contained" size="small">
                      <ArrowBackIcon />
                      Go Back
                    </Button>
                  </Link>
                  <Button
                    color="secondary"
                    variant="contained"
                    type="submit"
                    size="large"
                  >
                    Create task
                  </Button>
                </Grid>
              </Box>
            </form>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

CreateTask.propTypes = {
  createTask: PropTypes.func.isRequired,
};

export default connect(null, { createTask })(CreateTask);
