
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
  leftBtn: {
    margin: '0 12px',
  },
  rightBtn: {
    display: 'flex', 
    alignItems: 'center',
    margin: '0 12px',
  },
  cancelBtn: { margin: '0 16px' },
  error: { color: 'red' },
  alert: {
    padding: '0 16px'
  },
  tasksTable: {
    marginTop: 12
  },




  '@media screen and (max-width: 600px)': {
    row: {
      flexDirection: 'column',
    },
    company: { width: '95%', marginTop: 12 },
    product: { width: '95%', marginTop: 12   },
    planName: { width: '95%', marginTop: 12   },
    date: { width: '95%', marginTop: 12   },
    quantity: { width: '95%', marginTop: 12   },
    status: { width: '95%', marginTop: 12   },
    observation: { width: '95%', marginTop: 12   },
    purchaseOrder: { width: '95%', marginTop: 12   },
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