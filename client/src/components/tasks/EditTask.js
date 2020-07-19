import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
import DeleteIcon from '@material-ui/icons/Delete';

const EditTask = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    isRepeating: false,
    repeatOccurence: 1,
    streak: 0,
  });

  useEffect(() => {
    // @todo Get current task
  }, []);

  const { name, description, isRepeating, repeatOccurence, streak } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onChangeCheck = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(name, description, isRepeating, repeatOccurence, streak);
    // history.push('/dashboard');
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
                <Typography variant="h2">Edit Task</Typography>
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
                  size="small"
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
                <TextField
                  label="Streak"
                  name="streak"
                  type="number"
                  variant="outlined"
                  size="small"
                  value={streak}
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
                  <TextField
                    label="Repeat Occurence"
                    name="repeatOccurence"
                    type="number"
                    variant="outlined"
                    size="small"
                    helperText="Enter the amount of days in between each occurence"
                    value={repeatOccurence}
                    onChange={(e) => onChange(e)}
                  />
                )}
              </Box>
              <Box>
                <Grid
                  id="edit-button-container"
                  container
                  item
                  xs={12}
                  justify="space-between"
                  alignItems="center"
                >
                  <Grid item xs={12} sm={2}>
                    <Link to="/dashboard">
                      <Button variant="contained" fullWidth size="small">
                        <ArrowBackIcon />
                        Back
                      </Button>
                    </Link>
                  </Grid>
                  <Grid item xs={12} sm={7}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      color="secondary"
                      fullWidth
                    >
                      Save
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Link to="/dashboard">
                      <Button
                        color="primary"
                        variant="contained"
                        size="small"
                        fullWidth
                      >
                        <DeleteIcon />
                        Delete
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </form>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

EditTask.propTypes = {};

export default connect(null)(EditTask);
