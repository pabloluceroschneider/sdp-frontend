import React, { useState, useCallback } from 'react'

import Table from './ProcessTable'
import Detail from './DetailProcess'

function Process({data}) {
  const [selected, setselected] = useState();

  const onRowClick = useCallback((_, value) => setselected(value),[])
  
  const onCloseDrawer = useCallback(() => setselected(),[])

  return (
    <div>
      <Table data={data} onRowClick={onRowClick} />
      {selected && 
        <Detail 
          data={selected}
          onCloseDrawer={onCloseDrawer}
          />
      }
    </div>
  )
}

export default Process
