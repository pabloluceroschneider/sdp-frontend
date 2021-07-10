import React, { useState, useCallback } from 'react';
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert';

const withSnackbar = Component => props => {
  const [snackbar, setsnackbar] = useState();
  
  const toggleSnackbar = useCallback((options) => {
    setsnackbar(options)
  },[]);
  
  const handleClose = () => setsnackbar(null);

  return (
    <>
      <Component toggleSnackbar={toggleSnackbar} {...props} />
      <Snackbar open={Boolean(snackbar)} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' } }autoHideDuration={snackbar?.duration} onClose={handleClose}>
        <Alert severity={snackbar?.severity} onClose={handleClose}>
          {snackbar?.message}
        </Alert>
      </Snackbar>

    </>
  )
}

export default withSnackbar
