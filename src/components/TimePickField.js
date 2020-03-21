import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDateTimePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import {useFormikContext} from "formik";

const TimePickField = ({format = "yyyy/MM/dd HH:mm"}) => {
  const {values: {change_date}, setFieldValue} = useFormikContext();
  const handleCreateDateChange = (data) => {
    setFieldValue('create_date', data);
  };
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDateTimePicker
        margin="normal"
        label={'创建日期'}
        format={format}
        value={change_date}
        onChange={handleCreateDateChange}
      />
    </MuiPickersUtilsProvider>
  );
};

export default TimePickField;