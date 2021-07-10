
const styles = {
  section : { margin: '40px 0', padding: 16 },
  form: { display: 'flex', flexDirection: 'row', width: '50%' },
  btnSave: { marginTop: 16, width: '30%', alignSelf: 'flex-end' },
  field: { margin: '8px 16px', width: '100%' },
  error: { marginLeft: 16, color: 'red' },

  '@media screen and (max-width: 600px)': {
    form: { flexDirection: 'column',  width: '90%' },
  }
}

export default styles;