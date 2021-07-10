import React from 'react';

import MaterialTable from 'material-table';

function TasksTable({ 
  data,
  onRowAdd,
  onRowUpdate,
  onRowDelete,
}){

  return ( 
    <MaterialTable
      data={data}
      columns={[
        { title: 'Nombre', field: 'name' },
        { title: 'Observación', field: 'observation' },
      ]}
      options={{
        actionsColumnIndex: 5,
        paging: false,
        search: false,
        showTitle: false,
        rowStyle: rowData => ({ 
          backgroundColor: rowData.tableData.id % 2 === 0 ? '#fcfcfc' : 'white' 
        }),
      }}
      style={{
        boxShadow: 'none',
      }}
      editable={{
        onRowAdd: onRowAdd,
        onRowUpdate: onRowUpdate,
        onRowDelete: onRowDelete,
      }}
      localization={{
        body: {
          emptyDataSourceMessage: 'No hay Tareas',
          editRow: {
            saveTooltip: 'Confirmar',
            cancelTooltip: 'Cancelar',
            deleteText: '¿Desea eliminar Tarea?'
          },
          editTooltip: 'Editar',
          deleteTooltip: 'Eliminar Tarea',
          addTooltip: 'Nueva Tarea'
        },
        header: {
          actions: 'Acciones'
        },
      }}
    />
  )
}


export default TasksTable;
