import { Routes, Route } from 'react-router-dom';
//pages
import Welcome from './pages/Welcome';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
//styles
import './stylesheets/index.scss';
import { AuthContextProvider } from './contexts/AuthContext';
function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
