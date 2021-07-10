import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FormCreateProduct from './FormCreateProduct';
import List from './List';

const content = {
  0: props => <List {...props}/>,
  1: props => <FormCreateProduct {...props}/>,
}

export default function CompaniesTabs({ products, updateData }) {
  const [tabSelected, settabSelected] = React.useState(0);

  const handleTabChange = React.useCallback(
    (_, newValue, update) => {
      settabSelected(newValue);
      !newValue && updateData();
    }
    ,[updateData]);

  return (
    <Paper square>
      <Tabs
        value={tabSelected}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleTabChange}
        aria-label="Tabs de Productos"
      >
        <Tab label="Listado" />
        <Tab label="Crear Producto" />
      </Tabs>
      <div>
        {content[tabSelected]({
          products,
          handleTabChange,
          updateData,
        })}
      </div>
    </Paper>
  );
}
