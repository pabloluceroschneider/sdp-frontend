import React from 'react'
// redux 
import { useSelector } from 'react-redux';

// services
// import basePlanService from 'services/basePlanService';

// dependencies
import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
// import Alert from '@material-ui/lab/Alert';

// project components
import ButtonsToolbarForm from 'components/ButtonsToolbarForm';

// import TasksTable from 'components/BasePlans/TasksTable';
import withTranslation from 'HOCS/withTranslation';
// import { validateObject, InfoError } from 'helpers/tableHelpers';
// import sumTasksTimes from 'helpers/sumTasksTimes';


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
    handleAutocompleteChange,
}) {
  const classes = useStyles();
  const companies = useSelector(state => state.appData.companies);

  
  // <!------  States  -------->
  const [form] = React.useState({
    ...row,
    loadingBtn: false,
    error: '',
    confirm: false,
  });


  const confirmDeleteWorkOrder = () => {};
  const handleSave = () => {};

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
