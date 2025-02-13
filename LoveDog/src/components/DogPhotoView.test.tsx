import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import {DogPhotoView} from './DogPhotoView';
import MockAdapter from 'axios-mock-adapter';
import {api} from '../utils/AxiosUtils';

describe('DogPhoto Render Test', () => {
  let mock: MockAdapter;

  beforeAll(() => {
    mock = new MockAdapter(api);
  });

  afterEach(() => {
    mock.reset();
  });
  test('DogPhotoView Render Snapshot', async () => {

    mock.onGet(new RegExp('/breeds/image/random')).reply(200, {
      message: 'Test Message',
      status: 'success',
    });
    const component = render(<DogPhotoView />);

    await waitFor(() => component.findByTestId('image'), {timeout: 10000});

    expect(component.toJSON()).toMatchSnapshot();
  });
});
