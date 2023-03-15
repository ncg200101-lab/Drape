import { CatchError } from 'utils/CatchError';
import DFnewLogger from 'utils/DFnewLogger';
import Api from 'utils/Api';
import { setAlert } from './alert';

export const addWomenProduct = async (value, actions) => {
  try {
    const res = await Api.post(
      '/adminventory/manage/invproduct/add/women',
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

export const editWomenProduct = async (value, actions, navigate) => {
  try {
    const res = await Api.post(
      '/adminventory/manage/invproduct/edit/women',
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
