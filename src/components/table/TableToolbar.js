import React from 'react';

import clsx from 'clsx';
import DeleteIcon from '@material-ui/icons/Delete';
import GlobalFilter from './GlobalFilter';
import IconButton from '@material-ui/core/IconButton';
import {lighten, makeStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from "@material-ui/icons/Add";

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {
    flex: '1 1 100%',
  },
}));

const TableToolbar = props => {
  const classes = useToolbarStyles();
  const {
    numSelected,
    deleteHandler,
    globalFilter,
    preGlobalFilteredRows,
    setGlobalFilter,
    handleAddRow,
    tableName
  } = props;
  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div>
        <Tooltip title="Add">
          {/*onClick={() => openDialog('add')}*/}
          <IconButton aria-label="add" onClick={handleAddRow}>
            <AddIcon/>
          </IconButton>
        </Tooltip>
      </div>
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle">
          {tableName}
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={deleteHandler}>
            <DeleteIcon/>
          </IconButton>
        </Tooltip>
      ) : (
        <GlobalFilter
          {...{
            globalFilter,
            preGlobalFilteredRows,
            setGlobalFilter
          }}
        />
      )}
    </Toolbar>
  );
};

export default TableToolbar;
