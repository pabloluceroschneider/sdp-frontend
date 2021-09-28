import { useReducer } from 'react';
import { differenceInSeconds } from 'date-fns';

function reducer(state, action){
	const { type, payload } = action;
	const actionStrategy = {
		SET_INPUT: () => ({
			...state,
			[payload.id] : payload.value,
		}),
		SET_DONE: () => {
			const upLimit = Number(state.doneRegister) + Number(state.done) + payload;
			const downLimit = Number(state.doneRegister) + payload
			if (upLimit > state.quantity) {
				return state
			}
			if (downLimit < 0){
				return state
			}
			return {
				...state,
				doneRegister: state.doneRegister + payload,
			}
		},
		SET_INPUT_DONE: () => ({
			...state,
			doneRegister: payload,
		}),
		SET_STATUS: () => ({
			...state,
			status: payload,
		}),
		RESET_VALUES: () => ({
			...state,
			...payload,
			status: state.status,
			doneRegister: 0,
			timeStart: new Date().toISOString(),
		}),
	}
	return actionStrategy[type]() || state;
}

const useDetailProcess = (initialState) => {
	const [values, dispatch] = useReducer(reducer, {
		...initialState, 
		doneRegister: null,
		timeStart: new Date().toISOString(),
	});
	
	const handleInput = (event) => {
		const id = event.target.name;
		const value = event.target.value;
		return dispatch({type:'SET_INPUT', payload: { id, value } });
	};
	const handleAutocomplete = (event, value) => {
		const id = event.target.id.split('-')[0];
		return dispatch({type:'SET_INPUT', payload: { id, value } });
	};
	const resetValues = (payload) => dispatch({ type: 'RESET_VALUES', payload });

	const setDone = (value) => () => 
		dispatch({
			type: 'SET_DONE',
			payload: value
		});
	const onStatusChange = (status) => () => {
		const statusStrategy = {
			'IN_PROGRESS': { id: 'IN_PROGRESS', name: 'En progreso' },
			'PAUSED': { id: 'PAUSED', name: 'Pausada' },
			'FINISHED': { id: 'FINISHED', name: 'Finalizada' },
		};
		return dispatch({
			type: 'SET_STATUS',
			payload: statusStrategy[status]
		})
	}

	const handleDoneInput = (event) => {
		const value = Number(event.target.value);
		console.log(`value`, value);
		return dispatch({
			type: 'SET_INPUT_DONE',
			payload: value
		});
		
	};

	const actions = {
		handleInput,
		handleAutocomplete,
		setDone,
		handleDoneInput,
		onStatusChange,
		resetValues
	};

	return { 
		values, 
		actions,
		body: {
			status: values.status.id,
			done: values.doneRegister,
			operatorNotes: values.operatorNotes,
			timeStart: values.timeStart,
		}
	};
}

export default useDetailProcess