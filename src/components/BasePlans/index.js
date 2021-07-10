import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import BasePlansTable from 'components/BasePlans/BasePlansTable';
import Form from 'components/BasePlans/Form';

const content = {
  0: props => <BasePlansTable {...props}/>,
  1: props => <Form {...props}/>,
  2: props => <div>{JSON.stringify(props, null, 2)}</div>,
}

export default function UsersTabs({ data, updateData }) {
  const [tabSelected, settabSelected] = React.useState(0);
  const [rowSelected, setrowSelected] = React.useState({});
  const edit_new_label = {
    true: 'Editar Plano',
    false: 'Crear Plano',
  }

  const handleTabChange = React.useCallback(
    (_, newValue, update) => {
      settabSelected(newValue);
      !newValue && setrowSelected({});
      update && updateData();
    },[updateData]);
  
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
      </Tabs>
      <div>
        {content[tabSelected]({
          data,
          rowSelected,
          handleTabChange,
          onClickRow,
        })}
      </div>
    </Paper>
  );
}
