import React, {useCallback} from 'react';
import {Container} from "@material-ui/core";
import Table from '../../components/table';
import EditorDialog from './EditorDialog';
import {
  addTag,
  closeDialog as _closeDialog,
  initDialog,
  selectTag,
  setDialogAsUpdate,
  setTagValue,
} from '../../redux/tagSlice';
import api from '../../helpers/http';
import {useDispatch, useSelector} from "react-redux";

const Tags = React.memo(function Tags({columns}) {
  const {form, dialogState} = useSelector(selectTag);
  return <ContextTags {...{form, dialogState, columns}}/>;
});

function ContextTags({form, dialogState, columns}) {
  const dispatch = useDispatch();

  // 表格"+" 按钮
  const handleAddRow = useCallback(() => {
    dispatch(initDialog());
    dispatch(addTag());
  }, [dispatch]);

  // 表单编辑按钮
  const handleEditor = useCallback(({original}) => {
    dispatch(setTagValue(original));
    dispatch(setDialogAsUpdate());
  }, [dispatch]);

  const closeDialog = useCallback(() => {
    dispatch(_closeDialog());
  }, [dispatch]);

  const _api = React.useMemo(() => ({
    query: api.queryTags,
    delete: api.deleteTag,
    modify: api.modifyTag,
  }), []);

  return (
    <Container maxWidth={false}>
      <Table
        tableName={'标签'}
        renderDialog={(updateHandler) => (
          <EditorDialog {...{
            updateHandler,
            dialogInit: form,
            dialogState,
            closeDialog,
          }}/>)
        }
        handleAddRow={handleAddRow}
        handleEditor={handleEditor}
        columns={columns}
        api={_api}/>
    </Container>
  );
}

export default React.memo(Tags);
