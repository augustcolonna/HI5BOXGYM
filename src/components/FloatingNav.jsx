//hooks
import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
//routing
import { Link } from 'react-router-dom';
//misc
import MenuIcon from '../assets/menu.svg';
//styles
import '../stylesheets/navbar.scss';

const allRoutes = ['Fitness', 'Synthetikeis', 'Soccer', 'Climbing', 'Information'];

function FloatingNav() {
  const [toggleNav, setToggleNav] = useState(false);

  const { user } = useAuthContext();

  const handleToggle = () => {
    setToggleNav(!toggleNav);
  };
  return (
    <div className="floating-container">
      {toggleNav ? (
        <div className="floating-nav">
          <Link to={`/profile/${user.uid}`}>
            <button className="btn">Your Profile</button>
          </Link>
          {allRoutes.map((route) => {
            return (
              <ul className="routes" key={route.name}>
                <Link to={`/${route.name}`}>
                  <li>{route}</li>
                </Link>
              </ul>
            );
          })}
        </div>
      ) : (
        ''
      )}
      <img onClick={handleToggle} className="menu-icon" src={MenuIcon} alt="menu icon" />
    </div>
  );
}

export default FloatingNav;
