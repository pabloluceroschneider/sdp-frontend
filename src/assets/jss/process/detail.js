const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  drawer: {
    width: '88vw',
    flexShrink: 0,
  },
  container: {
    height: '100vh',
    fontSize: '1.4em',
  },
  info: {
    height: '50%',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '32px'
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  statusBtn:{
    width: '30%',
    height: '60%',
    width: 250,
    placeSelf: 'center',
    border: '1px solid #c1c1c1',
  },
  input:{
    margin: '24px',
    lineHeight: '1.1',
    width: '40%'
  },
  name: {
    fontSize: '1.5em',
    lineHeight: '1em',
  },
  operatorNotes: {
    width: '100%',
    margin: '0 32px',
    justifyContent: 'center',
  },
  doneRegister: {
    width: '30%',
    justifyContent: 'flex-end',
  },
  resize: {
    fontSize: '3em',
    textAlign: 'center'
  },
  actionsRow: {
    display: 'flex',
    justifyContent: 'center',
    margin: 'auto',
    width: '50%',
    height: '30%',
  },
  emptyActionsRow : {
    width: '50%',
  },
  onWorkingBtns: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    margin: 'auto',
    width: '60%',
    height: '100%',
    fontSize: '3em'
  },
  primary: {
    color: 'white',
    height: '60%',
    width: 250,
    placeSelf: 'center',
    background: '#52c41a',
    '&:hover':{
      color: 'white',
      background: '#52c41a75',
    }
  },
  secondary: {
    height: '60%',
    width: 250,
    margin: '48px 0',
    placeSelf: 'center',
    border: '1px solid #c1c1c1',
    '&:hover':{
    }
  },
  doneHandlerBtn:{
    fontSize: '1em',
    margin: '0 12px',
    border: '1px solid #c1c1c1',
  },
  fsfasfsfa: {
    marginTop: 64
  },

  '@media screen and (max-width: 600px)': {
    container: {
      height: 'auto'
    },
    row: { 
      flexDirection: 'column',  
      width: '100%',
      border: '1px solid #ededed',
      marginBottom: 24,
    },
    input: {
      width: '85%' 
    },
    statusBtn: {
      width: '85%',
      margin: '0 4px',
      alignSelf: 'center',
      marginBottom: 24,
    },
    actionsRow: {
      width: '100%',
      margin: '24px 0',
    },
    primary: {
      alignSelf: 'center',
    },
    secondary: {
      margin: 0
    },
    emptyActionsRow : {
      display: 'none',
    },
    fsfasfsfa: {
      marginTop: 0
    }
  }
}

export default styles;

