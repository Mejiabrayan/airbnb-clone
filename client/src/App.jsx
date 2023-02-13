import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Index from './pages/index';
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';
import axios from 'axios';
import { UserContextProvider } from './components/UserContext';
import ProfilePage from './pages/ProfilePage';
import PlacesPage from './pages/placesPage';
import PlacesFormPage from './components/PlacesFormPage';

axios.defaults.baseURL = 'http://127.0.0.1:4000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Index />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/account/:subpage?' element={<ProfilePage />} />
          <Route path='/account/places' element={<PlacesPage />} />
          <Route path='/account/places/new' element={<PlacesFormPage />} />
          <Route path='/account/places/:id' element={<PlacesFormPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
