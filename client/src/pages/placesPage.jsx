import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Perks from '../components/Perks';

export default function PlacesPage() {
  const { action } = useParams();

  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState('');
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState([]);

  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuest, setMaxGuest] = useState(1);

  function inputHeader(text) {
    return <h2 className='text-2xl mt-4 '>{text}</h2>;
  }

  function inputDescription(text) {
    return <p className='text-gray-500 text-sm'>{text}</p>;
  }

  function preInput(header, description) {
    return (
      <div>
        {inputHeader(header)}
        {inputDescription(description)}
      </div>
    );
  }

  function addPhotoByLink(){
    
  }
  return (
    <div>
      {action !== 'new' && (
        <div className='text-center'>
          <Link
            className='inline-flex bg-primary text-white py-2 px-4 rounded-full'
            to={'/account/places'}
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
      )}

      {action === 'new' && (
        <div>
          <form>
            {preInput('Add a new place', 'Title for your place.')}
            <input
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
              className='max-w-md '
              type='text'
              placeholder='title, for example: My Lovely Place'
            />
            {preInput('Address', 'Address of your place.')}
            <input 
            value={address}
            onChange={(ev) => setAddress(ev.target.value)}
            className='max-w-md ' type='text' placeholder='address'
               />
            {preInput('Photos', 'Add photos of your place.')}
            <div className='flex mt-1 gap-2'>
              <input
                value={photoLink}
                onChange={(ev) => setPhotoLink(ev.target.value)}
                className='max-w-sm'
                type='button'
                placeholder={'upload..'}
              />
              <button className='bg-gray-200 px-4 rounded-2xl w-auto '>
                Add Photo{' '}
              </button>
            </div>
            <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
              <button className='flex gap-1 justify-center border bg-transparent rounded-2xl p-8 text-gray-600'>
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
                    d='M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z'
                  />
                </svg>
                Upload
              </button>
            </div>
            {preInput('Description', 'Description of your place.')}
            <textarea
            value={description} onChange={(ev) => setDescription(ev.target.value)}
             />
            {preInput('Perks', 'Add perks of your place.')}
            <div className='grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
              <Perks selected={perks} onChange={setPerks} />
            </div>
            {preInput('Description', 'Add description')}
            <textArea
            value={extraInfo} onChange={(ev) => setExtraInfo(ev.target.value)}
             />
            {preInput('Check in time and Max Number of Guest', '16:00')}
            <div className='grid sm:grid-cols-3'>
              <h3 className='mt-2 -mb-1'>Check in time</h3>
              <input 
              value={checkIn} 
              onChange={(ev) => setCheckIn(ev.target.value)}
              type='text'
               placeholder='14:00' />
            </div>
            <div>
              <h3 className='mt-2 -mb-1'>Check out time</h3>
              <input 
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
              type='text'
              placeholder='11:00' />
            </div>
            <div>
              <h3 className='mt-2 -mb-1'>Max number of guest </h3>
              <input 
              value={maxGuest}
              onChange={(ev) => setMaxGuest(ev.target.value)}
              type='number'
               />
            </div>
            <button className='primary my-4'>Save</button>
          </form>
        </div>
      )}
    </div>
  );
}
