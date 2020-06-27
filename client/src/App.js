import React from 'react';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';

// Material UI
import CssBaseline from '@material-ui/core/CssBaseline';

const App = () => (
  <React.Fragment>
    <CssBaseline />
    <Navbar />
    <Login />
  </React.Fragment>
);

export default App;
