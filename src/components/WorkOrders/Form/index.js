// dependencies
import React from 'react'
import { useSelector } from 'react-redux'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Alert from '@material-ui/lab/Alert';

// services
import workOrderService from 'services/workOrderService';

// project components
import ButtonsToolbarForm from 'components/ButtonsToolbarForm';
import TasksTable from '../TasksTable';
import withTranslation from 'HOCS/withTranslation';
import useFormValues from './useFormValues';

// styles
import styles from "assets/jss/workorders/form.js";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(styles);

/**
 * Component
 */
function Form({ 
    handleTabChange,
    _id: id,
    t,
    ...formInitValues
}) {
  const classes = useStyles();
  const optionsStatus = useSelector(state => state.appData.status)
  const lookupstatus = useSelector(state => state.appData.lookupstatus);
  const companies = useSelector(state => state.appData.companies);
  const optionscompanies = useSelector(state => state.appData.optionscompanies);
  const optionsproducts = useSelector(state => state.appData.optionsproducts);
  const optionsbaseplans = useSelector(state => state.appData.optionsbaseplans);
  const { 
    actions,
    allTasks: tasks,
    warnings,
    updateTasks,
    ...form
  } = useFormValues({ id, ...formInitValues });

  // <!---- SAVE SUBMIT  ------->
  const handleSave = () => {
    const saveOrUpdate = new Promise( async (res, _) => {
      const response = id 
        ? await workOrderService.update({ id, workorder: form, tasks })
        : await workOrderService.create({ workorder: form, tasks })
      res(response);
    })
    saveOrUpdate
      .then(({ response, error }) =>  
        error
          ? handleTabChange(null, 1, {severity: 'error', message: response }) 
          : handleTabChange(null, 0, {severity: 'success', message: 'Orden de trabajo guardada.', duration: 6000 }) 
      );
  }
  const confirmDeleteWorkOrder = async () => {
    await workOrderService.delete({ id });
    handleTabChange(null, 0, { severity: 'success', message: 'Orden de trabajo eliminada', duration: 6000 });
  }

  // <!------- RENDER  ---------->
  return (
    <div className={classes.container}>
      <form className={classes.form}>
        <div className={classes.row}>

          <Autocomplete 
            label="Cliente" 
            id="company"
            options={companies} 
            defaultValue={optionscompanies[formInitValues.product?.companyId]}
            onChange={actions.handleAutocompleteChange}
            disabled={Boolean(id)}
            getOptionSelected={(option, value) => option.name === value.name}
			      getOptionLabel={option => option && option.name}
            className={classes.company} 
            renderInput={(params) => (
              <TextField {...params} label="Cliente" name="company" />
              )}
          />

          <Autocomplete 
            label="Producto" 
            id="product"
            options={(optionsproducts && optionsproducts[form.company?._id]) || []} 
            defaultValue={{name: formInitValues.product?.name}}
            onChange={actions.handleAutocompleteChange}
            disabled={Boolean(id)}
            getOptionSelected={(option, value) => option.name === value.name}
			      getOptionLabel={option => option.name}
            className={classes.product} 
            renderInput={(params) => (
              <TextField {...params} label="Producto" name="product" />
              )}
          />

          {id 
          ? <TextField 
              className={classes.planName} 
              label="Plano"
              name="basePlan"
              defaultValue={formInitValues.basePlan}
              disabled={Boolean(id)}
              />
          : <Autocomplete 
              label="Plano" 
              id="basePlan"
              options={(optionsbaseplans && optionsbaseplans[form.product?._id]) || []} 
              onChange={actions.handleAutocompleteChange}
              disabled={Boolean(id)}
              getOptionSelected={(option, value) => option.name === value.name}
              getOptionLabel={option => option.name}
              className={classes.planName} 
              renderInput={(params) => (
                <TextField {...params} label="Plano" name="basePlan" />
                )}
              />
          }

        </div>
        <div className={classes.row}>
          <TextField 
            className={classes.quantity} 
            label="Cantidad"
            type="number"
            name="quantity"
            disabled={Boolean(id)}
            defaultValue={formInitValues.quantity}
            onChange={actions.handleInputChange}
            />

          <TextField 
            className={classes.purchaseOrder} 
            multiline
            label="Orden de compra"
            name="purchaseOrder"
            defaultValue={formInitValues.purchaseOrder}
            onChange={actions.handleInputChange}
            />
          
          <TextField 
            className={classes.date} 
            label={form.deliveryDate && "Fecha de entrega"}
            helperText={!form.deliveryDate && "Ingrese fecha de entrega"}
            name="deliveryDate"
            type="datetime-local"
            defaultValue={
              id && 
              formInitValues.deliveryDate && 
              new Date(formInitValues.deliveryDate).toISOString().slice(0,16)
            }
            onChange={actions.handleInputChange}
            />

          {id && <TextField 
            className={classes.date} 
            label="Fecha de creación"
            name="creationDate"
            type="datetime-local"
            defaultValue={new Date(formInitValues.creationDate).toISOString().slice(0,16)}
            disabled
            />}

        </div>
        <div className={classes.row}>
          <TextField 
            className={classes.observation} 
            multiline
            label="Observación"
            name="observation"
            defaultValue={formInitValues.observation}
            onChange={actions.handleInputChange}
            />
          {id && 
            <Autocomplete 
              label="Estado" 
              id="status"
              options={optionsStatus} 
              defaultValue={{name: lookupstatus[formInitValues.status]}}
              onChange={actions.handleAutocompleteChange}
              getOptionSelected={(option, value) => option.id === value.name}
              getOptionLabel={option => option.name}
              className={classes.status} 
              renderInput={(params) => (
                <TextField {...params} label="Estado" name="status" />
                )}
            />}

        </div>

        {warnings?.map( (w) => (
          <div key={w.text} className={classes.warnings}>
            <Alert severity="warning" className={classes.alert}>
              <span>{w.text}</span>
            </Alert>
            <span className={classes.detail}>{w.detail}</span>
          </div>
        ))}

        <TasksTable 
            data={tasks} 
            quantity={form.quantity} 
            updateTasks={updateTasks}
            {...actions}
            />
      </form>
      <ButtonsToolbarForm
        onSubmit={handleSave}
        onCancel={() => handleTabChange(null, 0)}
        onRemove={confirmDeleteWorkOrder}
        labels={{
          confirm: 'confirmar',
          cancel: 'cancelar',
          remove: Boolean(id) ? 'eliminar': null,
          removeWarning: '¿Desea eliminar la orden de trabajo?',
          removeCancel: 'cancelar',
          removeConfirm: 'confirmar'
        }}
       />
     
    </div>
  )
}

export default withTranslation(Form)
