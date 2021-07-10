
const styles = {
  container : { padding: 12, border: '1px solid #eaeaea' },
  form: { display: 'flex', flexDirection: 'column' },
  row: { display: 'flex', flexDirection: 'row', justifyContent: 'start', paddingRight: 16, marginBottom: 8 },
  company: { width: '47%', marginLeft: 16 },
  product: { width: '47%', marginLeft: 16,  },
  planName: { width: '47%', marginLeft: 16,  },
  date: { width: '25%', marginLeft: 16,  },
  quantity: { width: '10%', marginLeft: 16,  },
  status: { width: '26%', marginLeft: 16,  },
  observation: { width: '74%', marginLeft: 16,  },
  purchaseOrder: { width: '34%', marginLeft: 16,  },
  split: { margin: '8px 8px 0px' },
  warnings: {
    display: 'flex',
    flexDirection: 'column',
    margin: 12,
  },
  detail: {
    color: "grey",
    fontSize: 12,
    marginLeft: 4,
  },
  buttonsRow: { 
    display: 'flex', 
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'sticky',
    bottom: 0,
    background: 'white',
    padding: '12px 0',
    margin: '-2px 1px 0 1px',
    borderTop: '1px solid #ebebeb'
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