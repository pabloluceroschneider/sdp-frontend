import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

// @material-ui/icons
import Close from "@material-ui/icons/Close";

function CloseButton({ className, onClose }) {
  const [close, setClose] = useState(false);
  return (
    <>
      <div className={className} onClick={() => setClose(true)}>
          <Close />
      </div>
      {close && (
        <Dialog
          open={close}
          onClose={() => setClose(false)}
          aria-labelledby="draggable-dialog-title"
          >
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
              Advertencia
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Al cerrar, perderás el progreso
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={()=> setClose(false)}>
                Cancelar
              </Button>
              <Button style={{background: '#ff0000a6', color: 'white'}} onClick={onClose}>Cerrar</Button>
            </DialogActions>
        </Dialog>
      )}
    </>
  )
}

export default CloseButton
