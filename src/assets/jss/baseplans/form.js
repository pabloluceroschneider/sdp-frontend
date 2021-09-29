
const styles = {
  container : { padding: 12, border: '1px solid #eaeaea' },
  form: { display: 'flex', flexDirection: 'column' },
  row: { display: 'flex', flexDirection: 'row', justifyContent: 'start', paddingRight: 16 },
  company: { width: '100%', marginLeft: 16, marginBottom: 16 },
  product: { width: '100%', marginLeft: 16, marginBottom: 16 },
  planName: { width: '100%', marginLeft: 16, marginBottom: 8 },
  warnings: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 10,
  },
  detail: {
    color: "grey",
    fontSize: 12,
  },
  buttonsRow: { 
    display: 'flex', 
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'sticky',
    bottom: 0,
    background: 'white',
    padding: '12px 8px',
    borderTop: '1px solid #f2f2f2'
  },
  rightBtn: {
    display: 'flex', 
    alignItems: 'center',
  },
  cancelBtn: { margin: '0 16px' },
  error: { color: 'red' },
  alert: {
    padding: '0 16px'
  },
  totalTimes: {
    display: 'inline-flex',
    gap: 4,
    justifyContent: 'center',
    padding: '16px',
    width: '100%',
  },




  '@media screen and (max-width: 600px)': {
    buttonsRow: {
      position: 'static',
      display: 'flex', 
      flexDirection: 'column-reverse',
      width: '96%',
      marginTop: 12,
    },
    alert: {
      margin: '8px 0',
    },
    rightBtn: {
      display: 'flex', 
      flexDirection: 'column-reverse',
      width: '96%',
      marginBottom: 8
    },
    detail:{
      lineHeight: '1em',
    },
    confirmBtn: {
      width: '100%',
      marginBottom: 8
    }
  },
}

export default styles;