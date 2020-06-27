import React from 'react';
import TextField from '@material-ui/core/TextField';

const Login = () => {
  return (
    <React.Fragment>
      <TextField id="standard-basic" label="Email" />
      <TextField
        id="standard-password-input"
        label="Password"
        type="password"
      />
    </React.Fragment>
  );
};

export default Login;
