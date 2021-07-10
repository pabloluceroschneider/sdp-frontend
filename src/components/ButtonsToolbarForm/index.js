// dependencies
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';

// project components
import withTranslation from 'HOCS/withTranslation';

// styles
import styles from 'assets/jss/workorders/form.js';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(styles);

/**
 * Component
 */
function Form({ labels, onSubmit, onCancel, onRemove }) {
	const [ showAsk, setshowAsk ] = useState(false);
	const classes = useStyles();

	// <!------- REMOVE  ---------->
	const handleDeleteBtn = () => {
		setshowAsk((show) => !show);
	};

	// <!------- RENDER  ---------->
	return (
		<div className={classes.buttonsRow}>
			<div className={classes.leftBtn}>
				{!showAsk && labels.remove && (
					<Button onClick={handleDeleteBtn} color="secondary" className={classes.removeBtn}>
						{labels.remove}
					</Button>
				)}
				{showAsk && (
					<Alert
						severity="error"
						className={classes.alert}
						children={labels.removeWarning}
						action={
							<>
								<Button onClick={handleDeleteBtn} color="inherit" size="small">
									{labels.removeCancel}
								</Button>
								<Button onClick={onRemove} color="secondary" size="small">
									{labels.removeConfirm}
								</Button>
							</>
						}
					/>
				)}
			</div>
			<div className={classes.rightBtn}>
				<Button onClick={onCancel} className={classes.cancelBtn}>
					{labels.cancel}
				</Button>
				<Button onClick={onSubmit} variant="contained" color="primary" className={classes.confirmBtn}>
					{labels.confirm}
				</Button>
			</div>
		</div>
	);
}

export default withTranslation(Form);
