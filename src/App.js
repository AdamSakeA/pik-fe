import { Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import HomeUser from './pages/HomeUser';
import LoginUser from './pages/LoginUser';
import RegisterUser from './pages/RegisterUser';
import './styles/navbar.css';
import ShopUser from './pages/ShopUser';
import ErrorLogin from './pages/ErrorLogin';
import SuksesBuying from './pages/SuksesBuying';
import CoffeeBar from './pages/CoffeeBar';
import SettingsUser from './pages/SettingsUser';
import BuyingUser from './pages/BuyingUser';
import Footer from './components/Footer';


function App() {
  return (
      <div className="container">
        <Navbar />
        <Routes>
          <Route path='/' element={<HomeUser />} />
          <Route path='/login' element={<LoginUser />} />
          <Route path='/register' element={<RegisterUser />} />
          <Route path='/coffeebar' element={<CoffeeBar />} />
          <Route path='/products' element={<ShopUser />} />
          <Route path='/success' element={<SuksesBuying />} />
          <Route path='/userlogin' element={<ErrorLogin />} />
          <Route path='/settings' element={<SettingsUser />} />
          <Route path='/buyinguser' element={<BuyingUser />} />
        </Routes>
        <Footer />
      </div>
  );
}

export default App;
