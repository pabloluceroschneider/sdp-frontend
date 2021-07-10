import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/companies/newcompany'

import companyService from 'services/companyService';
import withTranslation from 'HOCS/withTranslation';


const useStyles = makeStyles(styles);

function Form({ handleTabChange, t }) {
	const classes = useStyles();
  const [form, setform] = useState({
    company: null,
		error: null,
  });

  const handleForm = (event, value) => {
    const field = event.target.name
    setform({
      ...form,
      error: null,
      [field]: event.target.value
    })
  }

  const onSubmit = async () => {
    setform({ ...form, loading: true })
		const { responseText, error } = await companyService.createCompany(
      { company: form.company }
    );
		if (error) {
			return setform({
				...form,
				error: responseText
			})
		}
    setTimeout(() => {
      handleTabChange(null, 0)
    }, 400)
  }

	return (
		<section className={classes.section}>
			<form className={classes.form}>
        <TextField
					required
					autoFocus
          className={classes.field}
          label="Nombre de Empresa"
          name="company"
          error={form.error}
          onChange={handleForm}
          />
        
        <Button onClick={onSubmit} className={classes.btnSave} disabled={!form.company || form.loading} variant="contained" color="primary">
          Guardar
        </Button>
      </form>
			{form.error && (
				<div className={classes.error}>{t(form.error, form.company)}</div>
			)}
		</section>
	);
}

export default withTranslation(Form);
