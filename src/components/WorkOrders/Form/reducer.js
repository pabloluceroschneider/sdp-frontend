import getTasksWarnings from 'helpers/getTasksWarnings';

export default function reducer(state, action) {
  const { type, payload } = action;
	const configActions = {
		// form
		SET_INPUT_FORM: () => ({
			...state,
			[payload.field]: payload.value
		}),
		SET_ASSIGNED_TO: () => ({
			...state,
			assignedTo: payload.username,
			tasks: state.tasks.map((t) => ({
				...t,
				assignedTo: payload.username
			})),
			newTasks: state.newTasks.map((t) => ({
				...t,
				assignedTo: payload.username
			})),
			warnings: [],
			updateTasks: !state.updateTasks
		}),

		// wo tasks
		SET_WO_TASKS: () => ({
			...state,
			tasks: payload,
			warnings: getTasksWarnings([ ...payload, ...state.newTasks ]),
			updateTasks: !state.updateTasks
		}),

		// new tasks
		SET_NEW_TASKS: () => ({
			...state,
			newTasks: payload,
			warnings: getTasksWarnings([ ...state.newTasks, ...state.tasks, payload ]),
			updateTasks: !state.updateTasks
		}),

		ADD_NEW_TASK: () => ({
			...state,
			newTasks: [ ...state.newTasks, payload ],
			warnings: getTasksWarnings([ ...state.newTasks, ...state.tasks, payload ]),
			updateTasks: !state.updateTasks
		}),

		UPDATE_NEW_TASKS: () => {
			const newTasks = Array.from(state.newTasks);
			newTasks.splice(payload.newTaskOrder, 1, payload);
			return {
				...state,
				newTasks,
				warnings: getTasksWarnings([ ...newTasks, ...state.tasks ]),
				updateTasks: !state.updateTasks
			};
		},

		REMOVE_NEW_TASKS: () => {
			const newTasks = Array.from(state.newTasks);
			newTasks.splice(payload.tableData.id, 1);
			return {
				...state,
				newTasks,
				warnings: getTasksWarnings([ ...newTasks, ...state.tasks ]),
				updateTasks: !state.updateTasks
			};
		}
	};

	return configActions[type]() || state;
}
