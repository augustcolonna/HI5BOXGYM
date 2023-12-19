//hooks
import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { Link, useNavigate } from "react-router-dom";
//styles
import "../stylesheets/authforms.scss";
//images
import warningIcon from "../assets/warning.svg";
import matchIcon from "../assets/correct.svg";

function Signup() {
  //states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  const [displayName, setDisplayName] = useState("");

  //hooks
  const { error, signup, isPending } = useSignup();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    signup(email, password, displayName, thumbnail);
    navigate("/login");
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
      setThumbnailError("file size must be less than 25 Megabytes");
      return;
    }

    setThumbnailError(null);
    setThumbnail(selected);
    console.log("thumbnail updated");
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <label className="auth-form-label">
          <span>Email</span>
          <input
            required
            placeholder="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>

        <label className="auth-form-label">
          <span>Password</span>
          <input
            required
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
        <label className="auth-form-label">
          <span>Confirm Password</span>
          <input
            required
            placeholder="Confirm Password"
            type="password"
            onChange={(e) => setCheckPassword(e.target.value)}
            value={checkPassword}
          />
        </label>
        {password && checkPassword === password ? (
          <div className="match">
            <p>Passwords match</p>
            <img src={matchIcon} />
          </div>
        ) : (
          <div className="warning">
            <p>Passwords do not match</p>
            <img src={warningIcon} />
          </div>
        )}
        <label className="auth-form-label">
          <span>Name</span>
          <input
            required
            type="text"
            placeholder="Vorname und Nachname"
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
          />
        </label>
        <label className="auth-form-label">
          <span>Profile Picture</span>
          <input type="file" onChange={handleFileChange} />
          {thumbnailError && <div className="error">{thumbnailError}</div>}
        </label>
        <Link to="/login">
          <p>
            Already have an account? <span>Login here</span> or{" "}
            <span>continue as guest</span>
          </p>
        </Link>
        {!isPending && (
          <button
            disabled={checkPassword === password ? false : true}
            className="btn"
          >
            Sign Up
          </button>
        )}
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
