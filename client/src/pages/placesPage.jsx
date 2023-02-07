import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Perks from '../components/Perks';
import axios from 'axios';

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
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function addPhotoByLink(ev) {
    ev.preventDefault();
    const { data: filename } = await axios.post('/upload-by-link', {
      link: photoLink,
    });
    setAddedPhotos((prev) => {
      return [...prev, filename];
    });
    setPhotoLink(''); // clear the input field after the photo is added
  }

  function uploadPhoto(ev) {
    const files = ev.target.files;
    const data = new FormData();
    for(let i = 0; i < files.length; i++) {
    data.append('photos', files[i]);
    }
    axios
      .post('/upload', data, {
        headers: { 'Content-type': 'multipart/form-data' },
      })
      .then((response) => {
        const { data: filenames } = response;
        setAddedPhotos((prev) => {
          return [...prev, ...filenames];
        });
      });
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
              className='max-w-md '
              type='text'
              placeholder='address'
            />
            {preInput('Photos', 'Add photos of your place.')}
            <div className='flex gap-2'>
              <input
                value={photoLink}
                onChange={(ev) => setPhotoLink(ev.target.value)}
                className='max-w-sm'
                type='text'
                placeholder={'upload...'}
              />
              <button
                onClick={addPhotoByLink}
                className='bg-gray-200 px-4 rounded-2xl w-auto '
              >
                Add Photo{' '}
              </button>
            </div>
            <div className='grid gap-2 mt-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
              {addedPhotos.length > 0 &&
                addedPhotos.map((link) => {
                  return (
                    <div className='h-32 flex' key={link}>
                      <img
                        src={'http://localhost:4000/uploads/' + link}
                        className='rounded-2xl w-full h-32 object-cover object-center'
                      />
                      <button className='absolute top-0 right-0 bg-red-500 rounded-full w-6 h-6'>
                        X
                      </button>
                    </div>
                  );
                })}
              <label className='h-32 cursor-pointer flex gap-1 items-center justify-center  border bg-transparent rounded-2xl p-2 text-gray-600'>
                <input type='file' multiple className='hidden' onChange={uploadPhoto} />
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
              </label>
            </div>
            {preInput('Description', 'Description of your place.')}
            <textarea
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
            />
            {preInput('Perks', 'Add perks of your place.')}
            <div className='grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
              <Perks selected={perks} onChange={setPerks} />
            </div>
            {preInput('Description', 'Add description')}
            <textarea
              value={extraInfo}
              onChange={(ev) => setExtraInfo(ev.target.value)}
            />
            {preInput('Check in time and Max Number of Guest', '16:00')}
            <div className='grid sm:grid-cols-3'>
              <h3 className='mt-2 -mb-1'>Check in time</h3>
              <input
                value={checkIn}
                onChange={(ev) => setCheckIn(ev.target.value)}
                type='text'
                placeholder='14:00'
              />
            </div>
            <div>
              <h3 className='mt-2 -mb-1'>Check out time</h3>
              <input
                value={checkOut}
                onChange={(ev) => setCheckOut(ev.target.value)}
                type='text'
                placeholder='11:00'
              />
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
