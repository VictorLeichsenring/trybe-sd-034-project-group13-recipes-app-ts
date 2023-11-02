import { useNavigate } from 'react-router-dom';
import { getFromLocalStorage } from '../services/localStorageUtils';

function Profile() {
  const navigate = useNavigate();
  const user = getFromLocalStorage('user', '');
  const { email } = user;

  function handleLogout() {
    localStorage.clear();
    navigate('/');
  }

  return (
    <div>
      <h1>Profile</h1>
      <p data-testid="profile-email">{ email }</p>
      <button
        data-testid="profile-done-btn"
        onClick={ () => navigate('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        data-testid="profile-favorite-btn"
        onClick={ () => navigate('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button
        data-testid="profile-logout-btn"
        onClick={ handleLogout }
      >
        Logout
      </button>
    </div>
  );
}
export default Profile;
