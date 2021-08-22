import React from 'react';
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
						// onChange={actions.handleInputChange}
					/>
					<Button onClick={onStatusChange} className={classes.statusBtn}>
						Cambiar Estado
					</Button>
				</div>

				<div className={classes.fsfasfsfa}>
					<div className={classes.row}>
						<div className={classes.actionsRow}>
							<Button className={classes.doneHandlerBtn}>-</Button>
							<TextField
								className={classes.doneRegister}
								name="doneRegister"
								type="number"
								defaultValue={done}
								InputProps={{
									classes: {
										input: classes.resize
									}
								}}
							/>
							<Button className={classes.doneHandlerBtn}>+</Button>
						</div>
						<div className={classes.actionsRow}>
							<Button onClick={onDoneQuantityChange} fullWidth className={classes.primary}>
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
