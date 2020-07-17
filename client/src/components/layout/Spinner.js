import React from 'react';
import { CircularProgress, Grid } from '@material-ui/core';

const Spinner = () => {
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className="full-height"
    >
      <CircularProgress color="secondary" />
    </Grid>
  );
};

export default Spinner;
