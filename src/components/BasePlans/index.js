import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import BasePlansTable from 'components/BasePlans/BasePlansTable';
import Form from 'components/BasePlans/Form';
import Historial from 'components/BasePlans/Historial';

const content = {
  0: props => <BasePlansTable {...props}/>,
  1: props => <Form {...props}/>,
  2: props => <Historial {...props}/>,
}

export default function UsersTabs({ data, updateData }) {
  const [tabSelected, settabSelected] = React.useState(0);
  const [rowSelected, setrowSelected] = React.useState({});
  const [historialSelected, sethistorialSelected] = React.useState();
  const edit_new_label = {
    true: 'Editar Plano',
    false: 'Crear Plano',
  }

  const handleTabChange = React.useCallback(
    (_, newValue, update) => {
      settabSelected(newValue);
      !newValue && setrowSelected({});
      newValue !== 2 && sethistorialSelected();
      update && updateData();
    },[updateData]);
  
  const onHistorialClick = React.useCallback(
    (row) => {
      sethistorialSelected(row);
      handleTabChange(null, 2);
    },[handleTabChange]);
  
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
        <Tab label={edit_new_label[Boolean(rowSelected._id)]} />
        {historialSelected && <Tab label="Historial" />}
      </Tabs>
      <div>
        {content[tabSelected]({
          data,
          rowSelected,
          historialSelected,
          handleTabChange,
          onClickRow,
          onHistorialClick,
        })}
      </div>
    </Paper>
  );
}
