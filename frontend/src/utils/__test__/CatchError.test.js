import { setAlert } from 'actions/alert';

describe('CatchError', () => {
  it('should call setAlert with error message when err.response.status is 422', () => {
    const err = {
      response: {
        status: 422,
        data: { errors: ['Invalid value', 'Error message'] }
      }
    };
    const spy = jest.spyOn(global, 'setAlert');
    CatchError(err);
    expect(spy).toHaveBeenCalledWith('Error message', 'error');
  });

  it('should call setAlert with error message when err.response.data.msg exists', () => {
    const err = { response: { data: { msg: 'Error message' } } };
    const spy = jest.spyOn(global, 'setAlert');
    CatchError(err);
    expect(spy).toHaveBeenCalledWith('Error message', 'error');
  });
});
