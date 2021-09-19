import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import historyService from 'services/historyService';
import MaterialTable from 'material-table';

function HistorialTable({ 
  task,
  handleTabChange,
}){
  const [data, setData] = useState();
  const status = useSelector(state => state.appData.lookupstatus);

  useEffect(() => {
    if (!task) return;
    const get = async () => {
      const {response} = await historyService.getByTask({ id: task._id })
      setData(response);
    };
    get();
  }, [task])
  console.log(`data`, data)

  return ( 
      <MaterialTable
        data={data}
        isLoading={!Boolean(data)}
        title=""
        columns={[
          { title: 'Comienzo', field: 'timeStart', render: ({timeStart}) => timeStart ? new Date(timeStart).toLocaleString() : null},
          { title: 'Duración', field: 'duration', render: ({duration}) => duration > -1 ? `${duration} mins` : null },
          { title: 'Completos', field: 'values', render: ({values}) => values.done },
          { title: 'Estado', field: 'values', render: ({values}) => status[values.status] },
          { title: 'Comentario', field: 'values', render: ({values}) => values.operatorNotes },
        ]}
        options={{
          paging: false,
          search: false,
          padding: 'dense',
          rowStyle: rowData => ({
            backgroundColor: rowData.tableData.id % 2 === 0 ? '#fcfcfc' : 'white'
          })
        }}
        localization={{
          body: {
            emptyDataSourceMessage: 'No hay historial de trabajo',
          },
          toolbar: {
            searchPlaceholder: "Buscar",
          },
        }}
        />
  )
}

export default HistorialTable