
const styles = {
  section : { padding: 16 },
  form: { display: 'flex', flexDirection: 'column', width: '80%' },
  row: { display: 'flex', flexDirection: 'row', justifyContent: 'start' },
  btnSave: { margin: '16px 16px 0 0', width: '30%', alignSelf: 'flex-end' },
  field: { margin: '8px 16px', width: '100%' },

  '@media screen and (max-width: 600px)': {
    form: {
      flexDirection: 'column',
      width: '90%'
    },
    row: {
      flexDirection: 'column'
    },
    btnSave: {
      width: '90%',
      margin: '16px 0 0',
    }
  }
}

export default styles;