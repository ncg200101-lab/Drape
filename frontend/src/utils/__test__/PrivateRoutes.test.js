import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useSelector } from 'react-redux';
import PrivateRoutes from './PrivateRoutes';

jest.mock('react-redux', () => ({
  useSelector: jest.fn()
}));

describe('PrivateRoutes', () => {
  it('should render component when isAuthenticated is true', () => {
    useSelector.mockImplementation(() => ({
      isAuthenticated: true
    }));

    const Component = () => <div>Component</div>;
    const { getByText } = render(<PrivateRoutes component={Component} />);

    expect(getByText('Component')).toBeInTheDocument();
  });

  it('should render Navigate to /login when isAuthenticated is false', () => {
    useSelector.mockImplementation(() => ({
      isAuthenticated: false
    }));

    const { getByText } = render(
      <PrivateRoutes component={() => <div>Component</div>} />
    );

    expect(getByText('/login')).toBeInTheDocument();
  });
});
