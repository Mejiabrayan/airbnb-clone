import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function registerUser(ev) {
    ev.preventDefault();
    console.log(name, email, password);

    axios
      .post('/register', {
        name: name,
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className='mt-4 grow flex items-center justify-around'>
      <div className='mb-64'>
        <h1 className='text-4xl text-center mb-4'>Register</h1>
        <form className='max-w-md mx-auto'>
          <input
            type='text'
            placeholder='John Doe'
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <input type='email' placeholder='your@email.com' />
          <input
            type='email'
            placeholder='email'
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type='password'
            placeholder='confirm password'
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className='primary' onClick={registerUser}>
            Login
          </button>
          <div className='text-center py-2 text-gray-500'>
            Already have an account yet?{' '}
            <Link className='underline text-black' to='/login'>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}