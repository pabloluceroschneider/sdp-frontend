import React, { useState, useEffect, useCallback } from "react";

// project components
import Tasks from "components/Tasks";

// Service
import tasksService from "services/tasksService";

/**
 * WorkOrders
 */
function TasksView() {
  const [workorders, setworkorders] = useState();

  useEffect(() => {
    tasksService.getAll().then( ({response}) => {
      setworkorders(response)
    })
  }, [])

  const updateList = useCallback(
    () => 
      tasksService.getAll().then( ({response}) => {
        setworkorders(response)
    })
  ,[])

  return <Tasks workorders={workorders} updateList={updateList} />
}

export default TasksView;