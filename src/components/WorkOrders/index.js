import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import WorkOrdersTable from './WorkOrdersTable';
import Form from './Form';
import Historial from './Historial';
import withSnackbar from 'HOCS/withSnackbar';

const content = {
  0: ({workorders, onClickRow}) => <WorkOrdersTable workorders={workorders} onClickRow={onClickRow} />,
  1: ({rowSelected, onHistorialClick, handleTabChange}) => <Form {...rowSelected} onHistorialClick={onHistorialClick} handleTabChange={handleTabChange} />,
  2: ({taskHistorialSelected, handleTabChange}) => <Historial task={taskHistorialSelected} handleTabChange={handleTabChange} />,
}

function WorkOrders({ workorders, updateList, toggleSnackbar }) {
  const [tabSelected, settabSelected] = React.useState(0);
  const [rowSelected, setrowSelected] = React.useState({});
  const [taskHistorialSelected, settaskHistorialSelected] = React.useState();
 
  const edit_new_label = {
    true: 'Editar',
    false: 'Nueva Orden de Trabajo',
  }

  const handleTabChange = React.useCallback(
    (_, newValue, snackbar) => {
      settabSelected(newValue);
      !newValue && setrowSelected({});
      !newValue && settaskHistorialSelected();
      snackbar && toggleSnackbar(snackbar)
      snackbar && updateList();
    },[updateList, toggleSnackbar]);

  const onClickRow = React.useCallback(
    (row) => {
      setrowSelected(row);
      handleTabChange(null, 1);
    },[handleTabChange]);
  
  const onHistorialClick = React.useCallback(
    (row) => {
      settaskHistorialSelected(row);
      handleTabChange(null, 2);
    },[handleTabChange]);

  return (
    <Paper square>
      <Tabs
        value={tabSelected}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleTabChange}
        aria-label="Tabs de Ordenes de Trabajo"
      >
        <Tab label="Listado" />
        <Tab label={edit_new_label[Boolean(rowSelected._id)]}/>
        {taskHistorialSelected && <Tab label="Historial de Tarea" />}
      </Tabs>
      <div style={{marginBottom: 160}}>
        {content[tabSelected]({
          workorders,
          handleTabChange,
          onClickRow,
          onHistorialClick,
          rowSelected,
          taskHistorialSelected,
        })}
      </div>
    </Paper>
  );
}

export default withSnackbar(WorkOrders)