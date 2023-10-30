//hooks
import { Link } from 'react-router-dom';
//styles
import Activity from '../components/Activity';

import '../stylesheets/home.scss';

//misc

function Home() {
  return (
    <div className="home-container">
      <div className="app-links">
        <div className="profile">
          <Link to="/profile">
            <button className="btn">Your Profile</button>
          </Link>
        </div>
        <Activity />
      </div>
    </div>
  );
}

export default Home;
