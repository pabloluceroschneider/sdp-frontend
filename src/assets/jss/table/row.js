
const styles = {
  tr: {
    cursor: 'default',
    borderTop: '1px solid #efefef',
    height: '48px',



    '&.helperContainerClass':{
      width: 'auto',
      border: '1px solid #efefef',
      boxShadow: '0 5px 5px -5px rgba(0, 0, 0, 0.2)',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '3px',
  
      '&:active':{
        cursor: 'grabbing',
      },
  
      '& > td':{
        padding: '5px',
        textAlign: 'left',
        width: '200px',
      }
    }
  },
  firstElement : {
    display: 'flex',
    flexDirection: 'row'
  },
  handle: {
    marginRight: '10px',
    padding: '0 5px',
    cursor: 'grab',
  }
}

export default styles;

