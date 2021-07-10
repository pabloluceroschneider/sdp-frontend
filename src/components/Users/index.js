import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import List from './List';
import Gestor from './Gestor';
import Form from './Form';

const content = {
  0: props => <List {...props}/>,
  1: props => <Form {...props}/>,
  2: ({rowSelected}) => <Gestor {...rowSelected}/>,
}

export default function UsersTabs({ users, permissions, getData }) {
  const [tabSelected, settabSelected] = React.useState(0);
  const [rowSelected, setrowSelected] = React.useState(null);
  
  const handleTabChange = React.useCallback(
    (_, newValue, update) => {
      settabSelected(newValue);
      newValue < 2 && setrowSelected(null);
      !newValue && getData()
      update && getData()
    },[getData]);
  
  const onClickRow = React.useCallback(
    (row) => {
      setrowSelected(row);
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
        <Tab right label="Crear Usuario" />
        {rowSelected && <Tab label="Usuario y Tareas" />}
      </Tabs>
      <div style={{overflow: 'scroll'}}>
        {content[tabSelected]({
          users,
          permissions,
          handleTabChange,
          onClickRow,
          getData,
          rowSelected,
        })}
      </div>
    </Paper>
  );
}
