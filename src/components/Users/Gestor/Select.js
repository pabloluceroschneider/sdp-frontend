import React from 'react';

// @material-ui/core
import FormControl        from '@material-ui/core/FormControl';
import Input        from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem     from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Select       from '@material-ui/core/Select';
import Checkbox     from '@material-ui/core/Checkbox';

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
  label,
  options,
  checked = [],
  className,
  disabled,
  handleChange
}) {
	return (
    <FormControl className={className} disabled={disabled}>
      <InputLabel id="demo-mutiple-checkbox-label">{label}</InputLabel>
      <Select
        labelId="demo-mutiple-checkbox-label"
        id="demo-mutiple-checkbox"
        multiple
        value={checked}
        onChange={e => handleChange(e.target.value)}
        input={<Input />}
        renderValue={(selected) => selected.join(', ')}
        MenuProps={MenuProps}
      >
        {options?.map((name) => (
          <MenuItem key={name} value={name}>
            <Checkbox checked={checked?.indexOf(name) > -1} />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
	);
}
