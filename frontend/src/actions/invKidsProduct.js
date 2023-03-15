import { CatchError } from 'utils/CatchError';
import DFnewLogger from 'utils/DFnewLogger';
import Api from 'utils/Api';
import { setAlert } from './alert';

export const addKidsProduct = async (value, gender, actions) => {
  try {
    const res = await Api.post(
      `/adminventory/manage/invproduct/add/kid/${gender}`,
      value
    );
    if (res.data) {
      actions.resetForm();
      setAlert('Inventory product is added', 'success');
    } else {
      setAlert('Something went wrong', 'error');
    }
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};

export const editKidsProduct = async (value, gender, actions, navigate) => {
  try {
    const res = await Api.post(
      `/adminventory/manage/invproduct/edit/kid/${gender}`,
      value
    );
    if (res.data) {
      actions.resetForm();
      navigate('/dfinventory/product-list');
      setAlert('Inventory product is updated', 'success');
    } else {
      setAlert('Something went wrong', 'error');
    }
  } catch (err) {
    DFnewLogger(err);
    CatchError(err);
  }
};
