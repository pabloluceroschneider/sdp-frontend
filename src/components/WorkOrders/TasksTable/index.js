import React, { useState, memo } from 'react';
import { useSelector } from 'react-redux';

import MaterialTable from 'material-table';
import HistoryIcon from '@material-ui/icons/History';
import configTasksTable from './config_tasks_table';

function TasksTable({ 
  data,
  quantity,
  onRowAdd : onRowAddProp,
  onRowDelete: onRowDeleteProp,
  onRowUpdate: onRowUpdateProp,
  onHistorialClick,
}){
  const [filtering, setfiltering] = useState(false);
  const toggleFiltering = () => setfiltering( f => !f);
  const users = useSelector(state => state.appData.lookupusers);
  const status = useSelector(state => state.appData.lookupstatus);

  const onRowAdd = newValue => 
    new Promise( (res, rej) => {
      if(!newValue.name) {
        rej()
        return;
      }
      onRowAddProp(newValue)
      setTimeout(res, 400);
  })

  const onRowUpdate = (newValue, oldValue) => 
    new Promise( (res, rej) => {
      onRowUpdateProp(newValue, oldValue);
      setTimeout(res, 400);
  })

  const onRowDelete = newValue => 
    new Promise( (res, rej) => {
      onRowDeleteProp(newValue)
      setTimeout(res, 400);
  })

  return ( 
    Boolean(data.length) &&
    <MaterialTable
      data={data}
      columns={[
        { title: 'Nombre', field: 'name', editable: 'onAdd', defaultSort: 'asc'},
        { title: 'Responsable', field: 'assignedTo', lookup: users, initialEditValue: 'Sin asignar' },
        { title: 'Completas', field: 'done', type: 'numeric', initialEditValue: 0 },
        { 
          title: 'Cantidad', 
          field: 'quantity', 
          type: 'numeric',
          editable: 'onUpdate',
          render: (rowData) => rowData.quantity ?? quantity,
          initialEditValue: quantity,
        },
        { title: 'Estado', field: 'status', lookup: status, initialEditValue: 'NOT_STARTED' },
        { title: 'Observación', field: 'observation' },
        { title: 'Tiempo', field: 'duration', editable:'never', render: ({duration}) => duration ? `${duration} mins.` : null },
      ]}
      options={{
        actionsColumnIndex: 7,
        filtering: filtering,
        paging: false,
        search: false,
        padding: 'dense',
        rowStyle: (rowValues) => {
          let styles = {}
          if (rowValues.assignedTo === 'Sin asignar') {
            styles.borderLeft = '4px solid orange'
          }
          if (rowValues.quantity > quantity) {
            styles.borderLeft = '4px solid red'
          }
          return styles
        }
      }}
      actions={[
        {
          icon: 'filter_list',
          tooltip: 'Filtrar',
          isFreeAction: true,
          onClick: toggleFiltering
        },
        {
          icon: HistoryIcon,
          tooltip: 'Ver Historial',
          onClick: (_, rowData) => onHistorialClick(rowData),
        }
      ]}
      editable={{
        onRowAdd: onRowAdd,
        onRowUpdate: onRowUpdate,
        onRowDelete: onRowDelete,
      }}
      {...configTasksTable}
    />
  )
}

const areEquals = (prevProps, nextProps) => (
  prevProps.quantity ===  nextProps.quantity &&
  prevProps.updateTasks ===  nextProps.updateTasks &&
  prevProps.data.length ===  nextProps.data.length
)

export default memo(TasksTable, areEquals);
