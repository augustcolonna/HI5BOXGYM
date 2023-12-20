//hooks
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import Select from "react-select";
//styles
import "../stylesheets/profile.scss";
//firestore imports
import { updateDoc, doc } from "firebase/firestore";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { db, storage } from "../firebase/firebaseconfig";

const membershipCategories = [
  { value: "student", label: "Student" },
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
  { value: "punch card", label: "Punch Card" },
  { value: "adult", label: "adult" },
  { value: "other", label: "Other" },
];

// eslint-disable-next-line react/prop-types
function UpdateProfile({ toggleUpdate }) {
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  const [membershipType, setMemberShipType] = useState("");
  const [updatingProfile, setUpdatingProfile] = useState(false);

  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdatingProfile(true);
    const updateRef = doc(db, "users", user.uid);
    await updateDoc(updateRef, { membershipType: membershipType });
    if (thumbnail == null) {
      return;
    }
    const imageRef = ref(storage, `thumbnails/${user.uid}/${thumbnail.name}`);
    await uploadBytes(imageRef, thumbnail).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        updateProfile(user, {
          photoURL: url,
        });
      });
    });
    setUpdatingProfile(false);
    console.log(user);
  };

  const handleFileChange = (e) => {
    setThumbnail(null);
    let selected = e.target.files[0];

    if (!selected) {
      setThumbnailError("please select a file");
      return;
    }
    if (!selected.type.includes("image")) {
      setThumbnailError("selected file must be an image");
      return;
    }
    if (selected.size > 250000) {
      setThumbnailError("file size must be less than 100kb");
      return;
    }

    setThumbnailError(null);
    setThumbnail(selected);
    console.log("thumbnail updated");
  };

  return (
    <div className="update-container">
      <h2>Update Profile</h2>
      <form className="update-form" onSubmit={handleSubmit}>
        <label className="update-form-label">
          <p>Profile Picture</p>
          <img src={user.photoURL} />
          <input type="file" onChange={handleFileChange} />
          {thumbnailError && <div className="error">{thumbnailError}</div>}
        </label>
        <label className="update-form-label">
          <p>Membership type</p>
          <Select
            onChange={(option) => setMemberShipType(option)}
            options={membershipCategories}
          />
        </label>
        {!updatingProfile && <button className="btn">Save</button>}
        {updatingProfile && (
          <button className="btn" disabled>
            Updating...
          </button>
        )}
      </form>
      <button className="btn" onClick={toggleUpdate}>
        Done
      </button>
    </div>
  );
}

export default UpdateProfile;
