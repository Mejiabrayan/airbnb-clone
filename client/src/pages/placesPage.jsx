import { Link, useParams } from 'react-router-dom';

export default function PlacesPage() {
  const { action } = useParams();
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
        <div className='flex flex-col justify-center'>
          <form>
            <h2 className='text-2xl mt-4 font-bold'>Add a new place</h2>
            <p className='text-gray-500 text-sm'>Title for your place.</p>
            <input
              className='max-w-md text-center'
              type='text'
              placeholder='title, for example: My Lovely Place'
            />
            <p className='text-gray-500 text-sm'>Description for your place.</p>
            <input
              className='max-w-md text-center'
              type='text'
              placeholder='address'
            />
            <h2 className='text-2xl mt-4 font-bold'>Photos</h2>
            <p className='text-gray-500 text-sm'>
              Add photos of your place. You can add up to 5 photos.
            </p>
            <div className='flex justify-center mt-1 gap-2'>
              <input
                className='max-w-sm text-center'
                type='text'
                placeholder={'upload..'}
              />
            </div>

            <div className='grid grid-cols-3 md:grid '>
              <button className='border bg-transparent rounded-2xl p-8 text-gray-600 '>
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
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
