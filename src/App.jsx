//routing
import { Routes, Route, Navigate } from 'react-router-dom';
//pages
import Welcome from './pages/Welcome';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Information from './pages/Information';

//components
import FloatingNav from './components/FloatingNav';
//utilities

//hooks
import { useAuthContext } from './hooks/useAuthContext';
//styles
import './stylesheets/index.scss';
import CreateWorkout from './pages/CreateWorkout';
import Ftiness from './pages/Ftiness';

function App() {
  const { user, authIsReady } = useAuthContext();

  return (
    <div className="App">
      {authIsReady && (
        <Routes>
          <Route path="/" element={user ? <Navigate to="/home" /> : <Welcome />} />
          <Route path="/signup" element={user ? <Navigate to="/home" /> : <Signup />} />
          <Route path="/login" element={user ? <Navigate to="/home" /> : <Login />} />
          <Route path="/home" element={!user ? <Navigate to="/" /> : <Home />} />
          <Route path="/profile/:id" element={!user ? <Navigate to="/" /> : <Profile />} />
          <Route path="/information" element={!user || (user && <Information />)} />
          <Route path="/create-workout" element={user ? <CreateWorkout /> : <Welcome />} />
          <Route path="/fitness" element={!user ? <Navigate to="/" /> : <Ftiness />} />
        </Routes>
      )}
      {user && <FloatingNav />}
    </div>
  );
}

export default App;
