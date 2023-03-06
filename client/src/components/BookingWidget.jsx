import { useContext, useEffect, useState } from 'react';
import { differenceInCalendarDays } from 'date-fns';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../components/UserContext';

export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [redirect, setRedirect] = useState('');
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  async function bookThisPlace() {
    const response = await axios.post('/bookings', {
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      place: place._id,
      price: numberOfNights * place.price,
    });
    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className='bg-white shadow rounded-2xl p-4 mt-8'>
      <div className='text-2xl text-center font-bold'>
        Price: ${place.price} / per night
      </div>
      <div className='border rounded-2xl mt-4 p-4'>
        <div className='flex'>
          <div className='py-3 px-4 flex-1'>
            <label className='block font-bold'>Check in:</label>
            <input
              type='date'
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
              className='block w-full border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            />
          </div>
          <div className='py-3 px-4 flex-1 border-l'>
            <label className='block font-bold'>Check out:</label>
            <input
              type='date'
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
              className='block w-full border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            />
          </div>
        </div>
        <div className='py-3 px-4 border-t'>
          <label className='block font-bold'>Number of guests:</label>
          <input
            type='number'
            value={numberOfGuests}
            onChange={(ev) => setNumberOfGuests(ev.target.value)}
            className='block w-full border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
          />
        </div>
        {numberOfNights > 0 && (
          <div className='py-3 px-4 border-t'>
            <label className='block font-bold'>Your full name:</label>
            <input
              type='text'
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              className='block w-full border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            />
          </div>
        )}
        {numberOfNights > 0 && (
          <div className='py-3 px-4 border-t'>
            <label className='block font-bold'>Your phone number:</label>
            <input
              type='text'
              value={phone}
              onChange={(ev) => setPhone(ev.target.value)}
              className='block w-full border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            />
          </div>
        )}
        {numberOfNights > 0 && (
          <div className='py-3 px-4 border-t'>
            <div className='font-bold'>
              Total price for {numberOfNights} nights:{' '}
              {numberOfNights * place.price}$
            </div>
            <button
              onClick={bookThisPlace}
              className='bg-primary text-white px-4 py-2 rounded-md mt-4'
            >
              Book this place
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
