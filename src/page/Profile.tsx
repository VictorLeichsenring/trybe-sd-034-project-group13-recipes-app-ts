import { getFromLocalStorage } from '../services/localStorageUtils';

function Profile() {
  const user = getFromLocalStorage('user', '');
  const { email } = user;

  return (
    <div>
      <h1>Profile</h1>
      <p data-testid="profile-email">{ email }</p>
      <button data-testid="profile-done-btn">Done Recipes</button>
      <button data-testid="profile-favorite-btn">Favorite Recipes</button>
      <button data-testid="profile-logout-btn">Logout</button>
    </div>
  );
}
export default Profile;
