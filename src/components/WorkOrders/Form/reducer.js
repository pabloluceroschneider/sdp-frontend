import getTasksWarnings from 'helpers/getTasksWarnings';

export default function reducer(state, action){
  const configActions = {

    // form
    SET_INPUT_FORM: () => ({
      ...state,
      [action.payload.field]: action.payload.value
    }),

    // wo tasks
    SET_WO_TASKS: () => ({ 
      ...state,
      tasks: action.payload,
      warnings: getTasksWarnings(action.payload),
      updateTasks: !state.updateTasks,
    }),
    
    // new tasks
    SET_NEW_TASKS: () => ({
      ...state,
      newTasks: action.payload,
      warnings: getTasksWarnings(action.payload),
      updateTasks: !state.updateTasks,
    }),
    
    ADD_NEW_TASK: () => ({ 
      ...state, 
      newTasks: [...state.newTasks, action.payload],
      warnings: getTasksWarnings([...state.newTasks, action.payload]),
      updateTasks: !state.updateTasks,
    }),
    
    UPDATE_NEW_TASKS: () => {
      const newTasks = Array.from(state.newTasks);
      newTasks.splice(action.payload.newTaskOrder, 1, action.payload);
      return {
        ...state, 
        newTasks,
        warnings: getTasksWarnings(newTasks),
        updateTasks: !state.updateTasks,
      }
    },
    
    REMOVE_NEW_TASKS: () => {
      const newTasks = Array.from(state.newTasks);
      newTasks.splice(action.payload.tableData.id, 1);
      return {
        ...state,
        newTasks,
        warnings: getTasksWarnings(newTasks),
        updateTasks: !state.updateTasks,
      }
    },
  }

  return configActions[action.type]() || state;
}