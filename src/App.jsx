import { Routes, Route } from 'react-router-dom';
//pages
import Welcome from './pages/Welcome';
import Signup from './pages/Signup';
import Login from './pages/Login';
//styles
import './stylesheets/index.scss';
import { AuthContextProvider } from './contexts/AuthContext';
function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/singup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
