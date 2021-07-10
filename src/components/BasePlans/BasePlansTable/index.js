import React, { useState } from 'react';
import { useSelector } from 'react-redux'

import MaterialTable from 'material-table';

import configBasePlansTable from './config_baseplans_table';

function TasksTable({ 
  data,
  onClickRow,
}){
  const lookupcompanies = useSelector(state => state.appData.lookupcompanies);
  const [filtering, setfiltering] = useState(false);

  return ( 
    <MaterialTable
      data={data}
      columns={[
        { title: 'Plano', field: 'name' },
        { 
          title: 'Producto', 
          field: 'product', 
          render: ({product}) => product?.name,
          customFilterAndSearch: (term, rowData) => {
            var re = new RegExp(term, "g");
            return re.test(rowData.product.name)
          },
        },
        { 
          title: 'Empresa', 
          field: 'company', 
          render: ({company}) => company?.name, 
          lookup: lookupcompanies,
          customFilterAndSearch: (term, rowData) => {
            var re = new RegExp(term, "g");
            return re.test(rowData.company.name)
          },
        },
      ]}
      options={{
        showTitle: false,
        actionsColumnIndex: 5,
        filtering: filtering,
        emptyRowsWhenPaging: false,
        columnsButton: true,
        rowStyle: rowData => ({ 
          backgroundColor: rowData.tableData.id % 2 === 0 ? '#fcfcfc' : 'white' 
        }),
      }}
      onRowClick={(_, rowData) => onClickRow(rowData)}
      actions={[
        {
          icon: 'filter_list',
          tooltip: 'Filtrar',
          isFreeAction: true,
          onClick: () => setfiltering(!filtering)
        }
      ]}
      {...configBasePlansTable}
    />
  )
}


export default TasksTable;
