import React, { useCallback } from 'react'
// redux 
import { useSelector } from 'react-redux';

// services
import basePlanService from 'services/basePlanService';

// dependencies
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Alert from '@material-ui/lab/Alert';

// project components
import ButtonsToolbarForm from 'components/ButtonsToolbarForm';
import TasksTable from 'components/BasePlans/TasksTable';
import withTranslation from 'HOCS/withTranslation';
import { validateObject, InfoError } from 'helpers/tableHelpers';
import sumTasksTimes from 'helpers/sumTasksTimes';


// styles
import styles from "assets/jss/baseplans/form.js";
import { makeStyles } from "@material-ui/core/styles";

// helpers
const useStyles = makeStyles(styles);

/**
 * Component
 */
function Form({ 
    handleTabChange,
    rowSelected: row,
    onHistorialClick,
}) {
  const classes = useStyles();
  const companies = useSelector(state => state.appData.companies);
  const optionsproducts = useSelector(state => state.appData.optionsproducts);

  
  // <!------  States  -------->
  const [form, setform] = React.useState({
    ...row,
    loadingBtn: false,
    error: '',
    confirm: false,
  });

  const { totalEstimated, totalCalculated } = sumTasksTimes({tasks: row.tasks});

  // <!---------- tasks ----------------->
  const onRowAdd = useCallback( newData => {
    return new Promise((resolve, _) => {
      const tasks = Array.from(form.tasks || []);
      setform( f => ({
        ...f,
        tasks : [...tasks, newData ]
      }))
      resolve()
    })},[form.tasks]);
  const onRowUpdate = useCallback( (newData, oldData) => 
    new Promise((resolve, _) => {
      const tasks = Array.from(form.tasks);
      tasks.splice( oldData.tableData.id, 1, newData)
      setform( f => ({
        ...f,
        tasks,
      }))
      resolve()
    }),[form.tasks]);
  const onRowDelete = useCallback((newData, oldData) =>
    new Promise((resolve, _) => {
      const tasks = Array.from(form.tasks);
      tasks.splice(newData.id, 1)
      setform( f => ({
        ...f,
        tasks,
      }))
      resolve()
    }),[form.tasks]);
  // <!---------- /tasks ----------------->

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


  // <!---------- actions ---------------->
  const confirmDeleteWorkOrder = async () => {
    await basePlanService.delete(row._id);
    handleTabChange(null, 0, true);
  };
  const handleSave = () => {
    const promiseUpsert = new Promise( async (res, rej) => {
      const response = row._id 
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

  // conditional render
  if (!validateObject(optionsproducts)) return <InfoError value="Productos"/>

  return (
    <div className={classes.container}>
      <div className={classes.form}>
        <div className={classes.row}>
          <Autocomplete 
            className={classes.company} 
            options={companies} 
            disabled={Boolean(row._id)}
            defaultValue={row.company} 
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
            disabled={Boolean(row._id)}
            defaultValue={{name: row.product?.name}} 
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
            defaultValue={row.name}
            onChange={handleInputChange}
            />
        </div>

        <TasksTable 
          data={form.tasks} 
          onRowAdd={onRowAdd}
          onRowUpdate={onRowUpdate}
          onRowDelete={onRowDelete}
          onHistorialClick={onHistorialClick}
          />

        {form.tasks && (
          <div className={classes.totalTimes}>
            <Alert severity="info" className={classes.alert}>
              {`Duración estimada total: ${totalEstimated} minutos`}
            </Alert>
            <Alert severity="info"className={classes.alert} >
              {`Duración calculada total: ${totalCalculated} minutos`}
            </Alert>
          </div>
        )}

      <ButtonsToolbarForm
        onSubmit={handleSave}
        onCancel={() => handleTabChange(null, 0)}
        onRemove={confirmDeleteWorkOrder}
        labels={{
          confirm: 'confirmar',
          cancel: 'cancelar',
          remove: Boolean(row._id) ? 'eliminar': null,
          removeWarning: '¿Desea eliminar la orden de trabajo?',
          removeCancel: 'cancelar',
          removeConfirm: 'confirmar'
        }}
       />
      </div>
    </div>
  )
}

export default withTranslation(Form)
