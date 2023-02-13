import React, { useEffect, useState } from 'react';
import Perks from './Perks';
import PhotosUploader from './PhotosUploader';
import AccountNav from './AccountNav';
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function PlacesFormPage() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);

  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState([]);

  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuest, setMaxGuest] = useState(1);
  const [redirect, setDirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/places/' + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuest(data.maxGuest);
    });
  }, [id]);

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

  async function addNewPlace(ev) {
    ev.preventDefault();
    await axios.post('/places', {
      title,
      address,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuest,
      addedPhotos,
    });
    setDirect(true);
  }

  if (redirect) {
    return <Navigate to={'/account/places'} />;
  }

  return (
    <>
      <div>
        <AccountNav />
        <form onSubmit={addNewPlace}>
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
          <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

          {preInput('Description', 'Description of your place.')}
          <textarea
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
          />
          {preInput('Perks', 'Add perks of your place.')}
          <div className='grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
            <Perks selected={perks} onChange={setPerks} />
          </div>
          {preInput('Extra Info', 'Add description')}
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
    </>
  );
}
