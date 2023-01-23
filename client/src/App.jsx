import { Routes, Route } from 'react-router-dom';
import Index from './pages/index';
import Login from './pages/login';
import Layout from './components/Layout';
import './App.css';
import RegisterPage from './pages/register-page';


function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Index />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<RegisterPage />} />
      </Route>
    </Routes>
  );
}

export default App;
