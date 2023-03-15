import { render, fireEvent } from '@testing-library/react';
import AdminPrivateRoutes from './AdminPrivateRoutes';

describe('AdminPrivateRoutes', () => {
  it('should render the component when user is logged in and has role 100 or 101', () => {
    const mockUser = { role: 100 };
    const mockState = { auth: { user: mockUser } };
    jest.spyOn(ReactRedux, 'useSelector').mockImplementation(() => mockState);
    const { getByText } = render(<AdminPrivateRoutes />);
    expect(getByText('Component')).toBeInTheDocument();
  });

  it('should redirect to login page when user is not logged in', () => {
    const mockState = { auth: { user: null } };
    jest.spyOn(ReactRedux, 'useSelector').mockImplementation(() => mockState);
    const { getByText } = render(<AdminPrivateRoutes />);
    expect(getByText('Login')).toBeInTheDocument();
  });
});
