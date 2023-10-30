//hooks
import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import { Link, useNavigate } from 'react-router-dom';

//styles
import '../stylesheets/authforms.scss';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const { login, isPending, error } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
    navigate('/home');
  };

  return (
    <div className="auth-container">
      {!isPending ? (
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <label className="auth-form-label">
            <span>Email</span>
            <input required type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
          </label>
          <label className="auth-form-label">
            <span>Password</span>
            <input required type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
          </label>
          <Link to="/signup">
            <p>
              Already have an account? <span>Signup here</span> or <span>continue as guest</span>
            </p>
          </Link>
          {!isPending && <button className="btn">Login</button>}
          {isPending && <button className="btn">Signing In...</button>}
          {error && <p className="error">{error}</p>}
        </form>
      ) : (
        <div>Signing You In</div>
      )}
    </div>
  );
}

export default Login;
