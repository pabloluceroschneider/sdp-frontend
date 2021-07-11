import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "components/Navbars/Navbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";

//redux
import { useSelector } from 'react-redux';

import routes from "routes.js";

import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";

import bgImage from "assets/img/sidebar-2.jpg";
import logo from "assets/img/logo-sdp.png";

import ErrorBoundary from 'components/ErrorBoundary'
import redirectByPermissions from 'helpers/redirectByPermissions'

let ps;

const switchRoutes = (permissions, redirect) => (
  <ErrorBoundary>
    <Switch>
      {routes.map((prop, key) => {
        if (prop.layout === "/admin") {
          const showRoute = !!(prop.permissions && prop.permissions.some( item =>  permissions.includes(item)))

          return showRoute ? (
            <Route
              path={prop.layout + prop.path}
              component={prop.component}
              key={key}
            />
          ) : null;
        }
        return null;
      })}
      <Redirect from="/admin" to={redirect} />
    </Switch>
  </ErrorBoundary>
);

const useStyles = makeStyles(styles);

export default function Admin({ ...rest }) {
  const permissions = useSelector(state => state.permissions);
  let redirect = redirectByPermissions(permissions);

  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [image] = React.useState(bgImage);
  const [color] = React.useState("blue");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);
  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routes}
        logoText={"SDP"}
        logo={logo}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />

        <div className={classes.content}>
          <div className={classes.container}>{switchRoutes(permissions, redirect)}</div>
        </div>
      
      </div>
    </div>
  );
}
