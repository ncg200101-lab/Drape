import PropTypes from 'prop-types';

import Profile from './Profile';
import Password from './Password';
import DFnewLogger from 'utils/DFnewLogger';

const Total = ({ value }) => {
  DFnewLogger(value);
  let content = null;
  switch (value) {
    case 0:
      content = <Profile />;
      break;
    case 1:
      content = <Password />;
      break;
    default:
      content = <Profile />;
      break;
  }
  return <>{content}</>;
};

Total.propTypes = {
  value: PropTypes.number
};

export default Total;
