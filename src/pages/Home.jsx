//hooks
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
//styles
import Navbar from '../components/Navbar';

import '../stylesheets/home.scss';

//misc

function Home() {
  const { user } = useAuthContext();

  return (
    <div className="home-container">
      <div className="app-links">
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
