import React from 'react';

import MaterialTable from 'material-table';
import BallotIcon from '@material-ui/icons/Ballot';

export default function UsersList({ 
  users,
  onClickRow,
  onSeeTasks,
}){
  return ( 
    <MaterialTable
      data={users}
      isLoading={!Boolean(users)}
      columns={[
        { title: 'Nombre Completo', field: 'fullname' },
        { title: 'Usuario', field: 'username' },
      ]}
      options={{
        actionsColumnIndex: 3,
        paging: false,
        showTitle: false,
        rowStyle: rowData => ({ 
          backgroundColor: rowData.tableData.id % 2 === 0 ? '#fcfcfc' : 'white' 
        }),
      }}
      style={{
        boxShadow: 'none',
      }}
      onRowClick={(_, rowData) => onClickRow(rowData)}
      localization={{
        body: {
          emptyDataSourceMessage: 'No hay Usuarios',
          editRow: {
            saveTooltip: 'Confirmar',
            cancelTooltip: 'Cancelar',
            deleteText: '¿Desea eliminar Usuario?'
          },
          deleteTooltip: 'Eliminar Usuario',
        },
        header: {
          actions: 'Acciones'
        },
      }}
    />
  )
}
