import { useReducer, useEffect, useCallback } from 'react';

const defaultInitialState = {
	tasks: null,
	selected: null
};

const reducer = (state, action) => {
	const { type, payload } = action;
	const actionStrategy = {
		SET_TASKS: () => ({
			...state,
			tasks: payload
		}),
		SET_SELECTED: () => ({
			...state,
			selected: payload
		})
	};
	return actionStrategy[type]() || state;
};

const useProcess = ({ tasks }) => {
	const [ state, dispatch ] = useReducer(reducer, {
		...defaultInitialState,
		tasks
	});

	useEffect(
		() => {
			dispatch({ type: 'SET_TASKS', payload: tasks });
		},
		[ state.tasks, tasks ]
	);

	const onRowClick = useCallback((_, payload) => dispatch({ type: 'SET_SELECTED', payload }), []);

	const onDrawerClose = useCallback(() => dispatch({ type: 'SET_SELECTED', payload: null }), []);

	const onStatusChange = useCallback(() => dispatch({ type: 'SET_SELECTED', payload: null }), []);

	const onDoneQuantityChange = useCallback(() => dispatch({ type: 'SET_SELECTED', payload: null }), []);

	const actions = {
		onRowClick,
		onDrawerClose,
		onStatusChange,
		onDoneQuantityChange
	};

	return { state, actions };
};

export default useProcess;
