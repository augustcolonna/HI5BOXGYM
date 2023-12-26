//hooks
import { useParams } from "react-router-dom";
import { useDocument } from "../hooks/useDocument";
import { useState } from "react";
import { useLogout } from "../hooks/useLogOut";
import { useAuthContext } from "../hooks/useAuthContext";

//components

import UpdateProfile from "../components/UpdateProfile";
import defaultIcon from "../assets/deafaultuser.svg";
//styles
import "../stylesheets/profile.scss";

function Profile() {
  const { id } = useParams();
  const { document, error } = useDocument("users", id);
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
    <div className="profile-info-container">
      {!toggleUpdateProfile && (
        <h2>
          Profile Information <br></br>
          <span>{user.displayName}</span>
          <br></br>
          {document.membershipType ? (
            <span>Membership: {document.membershipType.label}</span>
          ) : null}
        </h2>
      )}
      {!toggleUpdateProfile && (
        <div className="profile-mid-container">
          <div className="profile-image">
            {user.photoURL ? (
              <img src={user.photoURL} />
            ) : (
              <img src={defaultIcon} />
            )}
          </div>
          <div className="profile-btns">
            <button className="btn" onClick={toggleUpdate}>
              Update Profile
            </button>
            {user && !toggleUpdateProfile && !isPending && (
              <button className="btn" onClick={logout}>
                Logout
              </button>
            )}
            {user && !toggleUpdateProfile && isPending && (
              <button className="btn" disabled>
                Logging Out...
              </button>
            )}
          </div>
        </div>
      )}
      {toggleUpdateProfile && (
        <UpdateProfile toggleUpdate={toggleUpdate} profile={document} />
      )}
      {!toggleUpdateProfile && <div className="user-id-qrcode">{user.uid}</div>}
    </div>
  );
}

export default Profile;
