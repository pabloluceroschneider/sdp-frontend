import React, { useState } from 'react';

import MaterialTable from 'material-table';

import companyService from 'services/companyService'

import companies_table_config from './companies_table_config';

function TasksTable({ 
  companies,
  updateData,
}){
  const [filtering, setfiltering] = useState(false);
  const toggleFiltering = () => setfiltering(f => !f);

  return ( 
    <MaterialTable
      data={companies}
      isLoading={!Boolean(companies)}
      columns={[
        { title: 'Empresa', field: 'name' }
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
          onClick: toggleFiltering
        },
      ]}
      editable={{
        onRowUpdate: newData =>
          new Promise( async (resolve, reject) => {
            try {
              await companyService.update(newData)
              updateData()
              setTimeout(resolve, 400);
            } catch (error) {
              setTimeout(reject, 400);
            }
          }),
        onRowDelete: newData =>
        new Promise( async (resolve, reject) => {
          try {
            await companyService.delete(newData._id)
            updateData()
            setTimeout(resolve, 400);
          } catch (error) {
            setTimeout(reject, 400);
          }
        }),
      }}
      {...companies_table_config}
    />
  )
}


export default TasksTable;
