//routing
import { Link } from 'react-router-dom';
//styles
import '../stylesheets/welcome.scss';
//misc. & images
import Logo from '../assets/hi5Boxbig.png';

function Welcome() {
  return (
    <div className="welcome-container">
      <img className="gym-logo" src={Logo} alt="gym logo" />
      <h1 className="page-heading">Welcome!</h1>
      <p>What would you like to do?</p>
      <Link to="/login">
        <button className="btn">Login</button>
      </Link>
      <Link to="/signup">
        <button className="btn">Sign Up</button>
      </Link>

      <Link to="/guest">
        <button className="btn">Continue as Guest</button>
      </Link>
    </div>
  );
}

export default Welcome;
