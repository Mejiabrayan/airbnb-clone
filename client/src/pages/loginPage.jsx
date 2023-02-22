import { Link, Navigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../components/UserContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      const { data } = await axios.post('/login', { email, password });
      setUser(data);
      alert('Login successful');
      setRedirect(true);
    } catch (e) {
      alert('Login failed');
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <div className='py-4 px-8 flex flex-col min-h-screen max-w-4xl mx-auto'>
      <h1 className='text-4xl mb-4 text-center'>Login</h1>
      <form className='max-w-md mx-auto' onSubmit={handleLoginSubmit}>
      
        <div className='flex flex-col mb-4'>
          <label className='text-gray-500 mb-2' htmlFor='email'>
            Email
          </label>
          <input
            className='bg-gray-100 border-2 border-gray-200 p-2 rounded-lg'
            type='email'
            placeholder='your@email.com'
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            id='email'
          />
        </div>
        <div className='flex flex-col mb-4'>
          <label className='text-gray-500 mb-2' htmlFor='password'>
            Password
          </label>
          <input
            className='bg-gray-100 border-2 border-gray-200 p-2 rounded-lg'
            type='password'
            placeholder='password'
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            id='password'
          />
        </div>
        <button className='bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg mb-4'>
          Sign in
        </button>
        <div className='text-center text-gray-500'>
            <br />
            <Link className='underline text-black' to={'/register'}>
              Don't have an account yet?
            </Link>
        </div>
      </form>
    </div>
  );
}
