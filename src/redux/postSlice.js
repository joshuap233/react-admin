import {createSlice} from '@reduxjs/toolkit';
import {formatTime} from "../helpers/datetime";
import api from "../helpers/http";
import {toAdmin, toPost} from "../history";
import {addErrorMessage, addLoadingMessage, addSuccessMessage, setMessageState} from './globalSlice';
import {v4 as uuidV4} from 'uuid';


export const slice = createSlice({
  name: 'post',
  initialState: {
    form: {
      id: -1,
      title: '',
      tags: [],
      visibility: '私密',
      // excerpt: '',
      // article: 'test',
      allTags: [],
      comments: 0,
      create_date: formatTime(new Date()),
      change_date: formatTime(new Date())
    },
    errors: {name: '', value: ''},
    drawOpen: true,
    autoSave: {
      open: true,
      time: 1
    }
  },
  reducers: {
    initState(state, action) {
      state.form = {...state.form, ...action.payload};
    },
    addAllTags(state, action) {
      state.form.allTags = action.payload;
    },
    closeDrawer(state) {
      state.drawOpen = false;
    },
    openDraw(state) {
      state.drawOpen = true;
    },
    setAutoSaveTime(state, action) {
      state.autoSave.time = action.payload;
    },
    setAutoSaveChecked(state, action) {
      state.autoSave.open = action.payload;
    },
    changePostFormField(state, action) {
      const {name, value} = action.payload;
      state.form[name] = value;
    },
    changePostFormError(state, action) {
      const {name, value} = action.payload;
      state.errors = {name, value};
    },
    clearPostFormError(state) {
      state.errors = {name: '', value: ''};
    }
  }
});
export const {initState, addAllTags} = slice.actions;
export const {closeDrawer, openDraw} = slice.actions;
export const {setAutoSaveTime, setAutoSaveChecked} = slice.actions;
export const {changePostFormField, changePostFormError, clearPostFormError} = slice.actions;


export const getAllTags = () => dispatch => {
  api.getAllTags().then(res => {
    dispatch(addAllTags(res.data));
  });
};

// 所有api统一通过dispatch调用,即使没有修改redux数据
export const modifyPost = (data, postId) => dispatch => {
  api.modifyPost(data, postId).then(res => {
    if (res.status === 'success') {
      dispatch(addSuccessMessage('上传成功'));
    } else {
      dispatch(addErrorMessage('上传失败'));
    }
  });
};

// id为列表
export const deletePost = (id) => dispatch => {
  api.deletePost({id_list: id}).then(res => {
    if (res.status === 'success') {
      toAdmin();
      dispatch(addSuccessMessage('删除成功'));
    } else {
      dispatch(addErrorMessage('删除失败'));
    }
  });
};

export const addPost = () => dispatch => {
  api.addPost().then(res => {
    const {status, data} = res;
    if (status === 'success' && data.id) {
      toPost(data.id);
      dispatch(addSuccessMessage('创建文章成功'));
    } else {
      dispatch(addErrorMessage('删除成功'));
    }
  });
};

export const addPostImg = (form, postId, successFn, errorFn) => dispatch => {
  const messageId = uuidV4();
  dispatch(addLoadingMessage({id: messageId, message: '正在上传图片'}));
  api.addPostImg(form, postId).then(res => {
    const {data, status} = res;
    if (status === 'success') {
      successFn(data);
      dispatch(setMessageState({id: messageId, state: 'success', message: '图片上传成功'}));
    } else {
      errorFn();
      dispatch(setMessageState({id: messageId, state: 'error', message: '图片上传失败'}));
    }
  });
};

export const selectPost = state => state.post;

export default slice.reducer;
