
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Index from './pages/index';
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';
import axios from 'axios';
import { UserContextProvider } from './components/UserContext';
import AccountPage from './pages/accountPage';

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Index />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/account/:subpage?' element={<AccountPage />} />
          <Route path='/account/:subpage/:action' element={<AccountPage />} />
      </Route>
    </Routes>
    </UserContextProvider>
  );
}

export default App;
