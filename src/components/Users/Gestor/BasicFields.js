import React, { useCallback, useReducer } from 'react'
import TextField from '@material-ui/core/TextField';
// icons
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';

import Select from './Select';



import styles from 'assets/jss/users/basic_fields'
import { makeStyles } from "@material-ui/core/styles";
import usersService from 'services/usersService';
const useStyles = makeStyles(styles);

function reducer(state, action){
  console.log(`action`, action)
  const configActions = {

    SET_INPUT: () => ({
      ...state,
      [action.payload.field]: action.payload.value
    }),

    TOGGLE_EDIT_MODE: () => ({
      ...state,
      editMode: !state.editMode
    }),

    SET_PERMISSIONS: () => ({
      ...state,
      permissions: action.payload
    }),

  }
  return configActions[action.type]() || state;
}

const useGestorState = (initValues) => {
  const [state, dispatch] = useReducer(reducer, {...initValues, editMode: false})

  const toggleEditMode = useCallback(() => dispatch({ type: 'TOGGLE_EDIT_MODE' }),[])
  
  const onPermissionsUpdate = useCallback((payload) => dispatch({ 
    type: 'SET_PERMISSIONS',
    payload
  }),[])

  const onInputChange = useCallback((event) => {
    const field = event.target.name
    const value = event.target.value;
    const payload = { field, value };
    return dispatch({ type: 'SET_INPUT', payload })
  },[])

  const onSaveFields = useCallback( (state) => async () => {
    const { id, fullname, username, permissions } = state;
    await usersService.update({ id, fullname, username, permissions });
    toggleEditMode();
  },[toggleEditMode])

  const actions = {
    toggleEditMode,
    onInputChange,
    onPermissionsUpdate,
    onSaveFields,
  }

  return { state, actions }
}

const BasicFields = ({ _id: id, fullname, username, permissions}) => {
  const classes = useStyles();
  const { state , actions } = useGestorState({fullname, username, permissions});
  const { editMode } = state;
  return (
    <div className={classes.section}>
      <TextField 
        className={classes.field}
        label="Nombre Completo"
        name="fullname"
        onChange={actions.onInputChange}
        defaultValue={fullname}
        disabled={!editMode}
        />
      <TextField 
        className={classes.username}
        label="Nombre de usuario"
        name="username"
        defaultValue={username}
        disabled={true}
        />
      <Select
        label="Permisos"
        options={["Administrador","Operario","Lectura","Escritura"]}
        checked={state.permissions}
        handleChange={actions.onPermissionsUpdate}
        disabled={!editMode}
        className={classes.field}
      />
      <IconButton
        aria-label="Toggle password visibility"
        className={classes.icons}
      >
        {editMode 
          ? <SaveIcon onClick={actions.onSaveFields({id, ...state})}/>
          : <EditIcon onClick={actions.toggleEditMode} />}
      </IconButton>
    </div>
  )
}

export default BasicFields
