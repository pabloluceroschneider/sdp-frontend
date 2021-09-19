import { makeStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  container: {
    display: 'flex',
    width: 640,
    height: '100vh',
    margin: 'auto',
    '@media screen and (max-width: 600px)': {
      width: '80%',
    },
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: 440,
    width: '100%',
    alignSelf: 'center',
    '@media screen and (max-width: 600px)': {
      height: '80%',
    },
  },
  pwd: {
    width: 280,
    maxWidth: '100%',
    margin: '8px auto',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'end',
    width: 280,
    maxWidth: '100%',
    margin: '0 auto',
  }
})

const useStyles = makeStyles(styles);

export default useStyles;