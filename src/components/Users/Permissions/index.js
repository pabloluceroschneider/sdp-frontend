import React from 'react';

import MaterialTable from 'material-table';
import Select from 'components/Users/Permissions/Select';
import usersService from 'services/usersService';

export default function UsersList({ 
  users,
  permissions,
  getData,
}){
  return ( 
    <MaterialTable
      data={users}
      columns={[
        { title: 'Nombre', field: 'username' },
        { 
          title: 'Permisos', 
          field: 'permissions',
          editable: 'never',
          render: (rowData) => (
            <Select id={rowData.id} options={permissions} checked={rowData.permissions} getData={getData}/>
          )
        },
      ]}
      options={{
        actionsColumnIndex: 2,
        paging: false,
        showTitle: false,
        rowStyle: rowData => ({ 
          backgroundColor: rowData.tableData.id % 2 === 0 ? '#fcfcfc' : 'white' 
        }),
      }}
      style={{
        boxShadow: 'none',
      }}
      editable={{
        onRowDelete: oldData =>
          new Promise((resolve, reject) => {
            usersService.delete({ id: oldData._id })
            getData()
            setTimeout(resolve, 1000)
          }),
      }}
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
