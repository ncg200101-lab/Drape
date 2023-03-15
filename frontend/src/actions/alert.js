import { Typography } from '@mui/material';
import { notification } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck,
  faTriangleExclamation
} from '@fortawesome/free-solid-svg-icons';

import DFnewLogger from 'utils/DFnewLogger';

export const setAlert = (msg, type) => {
  notification.config({
    placement: 'topRight',
    top: 80,
    duration: 3
  });
  try {
    notification[type]({
      message: <Typography className="notification-message">{msg}</Typography>,
      icon: (
        <FontAwesomeIcon
          icon={type === 'success' ? faCircleCheck : faTriangleExclamation}
          style={{ color: '#fff', fontSize: '24px', fontWeight: 600 }}
        />
      ),
      className: `notification-${type}`
    });
  } catch (e) {
    DFnewLogger(e);
  }
};
