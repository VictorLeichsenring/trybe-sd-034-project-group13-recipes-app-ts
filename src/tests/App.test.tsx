import renderWithRouter from '../helpers/renderWithRouter';

import App from '../App';

describe('Test App render', () => {
  test('Test the App render', async () => {
    renderWithRouter(<App />);
  });
});
