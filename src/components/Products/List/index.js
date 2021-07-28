import React, { useState } from 'react';
import { useSelector } from 'react-redux'

import MaterialTable from 'material-table';

import { get, validateObject, InfoError } from 'helpers/tableHelpers';
import configTasksTable from './config_tasks_table';
import productService from 'services/productService';

function TasksTable({ 
  products,
  updateData,
}){
  const optionscompanies = useSelector(state => state.appData.optionscompanies)
  const lookupcompanies = useSelector(state => state.appData.lookupcompanies)
  const [filtering, setfiltering] = useState(false);

  if (!validateObject(optionscompanies)) return <InfoError value="Empresas" />

  return ( 
    <MaterialTable
      data={products}
      isLoading={!Boolean(products)}
      columns={[
        { title: 'Producto', field: 'name'},
        { 
          title: 'Empresa', 
          field: 'companyId', 
          render: ({companyId}) => get(optionscompanies[companyId], 'name'),
          lookup: lookupcompanies,
          editable: 'never',
          customFilterAndSearch: (term, rowData) => {
            var re = new RegExp(term, "g");
            return re.test(optionscompanies[rowData.companyId].name)
          },
        },
      ]}
      options={{
        actionsColumnIndex: 5,
        paging: false,
        showTitle: false,
        filtering: filtering,
        search: false,
        rowStyle: rowData => ({ 
          backgroundColor: rowData.tableData.id % 2 === 0 ? '#fcfcfc' : 'white' 
        }),
      }}
      actions={[
        {
          icon: 'filter_list',
          tooltip: 'Filtrar',
          isFreeAction: true,
          onClick: () => setfiltering(!filtering)
        },
      ]}
      editable={{
        onRowUpdate: newData =>
          new Promise( async (resolve, reject) => {
            try {
              await productService.update(newData)
              updateData();
              setTimeout(resolve, 400);
            } catch (error) {
              setTimeout(reject, 400);
            }
          }),
        onRowDelete: oldData =>
          new Promise( async (resolve, reject) => {
            try {
              await productService.delete({id : oldData._id})
              updateData();
              setTimeout(resolve, 400);
            } catch (error) {
              setTimeout(reject, 400);
            }
          }),
      }}
      {...configTasksTable}
    />
  )
}


export default TasksTable;
