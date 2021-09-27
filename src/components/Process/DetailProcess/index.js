import React, { useReducer } from 'react';
import { differenceInSeconds } from 'date-fns';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';

import styles from 'assets/jss/process/detail';
const useStyles = makeStyles(styles);

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
		SET_TIMEOUT: () => {
			const difference = differenceInSeconds(new Date(), new Date(state.timeStart))
			const minutes = Math.floor(difference / 60);
			const seconds = (difference % 60).toFixed();
			return {
				...state,
				timeStamp: `${minutes}:${seconds}`
			}
		}
	}
	return actionStrategy[type]() || state;
}

const useDetailProcess = (initialState) => {
	const [values, dispatch] = useReducer(reducer, {
		...initialState, 
		doneRegister: null,
		timeStart: new Date().toISOString(),
	});
	
	setInterval(() => dispatch({type:'SET_TIMEOUT'}), 1000)

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

function DetailProcess({ data, onDrawerClose, updateSelected }) {
	const classes = useStyles();
	const optionsStatus = useSelector((state) => state.appData.status);
	const lookupstatus = useSelector((state) => state.appData.lookupstatus);
	const { _id: id, estimate, name, batchNumber, company, product, observation, quantity, done, status, operatorNotes } = data;
	const { values, actions, body } = useDetailProcess({...data, status: { id: status, name: lookupstatus[status]}});
	const { handleInput, handleAutocomplete, handleDoneInput, resetValues, setDone, onStatusChange } = actions;
	const onRegister = () => {
		const timeEnd = new Date().toISOString();
		updateSelected(id, {...body, timeEnd, name}).then(resetValues)
	};

	return (
		<Drawer
			classes={{
				paper: classes.drawer
			}}
			anchor="right"
			open={Boolean(data)}
			onClose={onDrawerClose}
		>
			<div className={classes.container}>
				<div className={classes.header}>
					<div className={classes.name}>{name}</div>
					<div className={classes.sd}>{values.timeStamp}</div>
				</div>
				<div className={classes.row}>
					<div className={classes.input}>{`${(done||0)} completas de ${quantity}`}</div>
					<div className={classes.smallInput}>nº Orden: {batchNumber}</div>
				</div>
				<div className={classes.row}>
					{Boolean(estimate) && <div className={classes.smallInput}>{`Tiempo determinado: ${estimate} mins`}</div> }
					<div className={classes.smallInput}>{company}</div>
					<div className={classes.smallInput}>{product}</div>
					
				</div>
				{observation && (
					<div className={classes.row}>
						<div className={classes.observation}>{observation}</div>
					</div>
				)}

				<div className={classes.row}>
					<TextField
						className={classes.operatorNotes}
						label="Agregar Notas del operador"
						name="operatorNotes"
						multiline
						defaultValue={operatorNotes}
						value={values.operatorNotes}
						onChange={handleInput}
					/>
					<Autocomplete
						label="Estado"
						id="status"
						options={optionsStatus}
						value={values.status}
						onChange={handleAutocomplete}
						getOptionSelected={(option, value) => option.name === value.name}
						getOptionLabel={(option) => option.name}
						className={classes.status}
						renderInput={(params) => <TextField {...params} label="Estado" name="status" />}
					/>
				</div>

				<div className={classes.row}>
					<Button onClick={onStatusChange("IN_PROGRESS")} className={[classes.statusBtn, classes.IN_PROGRESS]}>
						En progreso
					</Button>
					<Button onClick={onStatusChange("PAUSED")} className={[classes.statusBtn, classes.PAUSED]}>
						Pausada
					</Button>
					<Button onClick={onStatusChange("FINISHED")} className={[classes.statusBtn, classes.FINISHED]}>
						Finalizada
					</Button>
				</div>

				<div className={classes.row}>
					<div className={classes.actionsRow}>
						<Button className={classes.doneHandlerBtn} onClick={setDone(-1)}>
							-
						</Button>
						<TextField
							className={classes.done}
							name="done"
							type="number"
							placeholder={0}
							value={values.doneRegister}
							error={values.doneRegister > (values.quantity - values.done)}
							helperText={values.doneRegister > (values.quantity - values.done) ? "Error" : null}
							onChange={handleDoneInput}
							InputProps={{
								classes: {
									input: classes.resize
								}
							}}
						/>
						<Button className={classes.doneHandlerBtn} onClick={setDone(1)}>
							+
						</Button>
					</div>
				</div>
				<div className={classes.row}>
					<Button fullWidth onClick={onRegister} className={classes.success}>
						Registrar
					</Button>
				</div>
			</div>
		</Drawer>
	);
}

export default DetailProcess;
