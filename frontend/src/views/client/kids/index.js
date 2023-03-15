import { useState, useEffect } from 'react';

import Top from './Top';
import TakeStyleQuiz from './TakeStyleQuiz';
import HowWorks from './HowWorks';
import Brands from '../components/Brands';
import FAQs from './FAQs';
import Feedbacks from './Feedbacks';

const Kids = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <Top isLoading={isLoading} />
      <TakeStyleQuiz isLoading={isLoading} />
      <HowWorks isLoading={isLoading} />
      <FAQs isLoading={isLoading} />
      <Feedbacks isLoading={isLoading} />
      <Brands isLoading={isLoading} />
    </>
  );
};

export default Kids;
