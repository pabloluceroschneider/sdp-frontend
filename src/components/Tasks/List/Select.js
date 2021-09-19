import React, { useState } from 'react';

// @material-ui/core
import Input        from '@material-ui/core/Input';
import MenuItem     from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Select       from '@material-ui/core/Select';
import Checkbox     from '@material-ui/core/Checkbox';

import debounce from 'helpers/debounce'

// services
import usersService from 'services/usersService';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250
		}
	}
};

export default function UserPermissionsRow({
  id, 
  options,
  checked,
  getData,
}) {
  const [valuesChecked, setvaluesChecked] = useState(checked);

  const setPermissions = debounce((values) => {
    usersService
      .setPermissions({
        id: id,
        permissions: values
      })
    getData()
  }, 3000)

	const handleChange = (e) => {
    const values = e.target.value;
    setvaluesChecked(values);
    setPermissions(values);
	};


	return (
    <Select
      labelId="demo-mutiple-checkbox-label"
      id="demo-mutiple-checkbox"
      multiple
      value={valuesChecked}
      onChange={handleChange}
      input={<Input />}
      renderValue={(selected) => selected.join(', ')}
      MenuProps={MenuProps}
    >
      {options?.map((name) => (
        <MenuItem key={name} value={name}>
          <Checkbox checked={valuesChecked?.indexOf(name) > -1} />
          <ListItemText primary={name} />
        </MenuItem>
      ))}
    </Select>
	);
}
