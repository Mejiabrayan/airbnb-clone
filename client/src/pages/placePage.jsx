import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
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
      <h2 className='text-gray-500 text-lg mb-4'>{place.address}</h2>
      <p className='text-gray-600 mb-8'>{place.description}</p>
      <div className='flex items-center justify-between mb-8'>
        <span className='text-2xl font-bold'>${place.price}</span>
        <button className='bg-primary text-white py-2 px-4 rounded-md'>
          Book Now
        </button>
      </div>
      <div className='grid gap-2 grid-cols-[2fr_1fr]'>
        <div>
          {place.photos?.[0] && (
            <img
              className='rounded-2xl object-cover aspect-square'
              src={'http://localhost:4000/uploads/' + place.photos?.[0]}
              alt=''
            />
          )}
        </div>
        <div>
          {place.photos?.[1] && (
            <img
              className='rounded-2xl object-cover aspect-square'
              src={'http://localhost:4000/uploads/' + place.photos?.[1]}
              alt=''
            />
          )}
        <div>
          {place.photos?.[2] && (
            <img
              className='rounded-2xl object-cover aspect-square'
              src={'http://localhost:4000/uploads/' + place.photos?.[2]}
              alt=''
            />
          )}
        </div>
        </div>
      </div>
    </div>
  );
}
