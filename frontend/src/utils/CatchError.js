import { setAlert } from 'actions/alert';

export const CatchError = (err) => {
  if (err?.response?.status === 422) {
    const errmsgs = err?.response?.data?.errors;
    if (errmsgs) {
      errmsgs.forEach((error) => {
        if (error !== 'Invalid value') {
          setAlert(error, 'error');
        }
      });
    }
  } else {
    const errmsg = err?.response?.data?.msg;
    if (errmsg) {
      setAlert(errmsg, 'error');
    }
  }
};
