import { useEffect, useReducer, useCallback } from 'react'
import tasksService from 'services/tasksService';
import reducer from './reducer';

/**
 * 
 * useFormValues
 * 
 */
const useFormValues = ({ 
  id: workorderId, 
  company,
  product,
  basePlan, 
  quantity, 
  ...rest 
}) => {
  const [state, dispatch] = useReducer(reducer,{
    company,
    product,
    basePlan,
    tasks: [],
    newTasks: [],
    updateTasks: false,
    warnings: [],
    ...rest,
  });

  // <!------- INITIALS --------->
  const getTasksByWorkorderId = useCallback(
    async () => 
      await tasksService.getTasksByWorkorderId({ id: workorderId}).then(({response}) => response)
  ,[workorderId])

  const getNewTasksFromBasePlan = useCallback(
    (basePlan) => basePlan.tasks?.map( (t, index) => ({
        ...t,
        status: 'NOT_STARTED',
        assignedTo: 'Sin asignar',
        done: 0,
        quantity: null,
        newTaskOrder: index
    }))
  ,[])

  useEffect(() => {
    if (!workorderId && state.basePlan){
      const getTasks = async () => {
        const payload = getNewTasksFromBasePlan(state.basePlan)
        return dispatch({ type: 'SET_NEW_TASKS', payload })
      }
      getTasks();
    };
  }, [workorderId, state.basePlan, getNewTasksFromBasePlan])

  useEffect(() => {
    if (workorderId){
      const getTasks = async () => {
        const payload = await getTasksByWorkorderId()
        return dispatch({ type: 'SET_WO_TASKS', payload })
      };
      getTasks();
    }
  }, [workorderId, getTasksByWorkorderId])

  
  // <!------- ACTIONS --------->

  const onRowAdd = useCallback( newValue => { 
    return dispatch({ 
      type: 'ADD_NEW_TASK', 
      payload: {
        ...newValue,
        newTaskOrder: state.newTasks.length
      }});
  },[dispatch, state.newTasks]);

  const onRowDelete = useCallback( async newValue => { 
    const { _id: id } = newValue;
    if (id){
      await tasksService.remove({ id });
      const payload = await getTasksByWorkorderId();
      return dispatch({ type: 'SET_WO_TASKS', payload });
    }
    return dispatch({ type: 'REMOVE_NEW_TASKS', payload: newValue });
  },[dispatch, getTasksByWorkorderId]);
  
  const onRowUpdate = useCallback( async newValue => { 
    const { _id: id } = newValue;
    if (id){
      await tasksService.update({ id, body: { workorderId, ...newValue }});
      const payload = await getTasksByWorkorderId();
      return dispatch({ type: 'SET_WO_TASKS', payload });
    }
    return dispatch({ type: 'UPDATE_NEW_TASKS', payload: newValue });
  },[dispatch, getTasksByWorkorderId, workorderId]);

  const handleAutocompleteChange = useCallback( (event, value) => { 
    const field = event.target.id.split("-")[0];
    return dispatch({ 
      type: 'SET_INPUT_FORM', 
      payload: { field, value }
    });
  },[dispatch]);

  const handleInputChange = useCallback( event => { 
    const field = event.target.name
    const value = event.target.value;
    return dispatch({ 
      type: 'SET_INPUT_FORM', 
      payload: { field, value }
    });
  },[dispatch]);

  const actions = {
    onRowAdd,
    onRowDelete,
    onRowUpdate,
    handleAutocompleteChange,
    handleInputChange,
  }

  // <!------------------------->
  // <!-------- EXPOSE --------->
  // <!------------------------->
  return {
    allTasks: [...state.newTasks, ...state.tasks],
    actions,
    ...state
  }
}

export default useFormValues;