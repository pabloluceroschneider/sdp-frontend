import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import MaterialTable from 'material-table';
import { get, validateObject, InfoError } from 'helpers/tableHelpers';
import configWoTable from './config_wo_table'

function WorkOrdersTable({ workorders, onClickRow }) {
  const [filtering, setfiltering] = useState(false);
  const lookupcompanies = useSelector(state => state.appData.lookupcompanies);
  const lookupstatus = useSelector(state => state.appData.lookupstatus);
  const optionscompanies = useSelector(state => state.appData.optionscompanies);

  if (!validateObject(lookupcompanies)) return <InfoError value="Empresas" />

  return (
    <MaterialTable
      columns={[
        { title: 'Nº Orden', field: 'batchNumber' },
        { 
          title: 'Cliente', 
          field: 'product', 
          lookup: lookupcompanies,
          customFilterAndSearch: (term, rowData) => {
            var re = new RegExp(term, "g");
            return re.test(optionscompanies[rowData.product?.companyId].name)
          },
          render: ({product}) => get(optionscompanies[product?.companyId], 'name'), 
        },
        { 
          title: 'Producto', 
          field: 'product',
          render: ({product}) => product?.name, 
        },
        { title: 'Plano', field: 'basePlan' },
        { title: 'Estado', field: 'status', lookup: lookupstatus },
        { title: 'Cantidad', field: 'quantity' },
        { title: 'Fecha de Alta', field: 'creationDate', render: ({creationDate}) => new Date(creationDate).toLocaleDateString()},
      ]}
      isLoading={!Boolean(workorders)}
      data={workorders}
      onRowClick={(_, rowData) => onClickRow(rowData)}
      options={{
        showTitle: false,
        pageSize: 10,
        padding: 'dense',
        columnsButton: true,
        filtering: filtering,
        rowStyle: rowData => ({
          backgroundColor: rowData.tableData.id % 2 === 0 ? '#fcfcfc' : 'white'
        })
      }}
      actions={[
        {
          icon: 'filter_list',
          tooltip: 'Filtrar',
          isFreeAction: true,
          onClick: () => setfiltering(!filtering)
        },
      ]}
      {...configWoTable}
    />
  )
}


export default WorkOrdersTable;
