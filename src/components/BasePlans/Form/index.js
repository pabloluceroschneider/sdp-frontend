import React, { useCallback } from 'react'
// redux 
import { useSelector } from 'react-redux';

// services
import basePlanService from 'services/basePlanService';

// dependencies
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Alert from '@material-ui/lab/Alert';

// project components
import TasksTable from 'components/BasePlans/TasksTable';
import withTranslation from 'HOCS/withTranslation';
import { validateObject, InfoError } from 'helpers/tableHelpers';


// styles
import styles from "assets/jss/baseplans/form.js";
import { makeStyles } from "@material-ui/core/styles";

// helpers
const useStyles = makeStyles(styles);

/**
 * Component
 */
function Form({ 
    rowSelected,
    handleTabChange,
    t,
}) {
  const classes = useStyles();
  const companies = useSelector(state => state.appData.companies);
  const optionsproducts = useSelector(state => state.appData.optionsproducts);
  
  const {
    _id: id,
    company,
    product,
    name,
    tasks,
  } = rowSelected;

  // <!------  States  -------->
  const [form, setform] = React.useState({
    _id: id,
    name,
    company,
    product,
    tasks,
    loadingBtn: false,
    error: '',
    confirm: false,
  });


  // <!------ HANDLERS  -------->
  const handleAutocompleteChange = (event, value) => {
    const id = event.target.id.split("-")[0];
    setform({
      ...form,
      [id] : value
    })
  }
  const handleInputChange = event => {
    const id = event.target.name
    const value = event.target.value;
    setform({
      ...form,
      [id] : value
    })
  };

  // <!---------- tasks ----------------->
  const onRowAdd = useCallback( newData => 
    new Promise((resolve, _) => {
      const tasks = Array.from(form.tasks || []);
      setform( f => ({
        ...f,
        tasks : [...tasks, newData ]
      }))
      setTimeout(resolve, 400)
    }),[form.tasks]);
  const onRowUpdate = useCallback( (newData, oldData) => 
    new Promise((resolve, _) => {
      const tasks = Array.from(form.tasks);
      tasks.splice( oldData.tableData.id, 1, newData)
      setform( f => ({
        ...f,
        tasks,
      }))
      setTimeout(resolve, 100)
    }),[form.tasks]);
  const onRowDelete = useCallback((newData, oldData) =>
    new Promise((resolve, _) => {
      const tasks = Array.from(form.tasks);
      tasks.splice(newData.id, 1)
      setform( f => ({
        ...f,
        tasks,
      }))
      setTimeout(resolve, 400)
    }),[form.tasks]);
  // <!---------- /tasks ----------------->


  // <!---------- actions ---------------->
  const handleSave = () => {
    const promiseUpsert = new Promise( async (res, rej) => {
      const response = id 
        ? await basePlanService.update(form)
        : await basePlanService.create(form)
      res(response)
    })
    promiseUpsert.then( ({ response, error }) => {
      error 
        ? setform( f => ({...f, error: response }))
        : handleTabChange(null, 0, true)
    })
  }
  const handleDeleteBtn = () => {
    setform({ ...form, error: '', confirm: true, })
  }
  const confirmDelete = async () => {
    await basePlanService.delete(id);
    handleTabChange(null, 0, true);
  }
  // <!---------- /actions --------------->

  // conditional render
  if (!validateObject(optionsproducts)) return <InfoError value="Productos"/>

  return (
    <div className={classes.container}>
      <form className={classes.form}>
        <div className={classes.row}>
          <Autocomplete 
            className={classes.company} 
            options={companies} 
            disabled={Boolean(id)}
            defaultValue={company} 
            value={form.company}
            getOptionSelected={(option, value) => option.name === value.name}
			      getOptionLabel={option => option.name}
            label="Cliente" 
            id="company"
            onChange={handleAutocompleteChange}
            renderInput={(params) => (
              <TextField {...params} label="Cliente" name="company" />
              )}
          />
        </div>
        <div className={classes.row}>
          <Autocomplete 
            label="Producto" 
            id="product"
            options={optionsproducts[form.company?._id] || []} 
            value={form.product}
            disabled={Boolean(id)}
            defaultValue={{name: product?.name}} 
            onChange={handleAutocompleteChange}
            getOptionSelected={(option, value) => option.name === value.name}
			      getOptionLabel={option => option.name}
            className={classes.product} 
            renderInput={(params) => (
              <TextField {...params} label="Producto" name="product" />
              )}
          />
        </div>
        <div className={classes.row}>
          <TextField 
            className={classes.planName} 
            label="Plano"
            name="name"
            defaultValue={name}
            onChange={handleInputChange}
            />
        </div>

        <TasksTable 
          data={form.tasks} 
          onRowAdd={onRowAdd}
          onRowUpdate={onRowUpdate}
          onRowDelete={onRowDelete}
          />

      </form>

      <div className={classes.buttonsRow}>
        <div className={classes.leftBtn}>
          {id && !form.confirm && (
          <Button onClick={handleDeleteBtn} color="secondary" className={classes.removeBtn}>
            Eliminar
          </Button>)}
          {form.confirm && (
          <Alert severity="error" className={classes.alert} action={
            <>
            <Button onClick={() => setform({...form, confirm: false})} color="inherit" size="small">
              CANCELAR
            </Button>
            <Button onClick={confirmDelete} color="secondary" size="small">
              CONFIRMAR
            </Button>
            </>
          }>
            {`¿Desea eliminar el plano "${form.name}"?`}
          </Alert>
        )}
        </div>
        <div className={classes.rightBtn}>
          <span className={classes.error}>{t(form.error, "Sin asignar")}</span>
          <Button onClick={() => handleTabChange(null, 0)} className={classes.cancelBtn}>
            Cancelar
          </Button>
          <Button disabled={!Boolean(
            form.company &&
            form.product &&
            form.name &&
            form.tasks?.length
            )} onClick={handleSave} variant="contained" color="primary" className={classes.confirmBtn}>
            Guardar
          </Button>
        </div>
      </div>
     
    </div>
  )
}

export default withTranslation(Form)
