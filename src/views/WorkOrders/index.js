import React, { useState, useEffect, useCallback } from "react";

// project components
import WorkOrders from "components/WorkOrders";

// Service
import workOrderService from "services/workOrderService";

/**
 * WorkOrders
 */
function WorkOrdersView() {
  const [workorders, setworkorders] = useState();

  useEffect(() => {
    workOrderService.all().then( ({response}) => {
      setworkorders(response)
    })
  }, [])

  const updateList = useCallback(
    () => 
      workOrderService.all().then( ({response}) => {
        setworkorders(response)
    })
  ,[])

  return <WorkOrders workorders={workorders} updateList={updateList} />
}

export default WorkOrdersView;