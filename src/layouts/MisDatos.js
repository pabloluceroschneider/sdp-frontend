import React, { useState } from 'react'
import { useSelector } from 'react-redux'

//@material-ui
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

// styles
import useStyles from "assets/jss/misdatos";
import authService from 'services/authService';

function MisDatos() {
  const classes = useStyles();
  const _id = useSelector(state => state.auth.token._id)
  const [password, setpsw] = useState()
  const [text, settext] = useState('Guardar')

  const onCancel = () => window.location = "/";
  const handlePswChange = (e) => setpsw(e.target.value)

  const onSaveClick = () => {
    settext("Guardando...")
    authService.updatePassword({ password, id: _id }).then(() => {
      return window.location = "/";
    }).catch(() => {
      setpsw();
      settext("Guardar")
      alert("No se pudo actualizar la contraseña");
    });
  };

  return (
    <div className={classes.container}>
      <Paper className={classes.paper}>

        <TextField 
          onChange={handlePswChange}
          className={classes.pwd} 
          placeholder="Nueva contraseña" 
          />

        <div className={classes.buttons}>
          <Button onClick={onCancel}>Cancelar</Button>
          <Button onClick={onSaveClick} variant="contained" color="primary">{text}</Button>
        </div>
      </Paper>
    </div>
  )
}

export default MisDatos
