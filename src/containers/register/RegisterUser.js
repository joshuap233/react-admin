import {Grid} from "@material-ui/core";
import React from "react";
import useStyles from './registerUser.style';
import {Field} from "../../components/Form";

function RegisterUser() {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid
        container
        justify="space-around"
        className={classes.name}
      >
        {
          [
            {name: 'nickname', label: '昵称', variant: "outlined"},
            {name: 'username', label: '用户名', variant: "outlined"}
          ].map(item => (
            <Field
              key={item.name}
              {...{...item, fullWidth: false, formName: 'register'}}
            />))
        }
      </Grid>

      <Grid container justify="space-around" className={classes.password}>
        {
          [
            {name: 'password', label: '密码', type: "password",},
            {name: 'confirm_password', label: '确认密码', type: "password"},
          ].map(item => (
            <Field key={item.name} {...{...item, variant: "outlined", fullWidth: false, formName: 'register'}}/>
          ))
        }
      </Grid>
    </Grid>
  );
}

export default React.memo(RegisterUser);
