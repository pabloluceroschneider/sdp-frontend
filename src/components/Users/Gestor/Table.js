import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';


import Table from 'components/Table';

// service
import tasksService from 'services/tasksService';

const TasksTable = ({username}) => {
  const [tasks, settasks] = useState([])
  const lookupstatus = useSelector(state => state.appData.lookupstatus)
  
  useEffect(() => {
    tasksService.getTasksByAssignedTo({ username })
      .then( ({response}) => settasks(response))
  },[username])

  const onDragAndDrop = useCallback((body) => {
    return tasksService.updatePriority({username, body}).then(() => 
      tasksService.getTasksByAssignedTo({ username })
        .then( ({response}) => settasks(response))
    )
  },[username])

  return ( 
    Boolean(tasks.length) &&
    <div>
      <Table 
        columns={[
          { Header: 'Nº', id: 'priority', width: '10px' },
          { Header: 'Empresa', id: 'company', width: '20px' },
          { Header: 'Producto', id: 'product', width: '60px' },
          { Header: 'Nº Orden', id: 'batchNumber', width: '8px' },
          { Header: 'Tarea', id: 'name', width: '15px' },
          { Header: 'Estado', id: 'status', width: '40px', render: ({status}) => lookupstatus[status] },
          { Header: 'Inicio', id: 'startDate', width: '15px', render: ({startDate}) => startDate || "--/--/----"  },
          { Header: 'Última modif.', id: 'lastUpdateDate', width: '15px', render: ({lastUpdateDate}) => lastUpdateDate || "--/--/----"},
          { Header: 'Completas', id: 'done', width: '20px', render: ({done, quantity}) => `${done} de ${quantity}`},
        ]}
        data={tasks}
        onDragAndDrop={onDragAndDrop}
        />
    </div>
  )
}

export default TasksTable
