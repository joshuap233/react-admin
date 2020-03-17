import React, {useState} from 'react';
import {IconButton, makeStyles} from '@material-ui/core';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import SaveIcon from '@material-ui/icons/Save';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import SettingsIcon from '@material-ui/icons/Settings';
import {useFormikContext} from "formik";
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';
import styles from './styles/speedSettingStyles';
import marked from '../../config/marked';
import BraftEditor from "braft-editor";
import {useDispatch} from "react-redux";
import {deletePost, openDraw} from '../../redux/postSlice';


const useStyles = makeStyles(theme => styles(theme));


export default function SpeedSetting({setDrawerOpen}) {
  const classes = useStyles();
  const [settingOpen, setSettingOpen] = useState(false);
  const {values, setFieldValue} = useFormikContext();
  const disPatch = useDispatch();

  function handleOnDelete(id) {
    disPatch(deletePost(id));
  }

  function handleFileUpload(e) {
    const file = e.target.files;
    if (file.length > 1) {
      alert("仅支持单个上传");
    }

    const reader = new FileReader();
    reader.readAsText(file[0]);
    reader.onload = function (res) {
      let htmlString = marked(res.target.result);
      setFieldValue('article', BraftEditor.createEditorState(htmlString));
    };
  }

  const actions = [
    {icon: <DeleteOutlineIcon/>, name: '删除', onClick: () => handleOnDelete(values.id)},
    {icon: <SaveIcon/>, name: '保存', type: "submit"},
    {icon: <SettingsIcon/>, name: '设置', onClick: () => disPatch(openDraw())},
    {icon: <UploadMarkdown {...{handleFileUpload}}/>, name: '上传markdown'},
  ];

  const handleClose = () => {
    setSettingOpen(false);
  };

  const handleOpen = () => {
    setSettingOpen(true);
  };

  return (
    <SpeedDial
      ariaLabel="setting"
      className={classes.speedDial}
      icon={<SpeedDialIcon/>}
      onClose={handleClose}
      onOpen={handleOpen}
      open={settingOpen}
    >
      {actions.map(({name, ...other}) => (
        <SpeedDialAction
          key={name}
          tooltipTitle={name}
          title={name}
          {...other}
        />
      ))}
    </SpeedDial>
  );
}

const UploadMarkdown = (props) => (<>
  <input
    style={{display: 'none'}}
    accept=".md"
    type="file"
    id="upload-file"
    multiple
    onChange={props.handleFileUpload}/>
  <label htmlFor="upload-file">
    <IconButton color="primary" component="span" style={{padding: 0, width: '100%', height: '100%'}}>
      <InsertDriveFileOutlinedIcon color="action"/>
    </IconButton>
  </label>
</>);
