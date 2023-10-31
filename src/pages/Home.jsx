//hooks
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
//components
import Navbar from '../components/Navbar';
//styles
import '../stylesheets/home.scss';
//misc
import gymLogo from '../assets/hi5Boxbig.png';

function Home() {
  const { user } = useAuthContext();

  return (
    <div className="home-container">
      <div className="app-links">
        <img src={gymLogo} alt="gym logo" />
        <div className="profile">
          <Link to={`/profile/${user.uid}`}>
            <button className="btn">Your Profile</button>
          </Link>
        </div>
        <Navbar />
      </div>
    </div>
  );
}

export default Home;
