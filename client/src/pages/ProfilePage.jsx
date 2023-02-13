import { useContext, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { UserContext } from '../components/UserContext';
import AccountNav from '../components/AccountNav';
import axios from 'axios';
import PlacesPage from './placesPage';

export default function ProfilePage() {
  const [redirect, setDirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);

  // subpage is undefined when the user is on the /account route
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = 'profile';
  }
  console.log(subpage);

  // self explanatory function to handle logout 
  async function logout() {
    await axios.post('/logout');
    setDirect('/');
    setUser(null);
  }

  if (!ready) {
    return (
      <div className='mt-4 grow flex items-center justify-around animate-spin'>
        Loading...
      </div>
    );
  }

  if (ready && !user && !redirect) {
    return <Navigate to={'/login'} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <AccountNav />
      {subpage == 'profile' && (
        <div className='text-center max-w-lg mx-auto'>
          Logged in as {user.name} ({user.email}) <br />
          <button
            onClick={logout}
            className='bg-primary text-white px-4 py-2 rounded-full mt-2'
          >
            Logout
          </button>
        </div>
      )}
      {subpage == 'places' && <PlacesPage />}
    </div>
  );
}
