// not completed
import Api from 'utils/Api';
import { CatchError } from 'utils/CatchError';
import DFnewLogger from 'utils/DFnewLogger';
import { setAlert } from './alert';
import { EDIT_EMPLOYEE, GET_EMPLOYEE, TOGGLE_EMPLOYEE } from './types';

export const getEmployee = (data) => async (dispatch) => {
  try {
    const res = await Api.post('/admmain/manage/employee/tbllist', data);
    if (res.data) {
      dispatch({
        type: GET_EMPLOYEE,
        payload: res.data
      });
    } else {
      setAlert('Something went wrong', 'error');
    }
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

export const addEmployee = (values) => async (disaptch) => {
  try {
    DFnewLogger(values);
    const res = await Api.post('/admmain/manage/employee/create', values);
    if (res.data.includes('Employee is created')) {
      setAlert(res.data, 'success');
    }
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

export const changeEmployeePwd = async (values) => {
  try {
    DFnewLogger(values);
    const res = await Api.post('/admmain/manage/employee/changepwd', values);
    if (res.data.includes('Password is changed')) {
      setAlert(res.data, 'success');
    } else {
      setAlert('Something went wrong', 'error');
    }
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

export const editEmployee = (values) => async (dispatch) => {
  try {
    const res = await Api.post('/admmain/manage/employee/edit', values);
    if (res?.data?.msg.includes('Employee info is updated')) {
      setAlert(res.data.msg, 'success');
      dispatch({
        type: EDIT_EMPLOYEE,
        payload: res.data.data
      });
    } else {
      setAlert('Something went wrong', 'error');
    }
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

export const deleteEmployee = (values, data) => async (dispatch) => {
  try {
    console.log(values);
    const res = await Api.post('/admmain/manage/employee/delete', values);
    if (res.data === 'Employee account is deleted') {
      setAlert(res.data, 'success');
      dispatch(getEmployee(data));
    } else {
      setAlert('Something went wrong', 'error');
    }
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

export const toggleEmployeeActive = (values) => async (dispatch) => {
  try {
    console.log(values);
    const res = await Api.post('/admmain/manage/employee/toggleactive', values);
    if (
      res.data === 'Employee account is activated' ||
      res.data === 'Employee account is deactivated'
    ) {
      setAlert(res.data, 'success');
      dispatch({
        type: TOGGLE_EMPLOYEE,
        payload: values
      });
    } else {
      setAlert('Something went wrong', 'error');
    }
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};
