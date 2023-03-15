import React from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';

import App from '../App';
import store from '../store';

describe('<App /> component', () => {
  const appProviderWrap = (
    <Provider store={store}>
      <App />
    </Provider>
  );

  //-- Test that the component renders without errors
  it('renders without crashing', async () => {
    render(appProviderWrap);

    await waitFor(() => {
      expect(document.querySelector('body')).toBeDefined();
    });
    expect(document.querySelector('.loader-container')).toBeNull();
  });

  //-- Test that clicking "back to top" button scrolls to the top of the page
  it('scrolls to the top of the page when "back to top" button is clicked', async () => {
    render(appProviderWrap);

    window.scrollBy(0, 200);

    const backButton = document.querySelector('button[type="button"]');
    await userEvent.click(backButton);

    await waitFor(() => {
      expect(window.scrollY).toEqual(0);
    });
  });
});
