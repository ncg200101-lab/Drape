// not checked *
import { render } from '@testing-library/react';
import { notification } from 'antd';
import { setAlert } from './myModule';

jest.mock('antd', () => ({
  notification: {
    config: jest.fn(),
    success: jest.fn(),
    error: jest.fn()
  }
}));

describe('setAlert', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should display a success notification', () => {
    setAlert('Success message', 'success');
    expect(notification.success).toHaveBeenCalledWith({
      message: expect.any(Object),
      icon: expect.any(Object),
      className: 'notification-success'
    });
  });

  it('should display an error notification', () => {
    setAlert('Error message', 'error');
    expect(notification.error).toHaveBeenCalledWith({
      message: expect.any(Object),
      icon: expect.any(Object),
      className: 'notification-error'
    });
  });

  it('should throw an error for invalid type', () => {
    expect(() => {
      setAlert('Invalid message', 'foo');
    }).toThrow('Invalid notification type "foo"');
  });
});
