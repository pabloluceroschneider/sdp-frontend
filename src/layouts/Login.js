import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import withTranslation from 'HOCS/withTranslation';

import { makeStyles } from '@material-ui/core/styles';
import authService from '../services/authService';
import { useDispatch } from 'react-redux';
// import { setToken, setPermissions, bulkConfigsApp } from '../redux/actions';
import { setToken, setPermissions } from '../redux/actions';

import redirectByPermissions from 'helpers/redirectByPermissions'
import loginImage from "assets/img/login-image.jpeg";

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${loginImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  margin: {
    margin: theme.spacing.unit,
  },
  textField: {
    flexBasis: 200,
  },
  responseError: {
    marginTop: 25
  }
}));

function SignInSide({ t }) {
  const classes = useStyles();
  const [username, setusername] = React.useState();
  const [password, setpassword] = React.useState();
  const [responseError, setresponseError] = React.useState();
  const [btnSubmitText, setbtnSubmitText] = React.useState('Ingresar');
  const [showPassword, setshowPassword] = React.useState(false);

  const dispatch = useDispatch();
  const dispatchToken = React.useCallback(
    (token) => dispatch(setToken(token)),
    [dispatch]
  )
  const dispatchPermissions = React.useCallback(
    (permissions) => dispatch(setPermissions(permissions)),
    [dispatch]
  )
  // const dispatchAppConfigs = React.useCallback(
  //   (configs) => dispatch(bulkConfigsApp(configs)),
  //   [dispatch]
  // )

  const onInputChange = (setter) => (e) => {
    e.preventDefault();
    setter(e.target.value);
    if (responseError) setresponseError(null);
  }

  const handleError = (responseText) => {
    setresponseError(responseText)
    setbtnSubmitText("Ingresar")
  }

  const handleSuccessLogin = ({ user_permissions, ...configs }) => {
    setbtnSubmitText("Ingresando...");
    dispatchToken(user_permissions);
    dispatchPermissions(user_permissions);
    // dispatchAppConfigs(configs);
    window.location.href = redirectByPermissions(user_permissions);
  }

  const handleClick = async (e) => {
    e.preventDefault();
    if (!username) {
      handleError('Username cannot be empty.')
      return;
    }
    if (!password) {
      handleError('Password cannot be empty.')
      return;
    }
    const body = {
      username: username?.trim(),
      password: password?.trim()
    }
    const { response, error } = await authService.login({ body });
    error 
      ? handleError(response)
      : handleSuccessLogin(response)
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sistema de Producción
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Usuario"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                error={responseError}
                onChange={onInputChange(setusername)}
              />
            <FormControl className={[classes.textField, classes.form]} error={responseError}>
              <InputLabel htmlFor="adornment-password">Contraseña *</InputLabel>
              <Input
                id="adornment-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={onInputChange(setpassword)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={() => setshowPassword(!showPassword)}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            {responseError && (
              <Typography className={classes.responseError} variant="body2" color="error" align="center">
                {t(responseError, `${username}`)}
              </Typography>
            )}
            <Button
              onClick={handleClick} 
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
             {btnSubmitText}
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

const expose = withTranslation(SignInSide)

export default expose