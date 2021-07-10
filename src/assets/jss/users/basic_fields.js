
const styles = {
  section : { 
    position: 'relative',
    borderTop: '1px solid #ebebeb',
    borderBottom: '1px solid #ebebeb',
  },
  form: { display: 'flex', flexDirection: 'column', width: '80%' },
  row: { display: 'flex', flexDirection: 'row', justifyContent: 'start' },
  btnSave: { margin: '16px 16px 0 0', width: '30%', alignSelf: 'flex-end' },
  field: { margin: '8px 16px', width: '32%' },
  username: { margin: '8px 16px', width: '20%' },
  icons: {
    position: 'absolute',
    top: 8,
    bottom: 8
  },

  '@media screen and (max-width: 600px)': {
    form: {
      flexDirection: 'column',
      width: '90%'
    }
  }
}

export default styles;