import React from 'react';
import { useSelector } from 'react-redux'
import MaterialTable from 'material-table';
import { validateObject, InfoError } from 'helpers/tableHelpers';
import configWoTable from './config_wo_table'

function WorkOrdersTable({ workorders, onClickRow }) {
  const lookupcompanies = useSelector(state => state.appData.lookupcompanies);
  const lookupstatus = useSelector(state => state.appData.lookupstatus);

  if (!validateObject(lookupcompanies)) return <InfoError value="Empresas" />

  return (
    <MaterialTable
      columns={[
        { 
          title: 'Última Modificación', 
          field: 'updateDate', 
          render: ({updateDate}) => updateDate ? new Date(updateDate).toLocaleDateString() : null,
          customFilterAndSearch: (term, rowData) => {
            var re = new RegExp(term, "g");
            return re.test(new Date(rowData.updateDate).toLocaleDateString())
          },
        },
        { title: 'Nombre', field: 'name'},
        { title: 'Responsable', field: 'assignedTo'},
        { title: 'Completas', field: 'done' },
        { title: 'Cantidad', field: 'quantity' },
        { title: 'Duración (c/u)', field: 'duration' },
        { title: 'Estado', field: 'status', lookup: lookupstatus, render: ({status}) => lookupstatus[status]},
      ]}
      isLoading={!Boolean(workorders)}
      data={workorders}
      onRowClick={(_, rowData) => onClickRow(rowData)}
      options={{
        showTitle: false,
        padding: 'dense',
        paging: false,
        columnsButton: true,
        filtering: true,
        rowStyle: rowData => ({
          backgroundColor: rowData.tableData.id % 2 === 0 ? '#fcfcfc' : 'white'
        })
      }}
      {...configWoTable}
    />
  )
}


export default WorkOrdersTable;
