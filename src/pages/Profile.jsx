//hooks
import { useParams } from 'react-router-dom';
import { useDocument } from '../hooks/useDocument';
import { useState } from 'react';
import { useLogout } from '../hooks/useLogOut';
import { useAuthContext } from '../hooks/useAuthContext';

//components
import Navbar from '../components/Navbar';

//styles

function Profile() {
  const { id } = useParams();
  const { document, error } = useDocument('users', id);
  const { logout, isPending } = useLogout();
  const { user } = useAuthContext();

  const [toggleUpdateProfile, setToggleUpdateProfile] = useState(false);

  const toggleUpdate = () => {
    setToggleUpdateProfile(!toggleUpdateProfile);
    console.log(toggleUpdateProfile);
  };

  if (error) {
    return <p className="error">{error}</p>;
  }
  if (!document) {
    return <div className="loading">loading profile...</div>;
  }
  return (
    <div className="profile-info">
      <h2>Profile Information</h2>
      <button className="btn" onClick={toggleUpdate}>
        Update Profile Information
      </button>
      {user && !isPending && (
        <button className="btn" onClick={logout}>
          Logout
        </button>
      )}
      {user && isPending && (
        <button className="btn" disabled>
          Logging Out...
        </button>
      )}
      <div>
        <Navbar />
      </div>
    </div>
  );
}

export default Profile;
