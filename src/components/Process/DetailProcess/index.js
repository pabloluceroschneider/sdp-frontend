import React from 'react';
import useDetailProcess from './useDetailProcess';

import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Close from './Close';
import TimeStamp from './TimeStamp';

import styles from 'assets/jss/process/detail';
const useStyles = makeStyles(styles);

function DetailProcess({ data, onDrawerClose, updateSelected }) {
	const classes = useStyles();
	const optionsStatus = useSelector((state) => state.appData.status);
	const lookupstatus = useSelector((state) => state.appData.lookupstatus);
	const {
		_id: id,
		estimate,
		name,
		batchNumber,
		company,
		product,
		observation,
		quantity,
		done,
		status,
		operatorNotes
	} = data;
	const { values, actions, body } = useDetailProcess({ ...data, status: { id: status, name: lookupstatus[status] } });
	const { handleInput, handleAutocomplete, handleDoneInput, resetValues, setDone, onStatusChange } = actions;
	const onRegister = () => {
		const timeEnd = new Date().toISOString();
		updateSelected(id, { ...body, timeEnd, name }).then(resetValues);
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
			<div className={classes.detailProcess}>
				<Close className={classes.close} onClose={onDrawerClose} />
				<div className={classes.container}>
					<div className={classes.header}>
						<div className={classes.name}>{name}</div>
						<TimeStamp timeStart={values.timeStart} />
					</div>
					<div className={classes.row}>
						<div className={classes.input}>{`${done || 0} completas de ${quantity}`}</div>
						<div className={classes.smallInput}>nº Orden: {batchNumber}</div>
					</div>
					<div className={classes.row}>
						<div className={classes.smallInput}>{company}</div>
						<div className={classes.smallInput}>{product}</div>
					</div>
					{Boolean(estimate) && (
						<div className={classes.row}>
							<div className={classes.smallInput}>{`Tiempo por Lote: ${(estimate * quantity).toFixed(
								2
							)} mins`}</div>
							<div className={classes.smallInput}>{`Tiempo por unidad: ${estimate} mins`}</div>
						</div>
					)}

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
						<Button
							onClick={onStatusChange('IN_PROGRESS')}
							className={[ classes.statusBtn, classes.IN_PROGRESS ]}
						>
							En progreso
						</Button>
						<Button onClick={onStatusChange('PAUSED')} className={[ classes.statusBtn, classes.PAUSED ]}>
							Pausada
						</Button>
						<Button
							onClick={onStatusChange('FINISHED')}
							className={[ classes.statusBtn, classes.FINISHED ]}
						>
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
								error={values.doneRegister > values.quantity - values.done}
								helperText={values.doneRegister > values.quantity - values.done ? 'Error' : null}
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
			</div>
		</Drawer>
	);
}

export default DetailProcess;
