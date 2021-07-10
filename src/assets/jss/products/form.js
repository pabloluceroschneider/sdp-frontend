
const styles = {
  section : { padding: 16 },
  form: { display: 'flex', flexDirection: 'row', width: '100%' },
  btnSave: { marginTop: 16, width: '20%', alignSelf: 'flex-end' },
  field: { margin: '8px 16px', width: '40%' },
  error: { marginLeft: 'calc(40% + 24px)', color: 'red' },
  success: { marginLeft: 16, color: 'green' },


  '@media screen and (max-width: 600px)': {
    form : {
      flexDirection: 'column'
    },
    field: {
      width: '90%'
    },
    btnSave: {
      width: '30%'
    }
  }
}

export default styles;