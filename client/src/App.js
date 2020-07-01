import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';

import './App.css';

// Material UI
import CssBaseline from '@material-ui/core/CssBaseline';

const App = () => {
  return (
    <Router>
      <React.Fragment>
        <CssBaseline />
        <Navbar />
        <Login />
      </React.Fragment>
    </Router>
  );
};

export default App;