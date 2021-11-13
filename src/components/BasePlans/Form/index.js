import React from 'react'
// redux 
// import { useSelector } from 'react-redux';

// services
// import basePlanService from 'services/basePlanService';

// dependencies
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
// import Autocomplete from '@material-ui/lab/Autocomplete';
// import Alert from '@material-ui/lab/Alert';

// project components
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
    rowSelected,
}) {
  const classes = useStyles();
  
  const {
    _id: id,
    company,
    product,
    name,
    tasks,
  } = rowSelected;

  // <!------  States  -------->
  const [form] = React.useState({
    _id: id,
    name,
    company,
    product,
    tasks,
    loadingBtn: false,
    error: '',
    confirm: false,
  });


  // conditional render

  return (
    <div className={classes.container}>
      {JSON.stringify(form, null, 2)}
    </div>
  )
}

export default withTranslation(Form)
