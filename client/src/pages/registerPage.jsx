import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  async function registerUser(ev) {
    ev.preventDefault();
    try {
      await axios.post('/register', {
        name,
        email,
        password,
      });
      alert('Registration successful. Now you can log in');
      setRedirect(true);
    } catch (e) {
      alert('Registration failed. Please try again later');
    }
  }

  if (redirect) {
    return <Navigate to={'/login'} />;
  }

  return (
    <div className='py-4 px-8 flex flex-col min-h-screen max-w-4xl mx-auto'>
      <h1 className='text-4xl mb-4 text-center'>Register</h1>
      <form className='max-w-md mx-auto' onSubmit={registerUser}>
        <div className='flex flex-col mb-4'>
          <label className='text-gray-500 mb-2' htmlFor='name'>
            Name
          </label>
          <input
            className='bg-gray-100 border-2 border-gray-200 p-2 rounded-lg'
            type='text'
            placeholder='John Doe'
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            id='name'
          />
        </div>
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
          Register
        </button>
        <div className='text-center text-gray-500'>
          Already a member?{' '}
          <Link className='underline text-red-500' to={'/login'}>
            Log in
          </Link>
        </div>
      </form>
    </div>
  );
}
