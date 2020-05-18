import Register from "./Register";
import React, {useEffect, useState} from 'react';
import {Loading} from "../../components";
import {checkRegister} from '../../redux/userSlice';
import {useDispatch} from "react-redux";


function Index() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkRegister(setLoading));
  }, [dispatch]);

  return loading ?
    <Loading/> :
    <Register/>;
}

export default Index;
