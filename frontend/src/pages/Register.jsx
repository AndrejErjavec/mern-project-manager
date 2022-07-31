import { useState, useEffect, useContext } from "react";
import UserContext from '../context/store/UserStore';
import {useNavigate} from 'react-router-dom';
import {toast} from "react-toastify";
import authService from '../features/authService';
import '../css/Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '', 
    lastName: '', 
    username: '', 
    email: '', 
    password: '', 
    password2: ''
  });
  const [isError, setIsError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const {dispatch} = useContext(UserContext);
  const navigate = useNavigate();

  const {firstName, lastName, username, email, password, password2} = formData;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (success) {
      navigate('/');
    }
    setIsError(false);
    setSuccess(false);
    setMessage('');
    setLoading(false);
  }, [isError, success, message, navigate]);

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {firstName, lastName, username, email, password};

    if (password !== password2) {
      setIsError(true);
      setMessage("Paswords don't match");
    }
    else {
      try {
        const response = await authService.register(userData);
        const {id, firstName, lastName, email, username, token} = response;
        dispatch({type: 'REGISTER', payload: {id, firstName, lastName, username, email, token}});
        setFormData({firstName: '', lastName: '', username: '', email: '', password: '', password2: ''});
        setSuccess(true);
        setLoading(false);
        setIsError(false);
        setMessage(response.message);
      } catch (err) {
        if (err.response.data) {
          setMessage(err.response.data.message);
          setIsError(true);
          setLoading(false);
        }
        else {
          setMessage('Server not responding');
          setIsError(true);
          setLoading(false);
        }
      }
    }
  }

  if (loading) {
    return (
    <p>loading...</p>
    )
  }

  return (
    <div className="auth-form-container">
      <section className="form-heading">
        <h1>Register</h1>
      </section>
      <section className="register-form">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <input 
              type="text" 
              id="firstName"
              name="firstName"
              value={firstName}
              placeholder="First Name"
              onChange={handleChange}
              />
              </div>
              <div className="form-group">
                <input 
                type="text" 
                id="lastName"
                name="lastName"
                value={lastName}
                placeholder="Last Name"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <input 
            type="text" 
            id="username"
            name="username"
            value={username}
            placeholder="Username"
            onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input 
            type="email" 
            id="email"
            name="email"
            value={email}
            placeholder="E-mail Address"
            onChange={handleChange}
            />
          </div>
            <div className="form-group">
                <input 
              type="password" 
              id="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <input 
              type="password" 
              id="password2"
              name="password2"
              value={password2}
              placeholder="Repeat password"
              onChange={handleChange}
              />
            </div>
            
            <button type="submit" className="submit-btn">
              Create Account
            </button>
        </form>
      </section>
    </div>
    
  )

};

export default Register;