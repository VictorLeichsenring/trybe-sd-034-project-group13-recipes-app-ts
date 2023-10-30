import { waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import Login from '../components/Login';

describe('Login Component', () => {
  test('test the login screen', async () => {
    const { getByTestId, getByRole } = renderWithRouter(<Login />);
    const user = userEvent;

    const titulo = getByRole('heading', { name: /login/i });
    expect(titulo).toBeInTheDocument();

    const email = getByTestId('email-input');
    expect(email).toBeInTheDocument();
    await user.type(email, 'alguem@email.com');

    const password = getByTestId('password-input');
    expect(password).toBeInTheDocument();
    await user.type(password, '1234567');

    const btn = getByTestId('login-submit-btn');
    await user.click(btn);
    waitFor(() => expect(btn).not.toBeDisabled());
  });
});
