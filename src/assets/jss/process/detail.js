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
  addNote:{
    width: '30%',
  },
  input:{
    margin: '24px',
    lineHeight: '1.1',
    width: '45%'
  },
  name: {
    fontSize: '1.5em'
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
  actionBtns: {
    display: 'flex',
    justifyContent: 'center',
    margin: 'auto',
    width: '100%',
    height: '40%',
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
    background: '#52c41a',
    fontSize: '0.4em',
    '&:hover':{
      color: 'white',
      background: '#52c41a',
      fontSize: '0.4em',
    }
  },
  doneHandlerBtn:{
    fontSize: '0.4em',
    border: '1px solid #c1c1c1',
  },
  allDoneBtn:{
    fontSize: '0.4em',
    margin: '0 12px',
    width: '25%',
    border: '1px solid #c1c1c1',
  },
}

export default styles;

