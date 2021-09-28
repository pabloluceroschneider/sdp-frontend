import React from 'react';

import MaterialTable from 'material-table';
import HistoryIcon from '@material-ui/icons/History';

function TasksTable({ 
  data,
  onRowAdd,
  onRowUpdate,
  onRowDelete,
  onHistorialClick,
}){

  return ( 
    <MaterialTable
      data={data}
      columns={[
        { title: 'Nombre', field: 'name' },
        { title: 'Observación', field: 'observation' },
        { title: 'Duración estimada', field: 'estimate', render: ({estimate}) => estimate ? `${estimate} mins` : null },
        { title: 'Duración calculada', field: 'estimate', editable: 'never', render: ({calculated}) => calculated ? `${calculated} mins` : null },
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
      actions={[
        {
          icon: HistoryIcon,
          tooltip: 'Ver Historial',
          onClick: (_, rowData) => onHistorialClick(rowData),
        }
      ]}
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
