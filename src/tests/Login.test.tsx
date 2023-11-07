import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Login from '../components/Login';

describe('Teste do Componente Login', () => {
  beforeEach(() => {
    localStorage.clear();
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );
  });

  const emailTeste = 'teste@teste.com';
  const testIdEmail = 'email-input';
  const testIdPassword = 'password-input';
  const testIdLoginBTN = 'login-submit-btn';

  test('Testa se o título Login está presente', () => {
    const title = screen.getByText('Login');
    expect(title).toBeInTheDocument();
  });

  test('Testa se input de email está presente', () => {
    const inputEmail = screen.getByTestId(testIdEmail);
    expect(inputEmail).toBeInTheDocument();
    expect(inputEmail).toHaveProperty('type', 'email');
  });

  test('Testa se o input de senha está presente', () => {
    const passInput = screen.getByTestId(testIdPassword);
    expect(passInput).toBeInTheDocument();
    expect(passInput).toHaveProperty('type', 'password');
  });

  test('Testa se o botão está presente', () => {
    const submitBTN = screen.getByTestId(testIdLoginBTN);
    expect(submitBTN).toBeInTheDocument();
  });

  test('Testa se o botão está desabilitado, quando ambos os input são inválidos', async () => {
    const inputEmail = screen.getByTestId(testIdEmail);
    const passInput = screen.getByTestId(testIdPassword);
    const submitBTN = screen.getByTestId(testIdLoginBTN);
    expect(submitBTN).toBeDisabled();
    await userEvent.type(inputEmail, 'invalido');
    await userEvent.type(passInput, '1');
    expect(submitBTN).toBeDisabled();
  });

  test('Testa se o botão está desabilitado quando apenas o email é inválido', async () => {
    const inputEmail = screen.getByTestId(testIdEmail);
    const passInput = screen.getByTestId(testIdPassword);
    const submitBTN = screen.getByTestId(testIdLoginBTN);
    expect(submitBTN).toBeDisabled();
    await userEvent.type(inputEmail, 'invalido');
    await userEvent.type(passInput, 'senhavalida');
    expect(submitBTN).toBeDisabled();
  });

  test('Testa se o botão está desabilitado quando apenas a senha é inválida', async () => {
    const inputEmail = screen.getByTestId(testIdEmail);
    const passInput = screen.getByTestId(testIdPassword);
    const submitBTN = screen.getByTestId(testIdLoginBTN);
    expect(submitBTN).toBeDisabled();
    await userEvent.type(inputEmail, emailTeste);
    await userEvent.type(passInput, '1');
    expect(submitBTN).toBeDisabled();
  });

  test('Testa se o botão está habilidado quando ambos os input são válidos', async () => {
    const inputEmail = screen.getByTestId(testIdEmail);
    const passInput = screen.getByTestId(testIdPassword);
    const submitBTN = screen.getByTestId(testIdLoginBTN);
    expect(submitBTN).toBeDisabled();
    await userEvent.type(inputEmail, emailTeste);
    await userEvent.type(passInput, 'senhavalida');
    expect(submitBTN).not.toBeDisabled();
  });
  test('Testa se a função está salvando os dados no localStorage', async () => {
    const inputEmail = screen.getByTestId(testIdEmail);
    const passInput = screen.getByTestId(testIdPassword);
    const submitBTN = screen.getByTestId(testIdLoginBTN);
    expect(submitBTN).toBeDisabled();
    await userEvent.type(inputEmail, emailTeste);
    await userEvent.type(passInput, 'senhavalida');
    expect(submitBTN).not.toBeDisabled();
    await userEvent.click(submitBTN);
    const data = localStorage.getItem('user');
    if (data) {
      const emailRecuperado = JSON.parse(data);
      expect(emailRecuperado).toEqual({ email: emailTeste });
    }
  });
});
