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
  const handleSubmit = () => {
    localStorage.setItem('user', JSON.stringify(
      { email: user.email },
    ));
    navigate('/meals');
  };

  const emailValidate = /\S+@\S+\.\S+/.test(email);
  const passwordValidate = password.length > 6;
  const Validate = emailValidate && passwordValidate;

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
          type="button"
          data-testid="login-submit-btn"
          disabled={ !Validate }
          onClick={ handleSubmit }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
