import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// redux stuff
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from "./redux/store";
import { useSelector } from 'react-redux';

// core components
import ErrorBoundary from "components/ErrorBoundary";
import Login from "layouts/Login.js";
import Admin from "layouts/Admin.js";
import OperatorLayout from "layouts/Operator.js";
import MisDatosLayout from "layouts/MisDatos.js";

import redirectByPermissions from 'helpers/redirectByPermissions';
import "assets/css/material-dashboard-react.css?v=1.9.0";
import swDev from "./swDev";
const hist = createBrowserHistory();

const Routes = () => {
  const token = useSelector(state => state.auth.token);
  const permissions = useSelector(state => state.permissions);
  let redirect = redirectByPermissions(permissions);

  const authRoutes = (
    <Switch>
      <Route path="/admin" component={Admin} />
      <Route path="/operario" component={OperatorLayout} />
      <Route path="/ingresar" component={Login} />
      <Route path="/mis-datos" component={MisDatosLayout} />
      <Redirect from="/" to={redirect} />
    </Switch>
  )
  
  const unAuthRoutes = (
    <Switch>
      <Route path="/ingresar" component={Login} />
      <Redirect from="/" to="/ingresar" />
    </Switch>
  )
  return token ? authRoutes : unAuthRoutes
}



ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ErrorBoundary>
        <Router history={hist}>
          <Routes />
        </Router>
      </ErrorBoundary>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
swDev()