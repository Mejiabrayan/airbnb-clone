import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { BiMap } from 'react-icons/bi';
import BookingWidget from '../components/BookingWidget';

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return '';

  return (
    <div className='py-4 px-8 flex flex-col min-h-screen max-w-4xl mx-auto'>
      <h1 className='text-3xl font-bold mb-2'>{place.title}</h1>
      <Link
        to='#'
        className='flex items-center gap-2 font-semibold underline text-gray-600 mb-4'
      >
        <BiMap className='text-gray-400 text-2xl' />
        <span>{place.address}</span>
      </Link>
      <h2 className='text-2xl font-bold mb-4'>About this place</h2>
      <p className='text-gray-600 mb-8'>{place.description}</p>
      <div className='flex flex-col md:flex-row items-center justify-between mb-8'>
        <span className='text-2xl font-bold'>${place.price}</span>
        <div className='flex gap-2'>
          <button className='bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-md transition-colors duration-300'>
            Book Now
          </button>
          <button
            onClick={() => setShowAllPhotos(true)}
            className='bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-md transition-colors duration-300'
          >
            Show more photos
          </button>
        </div>
      </div>
      <div className='grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 rounded-2xl overflow-hidden'>
        {place.photos?.map((photo, index) => (
          <div
          onClick={() => setShowAllPhotos(true)}
            key={index}
            className='relative overflow-hidden flex justify-center items-center cursor-pointer'
          >
            <img
              src={'http://localhost:4000/uploads/' + photo}
              alt=''
              className='max-w-full max-h-full object-cover transition-transform duration-300 transform hover:scale-110'
            />
            {index === 0 && (
              <div className='absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent text-white py-2 px-4'>
                <h2 className='text-lg font-bold'>{place.title}</h2>
                <span>{place.address}</span>
              </div>
            )}
          </div>
        ))}
      </div>
      {showAllPhotos && (
        <div className='fixed inset-0 z-50 bg-black bg-opacity-90'>
          <div className='max-w-4xl mx-auto p-8'>
            <h2 className='text-3xl font-bold mb-4 text-white'>
              {place.title}
            </h2>
            <button
              className='bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-2xl transition-colors duration-300'
              onClick={() => setShowAllPhotos(false)}
            >
              Back
            </button>
            <div className='grid gap-2 md:grid-cols place-items-center mt-8'>
              <div className='flex flex-wrap justify-center max-h-96 overflow-auto'>
                {place.photos?.map((photo, index) => (
                  <img
                    key={index}
                    src={'http://localhost:4000/uploads/' + photo}
                    alt=''
                    className='max-w-full max-h-full object-cover'
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      <BookingWidget place={place} />
    </div>
  );
}
