import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AccountNav from '../components/AccountNav';

export default function PlacesPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get('/places').then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  return (
    <div>
      <AccountNav />
      <div className='text-center'>
        <h1 className='text-2xl mb-5'>My Places</h1>
        <Link
          className='inline-flex bg-primary text-white py-2 px-4 rounded-full'
          to={'/account/places/new'}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 6v12m6-6H6'
            />
          </svg>
          Add a new place
        </Link>
      </div>
      <div className='flex flex-col items-center mt-5'>
        {places.length > 0 &&
          places.map((place) => (
            <Link to={'/account/places/'+place_id} className='flex gap-4  bg-gray-200 p-2 rounded-2xl'>
              <div className='w-32 h-32 bg-gray-300 shrink-0'>
                {place.photos.length > 0 && (
                  <img
                    className='rounded-2xl'
                    src={place.photos[0]}
                    alt={place.title}
                  />
                )}
              </div>
              <div className='grow-0 shrink'>
                <h2 className='text-xl'>{place.title}</h2>
                <p className=' text-sm mt-2 text-gray-500'>{place.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
