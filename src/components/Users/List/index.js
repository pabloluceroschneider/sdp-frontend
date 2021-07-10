import React from 'react';

import MaterialTable from 'material-table';

export default function UsersList({ 
  users,
  onClickRow,
}){
  return ( 
    <MaterialTable
      data={users}
      columns={[
        { title: 'Nombre Completo', field: 'fullname' },
        { title: 'Usuario', field: 'username' },
        { 
          title: 'Permisos', 
          field: 'permissions',
          editable: 'never',
          render: ({permissions}) => <span>{permissions.join(", ")}</span>
        },
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
