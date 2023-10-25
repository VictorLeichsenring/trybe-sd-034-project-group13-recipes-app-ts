import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  // função do Email
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUser({ ...user, email: value });
  };
  // função do Password
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUser({ ...user, password: value });
  };

  // função do botão enviar
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify(
      { email: user.email },
    ));
    navigate('/meals');
  };

  const emailValidacao = /\S+@\S+\.\S+/.test(email);
  const passwordValidacao = password.length > 6;
  const validacao = emailValidacao && passwordValidacao;

  return (
    <div>
      <form>
        <h2>Login</h2>
        <input
          type="email"
          data-testid="email-input"
          value={ email }
          onChange={ handleChangeEmail }
        />
        <input
          type="password"
          data-testid="password-input"
          value={ password }
          onChange={ handleChangePassword }
        />
        <button
          data-testid="login-submit-btn"
          disabled={ !validacao }
          onClick={ handleSubmit }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
