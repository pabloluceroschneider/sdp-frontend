import React, { useState, useEffect } from 'react';

import MaterialTable from 'material-table';
import tasksService from 'services/tasksService';

function TasksTable({ 
  historialSelected,
}){
  const [data, setData] = useState();

  useEffect(() => {
    if (!historialSelected) return;
    tasksService.record({ name: historialSelected.name })
      .then( ({response}) => setData(response))
  },[historialSelected])


  return ( 
    <MaterialTable
      data={data}
      columns={[
        { title: 'Nombre', field: 'name' },
        { title: 'Responsable', field: 'assignedTo' },
        { title: 'Duración (Por Unidad)', field: 'duration', editable: 'never', render: ({duration}) => duration ? `${duration} mins` : null },
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
