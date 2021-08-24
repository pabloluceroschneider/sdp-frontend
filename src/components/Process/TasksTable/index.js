import React from 'react';
import { useSelector } from 'react-redux';

import MaterialTable from 'material-table';

function ProcessTable({ 
  onRowClick
}){
	const process = useSelector(state => state.process.data);
  const lookupstatus = useSelector(state => state.appData.lookupstatus);

  return ( 
    <MaterialTable
      data={process}
      isLoading={!Boolean(process)}
      columns={[
        { title: 'Nº Orden', field: 'batchNumber' },
        { title: 'Empresa', field: 'company' },
        { title: 'Producto', field: 'product' },
        { title: 'Tarea', field: 'name' },
        { title: 'Completados', render: ({ done, quantity }) => `${done} de ${quantity}`},
        { title: 'Estado', field: 'status', lookup: lookupstatus },
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
