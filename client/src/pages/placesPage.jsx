import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AccountNav from '../components/AccountNav';

export default function PlacesPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get('/user-places').then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  return (
    <div>
      <AccountNav />
      <div className='flex justify-between items-center py-4 px-6 bg-white shadow-md mb-4 rounded-md'>
        <h1 className='text-2xl font-bold text-gray-800'>My Places</h1>
        <Link
          className='inline-flex items-center justify-center px-4 py-2 font-medium text-white bg-primary rounded-md'
          to='/account/places/new'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='w-6 h-6 mr-2'
          >
            <path d='M12 6v12m6-6H6'></path>
          </svg>
          Add a new place
        </Link>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {places.length > 0 &&
          places.map((place) => (
            <Link
              key={place._id}
              to={`/account/places/${place._id}`}
              className='flex flex-col bg-white shadow-md rounded-md overflow-hidden hover:shadow-lg transition duration-300 ease-in-out'
            >
              <div className='relative h-56'>
                {place.photos.length > 0 && (
                  <img
                    className='w-full h-full object-cover'
                    src={`http://localhost:4000/uploads/${place.photos[0]}`}
                    alt={place.title}
                  />
                )}
                <div className='absolute top-2 right-2 p-2 bg-white shadow-md rounded-full'>
                  <span className='font-bold text-gray-800 text-sm'>
                    {place.pricePerNight}
                  </span>
                </div>
              </div>
              <div className='px-4 py-2'>
                <h2 className='text-lg font-bold text-gray-800 mb-2'>
                  {place.title}
                </h2>
                <p className='text-gray-600 text-sm'>{place.description}</p>
              </div>
              {/* <div className='px-4 py-2 bg-gray-100 flex justify-between items-center'>
                <span className='text-gray-600 text-sm'>
                  {place.address.city}  {place.address.country}
                </span>
                
              </div> */}
            </Link>
          ))}
      </div>
    </div>
  );
}
