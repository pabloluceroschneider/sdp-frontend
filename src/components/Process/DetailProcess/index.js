import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';

import styles from 'assets/jss/process/detail';
import processService from 'services/processService';
const useStyles = makeStyles(styles);

function DetailProcess({ data, onDrawerClose, onStatusChange, onDoneQuantityChange }) {
	const classes = useStyles();
	const optionsStatus = useSelector((state) => state.appData.status);
	const lookupstatus = useSelector((state) => state.appData.lookupstatus);
	const { name, batchNumber, company, product, observation, quantity, done, status, operatorNotes } = data;
	const [ values, setValues ] = useState({
		operatorNotes: null,
		doneRegister: 0
	});
	const handleInput = (event) => {
    const id = event.target.name
    const value = event.target.value;
    setValues(form => ({ ...form, [id] : value }));
	}
	const setDoneRegister = (value) => () => {
		if (values.doneRegister === 0 && value < 1) return;
		if (values.doneRegister === quantity && value > 0) return;
		setValues(form => ({ ...form, doneRegister: form.doneRegister + value }));
	}
	
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
					<div className={classes.batchNumber}>{batchNumber}</div>
				</div>
				<div className={classes.row}>
					<div className={classes.input}>{company}</div>
					<div className={classes.input}>{product}</div>
				</div>
				<div className={classes.row}>
					{observation && <div className={classes.input}>{observation}</div>}
					<div className={classes.input}>{`${done} completas de ${quantity}`}</div>
				</div>
				<div className={classes.row}>
					<Autocomplete
						label="Estado"
						id="status"
						options={optionsStatus}
						defaultValue={{ name: lookupstatus[status] }}
						// onChange={actions.handleInputChange}
						getOptionSelected={(option, value) => option.name === value.name}
						getOptionLabel={(option) => option.name}
						className={classes.input}
						renderInput={(params) => <TextField {...params} label="Estado" name="status" />}
					/>
					<TextField
						className={classes.input}
						label="Agregar Notas del operador"
						name="operatorNotes"
						multiline
						defaultValue={operatorNotes}
						onChange={handleInput}
					/>
					<Button onClick={onStatusChange} className={classes.statusBtn}>
						Cambiar Estado
					</Button>
				</div>

				<div className={classes.fsfasfsfa}>
					<div className={classes.row}>
						<div className={classes.actionsRow}>
							<Button className={classes.doneHandlerBtn} onClick={setDoneRegister(-1)}>-</Button>
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
							<Button className={classes.doneHandlerBtn} onClick={setDoneRegister(1)}>+</Button>
						</div>
						<div className={classes.actionsRow}>
							<Button onClick={onDoneQuantityChange} fullWidth className={classes.primary} disabled={!Boolean(values.doneRegister)}>
								Registrar
							</Button>
						</div>
					</div>
					<div className={classes.row}>
						<div className={classes.emptyActionsRow} />
						<div className={classes.actionsRow}>
							<Button onClick={onDoneQuantityChange} fullWidth className={classes.secondary}>
								Finalizar
							</Button>
						</div>
					</div>
				</div>
			</div>
		</Drawer>
	);
}

export default DetailProcess;
