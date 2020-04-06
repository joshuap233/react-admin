import React from 'react';
import {Grid} from '@material-ui/core';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import {Field} from "../../components/Form";
import {areEqual} from "../../helpers/misc";

function InputWithIcon({icon, label, info, name, ...other}) {
  return (
    <Grid container spacing={5} alignItems="center">
      <Grid item>
        {icon}
      </Grid>
      <Grid item>
        <Field
          formName={'userInfo'}
          name={name}
          variant="outlined"
          label={label}
          {...other}
        />
      </Grid>
      {
        info ?
          <Grid item title={info}>
            <ContactSupportIcon/>
          </Grid>
          : null
      }
    </Grid>
  );
}

export default React.memo(InputWithIcon, areEqual);
