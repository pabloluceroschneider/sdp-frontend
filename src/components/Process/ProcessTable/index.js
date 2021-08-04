import React from 'react';

import MaterialTable from 'material-table';

function ProcessTable({ 
  data,
  onRowClick
}){
  return ( 
    <MaterialTable
      data={data}
      isLoading={!Boolean(data)}
      columns={[
        { title: 'Nº Orden', field: 'batchNumber' },
        { title: 'Empresa', field: 'company' },
        { title: 'Producto', field: 'product' },
        { title: 'Tarea', field: 'name' },
        { title: 'Completados', render: ({ done, quantity }) => `${done} de ${quantity}`},
        { title: 'Estado', field: 'status' },
      ]}
      onRowClick={onRowClick}
      options={{
        paging: false,
        showTitle: false,
        search: false,
        padding: 'dense',
        rowStyle: rowData => ({ 
          backgroundColor: rowData.tableData.id % 2 === 0 ? '#fcfcfc' : 'white' 
        }),
      }}
    />
  )
}


export default ProcessTable;
