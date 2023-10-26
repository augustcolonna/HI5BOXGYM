//hooks
import { useState } from 'react';
import { useSignup } from '../hooks/useSignup';
import { useNavigate } from 'react-router-dom';
//styles

function Signup() {
  //states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  const [streetAndNumber, setStreetAndNumber] = useState('');
  const [cityAndCountry, setCityAndCountry] = useState('');
  const [postal, setPostal] = useState('');
  //hooks
  const { error, signUp, isPending } = useSignup();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const createAddress = [streetAndNumber, cityAndCountry, postal];
    signUp(email, password, displayName, thumbnail, createAddress);
    navigate('/login');
  };

  const handleFileChange = (e) => {
    setThumbnail(null);
    let selected = e.target.files[0];

    if (!selected) {
      setThumbnailError('please select a file');
      return;
    }
    if (!selected.type.includes('image')) {
      setThumbnailError('selected file must be an image');
      return;
    }
    if (selected.size > 250000) {
      setThumbnailError('file size must be less than 100kb');
      return;
    }

    setThumbnailError(null);
    setThumbnail(selected);
    console.log('thumbnail updated');
  };

  return (
    <div className="auth-container">
      <form className="auth-form-signup" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <label>
          <span>Email</span>
          <input required type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
        </label>
        <label>
          <span>Password</span>
          <input required type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
        </label>
        <label>
          <span>Display Name</span>
          <input required type="text" onChange={(e) => setDisplayName(e.target.value)} value={displayName} />
        </label>
        <label>
          <span>Address</span>
          <input
            required
            type="text"
            onChange={(e) => setStreetAndNumber(e.target.value)}
            value={streetAndNumber}
            placeholder="street and housenumber"
          />
          <input
            required
            type="text"
            onChange={(e) => setCityAndCountry(e.target.value)}
            value={cityAndCountry}
            placeholder="city and country"
          />
          <input required type="text" onChange={(e) => setPostal(e.target.value)} value={postal} placeholder="postal" />
        </label>

        <label>
          <span>Profile Picture</span>
          <input required type="file" onChange={handleFileChange} />
          {thumbnailError && <div className="error">{thumbnailError}</div>}
        </label>
        {!isPending && <button className="btn">Sign Up</button>}
        {isPending && (
          <button className="btn" disabled>
            Creating Profile
          </button>
        )}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default Signup;
