import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import List from './List';
import AdminTareas from './AdminTareas';

const content = {
  0: props => <List {...props}/>,
  1: ({rowSelected}) => <AdminTareas {...rowSelected}/>,
}

export default function UsersTabs({ users, getData }) {
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
        <Tab label="Usuarios" />
        <Tab label="Tareas" />
      </Tabs>
      <div style={{overflow: 'scroll', marginBottom: 160}}>
        {content[tabSelected]({
          users,
          handleTabChange,
          onClickRow,
          getData,
          rowSelected,
        })}
      </div>
    </Paper>
  );
}
