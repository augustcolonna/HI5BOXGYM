//routing
import { Routes, Route } from 'react-router-dom';
//pages
import Welcome from './pages/Welcome';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Profile from './pages/Profile';
//components
import FloatingNav from './components/FloatingNav';
//utilities

//hooks
import { useAuthContext } from './hooks/useAuthContext';
//styles
import './stylesheets/index.scss';

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
      {user && <FloatingNav />}
    </div>
  );
}

export default App;
