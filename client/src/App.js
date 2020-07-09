import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';

// Redux
import { Provider } from 'react-redux';
import store from './store';

import './App.css';

// Material UI
import CssBaseline from '@material-ui/core/CssBaseline';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <React.Fragment>
          <CssBaseline />
          <Navbar />
          <Alert />
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </React.Fragment>
      </Router>
    </Provider>
  );
};

export default App;
