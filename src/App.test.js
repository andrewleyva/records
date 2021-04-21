import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';

import { enableFetchMocks } from 'jest-fetch-mock';

import App from './App';

enableFetchMocks();

describe('App', () => {
  beforeEach(() => {
    fetch.resetMocks();
    fetch.doMock();
    fetch.mockResponseOnce(
      JSON.stringify({
        releases: [
          {
            id: 76035,
            basic_information: {
              master_id: 64128,
              title: 'Dirty Dancing',
              year: 2002,
              formats: [{ name: 'Vinyl' }],
              labels: [{ name: '!K7 Records' }],
              artists: [{ name: 'Swayzak' }],
            },
          },
        ],
      }),
    );
  });

  it('can add a shelf', async () => {
    const { asFragment } = render(<App />);
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    fireEvent.click(screen.getByText('Add Shelf'));
    fireEvent.change(screen.getByTestId('add-shelf'), {
      target: { value: 'first shelf' },
    });
    fireEvent.click(screen.getByText('Submit'));

    expect(asFragment()).toMatchSnapshot();
  });

  it('can remove a shelf', async () => {
    const { asFragment } = render(<App />);
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    fireEvent.click(screen.getByText('Add Shelf'));
    fireEvent.change(screen.getByTestId('add-shelf'), {
      target: { value: 'first shelf' },
    });
    fireEvent.click(screen.getByText('Submit'));

    fireEvent.click(screen.getByText('Remove'));
    expect(asFragment()).toMatchSnapshot();
  });
});
