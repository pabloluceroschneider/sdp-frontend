const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  drawer: {
    width: '100vw',
    flexShrink: 0,
  },
  detailProcess: {
    display: 'flex',
    width: '100vw',
  },
  close: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '8vw',
    height: 20,
    padding: 28,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '92vw',
    height: '92vh',
    fontSize: '1.4em',
    padding: 24,
  },
  info: {
    height: '50%',
  },
  header: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    border: '1px solid #ebebeb',
    padding: 16
  },
  statusBtn:{
    width: '100%',
    height: '100%',
    margin: '0 8px',
    placeSelf: 'center',
    border: '1px solid #c1c1c1',
  },
  input:{
    lineHeight: '1.1',
  },
  observation:{
    lineHeight: '1.1',
    background: 'yellow'
  },
  estimate:{
    lineHeight: '1.1',
    textAlign: 'left'
  },
  smallInput:{
    fontSize: '.8em',
    lineHeight: '1.1',
  },
  status:{
    lineHeight: '1.1',
    width: '50%',
    margin: '0 4px',
  },
  operatorNotes: {
    lineHeight: '1.1',
    width: '100%',
    margin: '0 4px',
  },
  name: {
    fontSize: '1.5em',
    lineHeight: '1em',
  },
  doneRegister: {
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
  },
  onWorkingBtns: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    margin: 'auto',
    fontSize: '3em'
  },
  success: {
    color: 'white',
    fontSize: '1.5em',
    placeSelf: 'center',
    background: '#52c41a',
    '&:hover':{
      color: 'white',
      background: '#52c41a75',
    }
  },
  doneHandlerBtn:{
    fontSize: '1em',
    margin: '0 12px',
    border: '1px solid #c1c1c1',
  },
  IN_PROGRESS: {
    border: '2px solid #4DBDDE',
    '&:hover, &:active':{
      backgroundColor: '#4DBDDE',
    }
  },
  PAUSED: {
    border: '2px solid #DEDB4D',
    '&:hover, &:active':{
      backgroundColor: '#DEDB4D',
    }
  },
  FINISHED: {
    border: '2px solid #C4F5AF',
    '&:hover, &:active':{
      backgroundColor: '#C4F5AF',
    }
  },

  '@media screen and (max-width: 600px)': {
    container: {
      height: 'auto',
      padding: 12,
    },
    header: {
      position: 'sticky',
      top: 0,
      display: 'flex',
      flexDirection: 'column',
      paddingBottom: 16,
      backgroundColor: 'white',
    },
    row: { 
      flexDirection: 'column',
      padding: 12,
      border: '1px solid #ededed',
      marginBottom: 24,
    },
    input: {
      width: '85%' 
    },
    statusBtn: {
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

