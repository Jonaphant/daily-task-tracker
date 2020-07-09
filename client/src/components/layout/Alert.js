import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Alert as AlertNotification } from '@material-ui/lab';
import Box from '@material-ui/core/Box';

const Alert = ({ alerts }) => {
  if (alerts !== null && alerts.length > 0) {
    const alertList = alerts.map((alert) => (
      <AlertNotification severity={alert.alertType} key={alert.id}>
        {alert.msg}
      </AlertNotification>
    ));

    return (
      <Box width="20%" position="fixed" bottom={0} left={0} m={5}>
        {alertList}
      </Box>
    );
  } else {
    return false;
  }
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
