import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/users/newuser'

import usersService from 'services/usersService';
const validate = form => {
  const { username, password } = form;
  return username && password
}

const useStyles = makeStyles(styles);

function Form({ handleTabChange}) {
	const classes = useStyles();
  const [form, setform] = useState({
    username: '',
    password: '',
  });

  const handleForm = (event, value) => {
    const field = event.target.name
    setform({
      ...form,
      error: false,
      [field]: event.target.value
    })
  }

  const onSubmit = async () => {
    const validated = validate(form);
    if (!validated) { setform({ ...form, error: true }); return; }
    setform({ ...form, loading: true })
    await usersService.create({
      username: form.username,
      password: form.password,
    });
    setTimeout(() => {
      handleTabChange(null, 0)
    }, 400)
  }

	return (
		<section className={classes.section}>
			<form className={classes.form}>
        <div className={classes.row}>
          <TextField
              className={classes.field}
              label="Nombre Completo"
              name="fullname"
              error={form.error}
              onChange={handleForm}
              />
        </div>
        <div className={classes.row}>
          <TextField
              className={classes.field}
              label="Nombre de Usuario"
              name="username"
              error={form.error}
              onChange={handleForm}
              />

          <TextField
            className={classes.field}
            label="Contraseña"
            error={form.error}
            name="password"
            onChange={handleForm}
            />
        </div>
        <Button 
          onClick={onSubmit} 
          className={classes.btnSave} 
          disabled={!form.username || !form.password || form.loading} 
          variant="contained" color="primary">
          Crear
        </Button>
      </form>
		</section>
	);
}

export default Form;
