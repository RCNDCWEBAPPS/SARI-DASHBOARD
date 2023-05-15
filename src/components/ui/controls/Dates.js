import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function BasicDatePicker(props) {
  const {
    name,
    label,
    value,
    error = null,
    onChange,
    type,
    focus,
    ...other
  } = props;
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label={label}
        value={value}
      onChange={onChange}
         autoFocus={focus}
      {...other}
      {...(error && { error: true, helperText: error })}
      name={name}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}