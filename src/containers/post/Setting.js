import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {
  TextareaAutosize,
  Drawer,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@material-ui/core';
import {Field, useFormikContext} from 'formik';
import Tags from './Tags';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import styles from "./styles/settingStyles";
import CreateDate from "../../components/TimePickField";
import {useDispatch, useSelector} from "react-redux";
import {closeDraw, selectPost} from '../../redux/postSlice';
import Switch from '@material-ui/core/Switch';


const useStyles = makeStyles((theme) => styles(theme));

export function Setting({formikRef, onSubmit}) {
  const classes = useStyles();
  const timerId = React.createRef();
  const [autoSave, setAutoSave] = React.useState({
    start: false,
    open: false,
    time: 0
  });
  // 计时器
  React.useEffect(() => {
    if (timerId.current) {
      clearInterval(timerId.current);
    }
    if (autoSave.start && autoSave.open) {
      timerId.current = setInterval(() => {
        if (formikRef.current) {
          onSubmit(formikRef.current.values);
        }
      }, autoSave.time * 1000 * 60);
    }
    return () => clearInterval(timerId.current);
  }, [autoSave.time, autoSave.start, autoSave.open]);

  const {drawOpen} = useSelector(selectPost);
  const {values: {change_date, visibility}} = useFormikContext();
  const dispatch = useDispatch();
  return (
    <Drawer
      variant="persistent"
      anchor="right"
      open={drawOpen}
      classes={{paper: classes.drawerPaper}}
    >
      <Grid className={classes.container}>
        {/*占位,防止被导航栏遮挡*/}
        <div className={classes.placeholder}/>
        <FormControl>
          <InputLabel>状态</InputLabel>
          <Field
            name='visibility'
            as={Select}
            value={visibility}
          >
            {
              ["私密", "公开"].map(item => (
                <MenuItem key={item} value="私密">{item}</MenuItem>
              ))
            }
          </Field>
        </FormControl>
        <Tags/>
        <CreateDate/>
        <TextField label="修改日期" InputProps={{readOnly: true}} value={change_date}/>
        <Typography component="h2">
          摘录:
        </Typography>
        <Field
          as={TextareaAutosize}
          rowsMin={5}
          rowsMax={15}
          style={{
            width: '100%'
          }}
          name={'excerpt'}
        />
        <div>
          自动保存:
          <Switch
            checked={autoSave.open}
            onChange={(e) => {
              setAutoSave({
                ...autoSave,
                open: e.target.checked
              });
            }}
            color="primary"
            name="checkedB"
            inputProps={{'aria-label': 'primary checkbox'}}
          />
        </div>
        <TextField
          style={{
            display: autoSave.open ? '' : 'none'
          }}
          title={autoSave.time === 0 ? '自动保存已关闭' : `自动保存周期为${autoSave.time}分钟`}
          value={autoSave.time}
          id="outlined-number"
          label="自动保存周期(分钟)"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={e => {
            const time = e.target.value;
            console.log(time);
            if (time > 0) {
              setAutoSave({
                ...autoSave,
                time
              });
            } else {
              setAutoSave({
                ...autoSave,
                open: false
              });
            }
          }}
          // 失焦时开始计时
          onBlur={e => {
            if (autoSave.open && autoSave.time > 0) {
              setAutoSave({
                ...autoSave,
                start: true
              });
            }
          }}
        />
        <div className={classes.toolbar}>
          <IconButton onClick={() => {
            dispatch(closeDraw());
          }}>
            <ChevronRightIcon/>
          </IconButton>
        </div>
      </Grid>
    </Drawer>
  );
}

