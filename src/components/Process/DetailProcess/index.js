import React from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';

import styles from 'assets/jss/process/detail'
import processService from 'services/processService';
const useStyles = makeStyles(styles);

function DetailProcess({
  data,
  onCloseDrawer
}){
  const classes = useStyles();
  const optionsStatus = useSelector(state => state.appData.status);
  const lookupstatus = useSelector(state => state.appData.lookupstatus);
  const {
    _id: id,
    name,
    batchNumber,
    company,
    product,
    observation,
    quantity,
    done,
    status,
    operatorNotes,
    startDate,
  } = data;

  const onStart = () => {
    processService.startTask({ id })
    .then()
    .catch()
  }

  return (
    <Drawer 
      classes={{
        paper: classes.drawer,
      }}
      anchor="right" 
      open={Boolean(data)} 
      onClose={onCloseDrawer}>
        <div className={classes.container}>
          <div className={classes.info}>
            <div className={classes.header}>
              <div className={classes.name}>{name}</div>
              <div className={classes.batchNumber}>{batchNumber}</div>
            </div>
            <div className={classes.row}>
              <div className={classes.input}>{company}</div>
              <div className={classes.input}>{product}</div>
            </div>
            <div className={classes.row}>
              {observation && <div className={classes.input}>{observation}</div>}
              <div className={classes.input}>{`${done} completas de ${quantity}`}</div>
            </div>
            <div className={classes.row}>
              <Autocomplete 
                label="Estado" 
                id="status"
                options={optionsStatus} 
                defaultValue={{name: lookupstatus[status]}}
                // onChange={actions.handleInputChange}
                getOptionSelected={(option, value) => option.name === value.name}
                getOptionLabel={option => option.name}
                className={classes.input} 
                renderInput={(params) => (
                  <TextField {...params} label="Estado" name="status" />
                  )}
                />
              <TextField 
                className={classes.operatorNotes} 
                label="Agregar Notas del operador"
                name="operatorNotes"
                multiline
                defaultValue={operatorNotes}
                // onChange={actions.handleInputChange}
                />
                <Button className={classes.addNote}>Agregar nota</Button>
            </div>
          </div>
         
          <div className={classes.actionBtns}>
            {startDate 
            ? (
              <div className={classes.onWorkingBtns}>
                <div className={classes.row}>
                  <Button className={classes.doneHandlerBtn}>-</Button>
                  <TextField 
                    className={classes.doneRegister} 
                    name="doneRegister"
                    type="number"
                    defaultValue={done}
                    InputProps={{
                      classes: {
                        input: classes.resize,
                      },
                    }}
                    // onChange={actions.handleInputChange}
                    />
                  <Button className={classes.doneHandlerBtn}>+</Button>
                  <Button className={classes.allDoneBtn}>Todas</Button>
                </div>
                <div className={classes.row}>
                  <Button fullWidth className={classes.primary}>Registrar</Button>
                </div>
              </div>
            )
            : (
              <div className={classes.onWorkingBtns}>
                <Button onClick={onStart} className={classes.primary}>Iniciar Tarea</Button>
              </div>
            )}
          </div>

        </div>
    </Drawer>
  )
}

export default DetailProcess
