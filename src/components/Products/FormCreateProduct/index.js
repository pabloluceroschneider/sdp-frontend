import React from 'react';
import { useSelector } from 'react-redux'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';

// project components
import withTranslation from 'HOCS/withTranslation';

// services
import productService from 'services/productService';

import styles from 'assets/jss/products/form'
const useStyles = makeStyles(styles);

/**
 * CreateCompanyForm Component
 */
function CreateProductForm({ t, handleTabChange }) {
	const classes = useStyles();
	const companies = useSelector(state => state.appData.companies)
	const [ selectedCompany, setselectedCompany ] = React.useState(null);
	const [ productName, setproductName ] = React.useState(null);
	const [ errorMessage, seterrorMessage ] = React.useState(null);
	const [ successMessage, setsuccessMessage ] = React.useState(null);

	const submitProduct = async () => {
		const { responseText, error } = await productService.createProduct({
			companyId: selectedCompany?._id,
			name: productName
		});
		if (error) seterrorMessage(responseText);
		if (!error) {
			setsuccessMessage(true);
			setproductName('');
			handleTabChange(null, 0, true)
			setselectedCompany(null);
			setTimeout(() => {
				setsuccessMessage(null);
			}, 3000);
		}
	};

	const handleChange = (e, value) => {
		e.preventDefault();
		setselectedCompany(value);
	};

	return (
		<section className={classes.section}>
			<form className={classes.form}>
			<Autocomplete
					id="COMPANY-select-demo"
					options={companies}
					className={classes.field}
					getOptionLabel={(option) => option.name}
					value={selectedCompany}
					onChange={handleChange}
					renderInput={(params) => (
						<TextField
							{...params}
							label="Seleccione una empresa"
							error={errorMessage}
						/>
					)}
				/>

				<TextField
					margin="normal"
					required
					fullWidth
					className={classes.field}
					id="productName"
					label="Nombre del producto"
					name="Nombre del producto"
					value={productName}
					error={errorMessage}
					onChange={(e) => {
						e.preventDefault();
						setproductName(e.target.value);
						errorMessage && seterrorMessage(null);
					}}
				/>

				<Button className={classes.btnSave} onClick={submitProduct} color="primary" variant="contained">
					Crear
				</Button>
			</form>
			{successMessage && (
				<span className={classes.success}>{`Producto ${productName} creado con éxito`}</span>
				)}
			{errorMessage && <span className={classes.error}>{t(errorMessage)}</span>}
		</section>

	);
}

export default withTranslation(CreateProductForm);
