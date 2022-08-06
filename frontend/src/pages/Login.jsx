import {useState, useEffect, useContext} from "react";
import {Link} from 'react-router-dom';
import UserContext from '../context/store/UserStore';
import {useNavigate} from 'react-router-dom';
import {toast} from "react-toastify";
import Header from '../components/Header';
import authService from '../features/authService';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  const {dispatch} = useContext(UserContext);
  const navigate = useNavigate();

  const {email, password} = formData;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success(message);
      navigate('/');
    }
    // reset state
    setIsError(false);
    setIsSuccess(false);
    setMessage('');
    setIsLoading(false);
  }, [isError, isSuccess, message, navigate]);

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email, password
    }

    try {
      const response = await authService.login(userData);
      const {id, first_name, last_name, email, username, token} = response;
      dispatch({type: 'LOGIN', payload: {id, first_name, last_name, email, username, token}});
      setIsSuccess(true);
      setIsLoading(false);
      setMessage(response.message);
    } catch (err) {
      if (err.response.data) {
        setMessage(err.response.data.message);
        setIsError(true);
        setIsLoading(false);
      }
      else {
        setMessage('Server not responding');
        setIsError(true);
        setIsLoading(false);
      }
    }
    
  };

  if (isLoading) {
    return(
      <p>loading...</p>
    )
  }

  return (
    <div className="login">
      <Header></Header>
      <section className="page">
        <section className="register-left">
        <a href="https://www.freepik.com/vectors/time-isometric">Time isometric vector created by pikisuperstar - www.freepik.com</a>
        </section>
        <section className="register-right">
          <div className="auth-form-container">
            <section className="register-form">
              <section className="form-heading">
                <h2>Login</h2>
              </section>
              <section className="form">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input 
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    placeholder="Email address"
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
                    onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <button type="submit">
                      Login
                    </button>
                  </div>
                  <div className="form-bottom">
                    <p>Don't have an account?</p>
                    <Link to={'/register'}>register</Link>
                  </div>
                </form>
              </section>
            </section>
          </div>
        </section>
      </section>
    </div>
  )
}

export default Login;