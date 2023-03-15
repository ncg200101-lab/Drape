import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AuthRoutes from './AuthRoutes';

jest.mock('react-redux', () => ({
  useSelector: jest.fn()
}));

describe('AuthRoutes', () => {
  it('should render the component when isAuthenticated is false', () => {
    useSelector.mockImplementation(() => ({
      isAuthenticated: false
    }));

    const Component = () => <div>Component</div>;
    const { getByText } = render(<AuthRoutes component={Component} />);

    expect(getByText('Component')).toBeInTheDocument();
  });

  it('should navigate to "/" when isAuthenticated is true', () => {
    useSelector.mockImplementation(() => ({
      isAuthenticated: true
    }));

    const Component = () => <div>Component</div>;
    const { queryByText } = render(<AuthRoutes component={Component} />);

    expect(queryByText('Component')).not.toBeInTheDocument();
  });
});
