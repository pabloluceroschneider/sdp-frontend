import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import WorkOrdersTable from './WorkOrdersTable';
import Historial from './Historial';
import withSnackbar from 'HOCS/withSnackbar';

const content = {
  0: ({workorders, onClickRow}) => <WorkOrdersTable workorders={workorders} onClickRow={onClickRow} />,
  1: ({rowSelected, handleTabChange}) => <Historial task={rowSelected} handleTabChange={handleTabChange} />,
}

function WorkOrders({ workorders, updateList, toggleSnackbar }) {
  const [tabSelected, settabSelected] = React.useState(0);
  const [rowSelected, setrowSelected] = React.useState({});

  const handleTabChange = React.useCallback(
    (_, newValue) => {
      settabSelected(newValue);
      !newValue && setrowSelected({});
    },[]);

  const onClickRow = React.useCallback(
    (row) => {
      setrowSelected(row);
      handleTabChange(null, 1);
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
        <Tab label="Historial de Tarea" />
      </Tabs>
      <div style={{marginBottom: 160}}>
        {content[tabSelected]({
          workorders,
          handleTabChange,
          onClickRow,
          rowSelected,
        })}
      </div>
    </Paper>
  );
}

export default withSnackbar(WorkOrders)