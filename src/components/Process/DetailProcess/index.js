import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';

import styles from 'assets/jss/process/detail';
const useStyles = makeStyles(styles);

function DetailProcess({ data, onDrawerClose, updateSelected }) {
	const classes = useStyles();
	const optionsStatus = useSelector((state) => state.appData.status);
	const lookupstatus = useSelector((state) => state.appData.lookupstatus);
	const { _id: id, name, batchNumber, company, product, observation, quantity, done, status, operatorNotes } = data;
	const [ values, setValues ] = useState({
		operatorNotes: operatorNotes,
		doneRegister: 0
	});
	const handleInput = (event) => {
		const id = event.target.name;
		const value = event.target.value;
		setValues((form) => ({ ...form, [id]: value }));
	};
	const handleAutocomplete = (event, value) => {
		const id = event.target.id.split('-')[0];
		setValues((form) => ({ ...form, [id]: value }));
	};
	const setDoneRegister = (value) => () => {
		const actual = values.doneRegister + value;
		const validRest = quantity - done;
		if (value > 0 && actual > validRest) return;
		if (value < 0 && values.doneRegister === 0) return;
		setValues((form) => ({ ...form, doneRegister: form.doneRegister + value }));
	};

	const onStatusClick = () => {
		console.log(`values`, values);
		updateSelected(id, {
			status: values.status.id,
			operatorNotes: values.operatorNotes
		}).then(() =>
			setValues({
				operatorNotes: null,
				doneRegister: 0
			})
		);
	};

	const onDoneClick = () =>
		updateSelected(id, {
			done: done + values.doneRegister
		}).then(() =>
			setValues({
				operatorNotes: null,
				doneRegister: 0
			})
		);
	const onFinishClick = () => {
		updateSelected(id, {
			done: quantity,
			status: 'FINISHED'
		}).then(() => onDrawerClose());
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
					<div className={classes.input}>{`${done} completas de ${quantity}`}</div>
				</div>
				<div className={classes.row}>
					<div className={classes.smallInput}>{company}</div>
					<div className={classes.smallInput}>{product}</div>
					<div className={classes.smallInput}>nº Orden: {batchNumber}</div>
				</div>
				{observation && (
					<div className={classes.row}>
						<div className={classes.input}>{observation}</div>
					</div>
				)}

				<div className={classes.row}>
					<TextField
						className={classes.operatorNotes}
						label="Agregar Notas del operador"
						name="operatorNotes"
						multiline
						defaultValue={operatorNotes}
						onChange={handleInput}
					/>
					<Autocomplete
						label="Estado"
						id="status"
						options={optionsStatus}
						defaultValue={{ name: lookupstatus[status] }}
						onChange={handleAutocomplete}
						getOptionSelected={(option, value) => option.name === value.name}
						getOptionLabel={(option) => option.name}
						className={classes.status}
						renderInput={(params) => <TextField {...params} label="Estado" name="status" />}
					/>
				</div>

				<div className={classes.row}>
					<Button onClick={onStatusClick} className={classes.statusBtn}>
						En progreso
					</Button>
					<Button onClick={onStatusClick} className={classes.statusBtn}>
						Pausado
					</Button>
					<Button onClick={onStatusClick} className={classes.statusBtn}>
						Terminado
					</Button>
				</div>

				<div className={classes.row}>
					<div className={classes.actionsRow}>
						<Button className={classes.doneHandlerBtn} onClick={setDoneRegister(-1)}>
							-
						</Button>
						<TextField
							className={classes.doneRegister}
							name="doneRegister"
							type="number"
							defaultValue={done}
							value={values.doneRegister}
							onChange={handleInput}
							InputProps={{
								classes: {
									input: classes.resize
								}
							}}
						/>
						<Button className={classes.doneHandlerBtn} onClick={setDoneRegister(1)}>
							+
						</Button>
					</div>
				</div>
				<div className={classes.row}>
					<Button fullWidth onClick={onStatusClick} className={classes.success}>
						Registrar
					</Button>
				</div>
			</div>
		</Drawer>
	);
}

export default DetailProcess;
