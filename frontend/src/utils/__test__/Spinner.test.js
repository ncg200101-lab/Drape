import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Spinner from './Spinner';

afterEach(cleanup);

describe('Spinner component', () => {
  it('renders the spinner', () => {
    const { getByTestId } = render(<Spinner />);
    expect(getByTestId('spinner')).toBeInTheDocument();
  });
});
