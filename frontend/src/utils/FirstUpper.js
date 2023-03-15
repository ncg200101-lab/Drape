import DFnewLogger from './DFnewLogger';

export const FirstUpper = (word) => {
  try {
    return word.charAt(0).toUpperCase() + word.slice(1);
  } catch (e) {
    DFnewLogger(e);
    return '';
  }
};
