import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, userRegister } from '../../../actions/authActions/authActions';

const AuthModal = ({ history }) => {
  // State variables
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  // Redux dispatch
  const dispatch = useDispatch();

  // Redux state selectors
  const user_Login = useSelector((state) => state.user_Login);
  const { userInfo, error: loginError } = user_Login;
  const user_Register = useSelector((state) => state.user_Register);
  const { error: registerError } = user_Register;

  // Close alert after 5 seconds
  const handleAlertClose = () => {
    setTimeout(() => {
      setError('');
    }, 5000); // 5000 milliseconds = 5 seconds
  };

  // Handle login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  // Handle register form submission
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      // Password mismatch
      setError("Passwords don't match");
    } else {
      // Passwords match, proceed with registration
      setError('');
      dispatch(userRegister(role, name, email, password));
    }
  };

  // Effect for redirecting after successful login
  useEffect(() => {
    if (userInfo) {
      history.pushState({}, "", "/");
    }
  }, [history, userInfo]);

  // Effect for handling login error
  useEffect(() => {
    if (loginError) {
      setError(loginError);
    }
  }, [loginError]);

  // Effect for handling registration error
  useEffect(() => {
    if (registerError) {
      setError(registerError);
    }
  }, [registerError]);

  // Open login modal
  const handleShowLoginModal = () => {
    setShowLoginModal(true);
    handleCloseRegisterModal();
  };

  // Close login modal
  const handleCloseLoginModal = () => setShowLoginModal(false);

  // Open register modal
  const handleShowRegisterModal = () => {
    setShowRegisterModal(true);
    handleCloseLoginModal();
  };

  // Close register modal
  const handleCloseRegisterModal = () => setShowRegisterModal(false);

  return (
    <>
      <button className="btn btn-outline-primary" onClick={handleShowRegisterModal}>
        Join for Free
      </button>

      {showLoginModal && (
        <div class="modal" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1" style={{ display: 'block' }}>
        <div class="modal-dialog modal-dialog-centered">
          
          <div class="modal-content p-3">

          <div className='m-3 d-flex justify-content-end'>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseLoginModal}></button>
          </div>

            <div class="modal-body text-center">
              

              <h3 class="fw-bold mb-2 text-uppercase">Login</h3>
              <p class="text-dark mb-5">Please enter your login and password!</p>

              {/* Error Message */}
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                  {handleAlertClose()}
                </div>
              )}
              
              <div className='m-4'>
              <div class="form-floating mb-3 ">
                  <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  <label for="floatingInput">Email address</label>
              </div>
              <div class="form-floating mb-3 ">
                  <input type="password" class="form-control" id="floatingPassword" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  <label for="floatingPassword">Password</label>
              </div>
              </div>

              <button class="btn btn-outline-dark m-3" type="submit" onClick={handleSubmit}>Login</button>

              <div className='m-3'>
                  <p class="mb-0">Don't have an account? <a class="text-dark fw-bold" onClick={handleShowRegisterModal}>Sign Up</a></p>
              </div>
            </div>

          </div>
        </div>
      </div>
      )}

      {showRegisterModal && (
        <div class="modal" id="exampleModalToggle2" aria-labelledby="exampleModalToggleLabel2" tabindex="-1" style={{ display: 'block' }} >
        <div class="modal-dialog modal-dialog-scrollable">
          <div class="modal-content p-3">

          <div className='m-3 d-flex justify-content-end'>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseRegisterModal}></button>
          </div>

            <div class="modal-body text-center">

              <h3 class="fw-bold mb-2 text-uppercase">Register</h3>
              <p class="text-dark mb-5">Learn on your own time from <br/>top universities and businesses.</p>

              {/* Error Message */}
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                  {handleAlertClose()}
                </div>
              )}
            
              <div className='m-4'>

              <div className='row justify-content-evenly mb-3'>
                <div className='col-md-4 form-check'>
                <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value={name} onChange={(e) => setRole('learner')} />
                <label class="form-check-label" for="exampleRadios1">As a Learner</label>
                </div>  
                <div className='col-md-5 form-check'>
                  <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value={name} onChange={(e) => setRole('instructor')}/>
                  <label class="form-check-label" for="exampleRadios2">As an Instructor</label>
                </div>
              </div>
              
              <div class="form-floating mb-3 ">
                  <input type="text" class="form-control" id="floatingInput" placeholder="" value={name} onChange={(e) => setName(e.target.value)} required />
                  <label for="floatingInput">Full name</label>
              </div>
              <div class="form-floating mb-3 ">
                  <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  <label for="floatingInput">Email address</label>
              </div>
              <div class="form-floating mb-3 ">
                  <input type="password" class="form-control" id="floatingPassword" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  <label for="floatingPassword">Password</label>
              </div>
              <div class="form-floating mb-3 ">
                  <input type="password" class="form-control" id="floatingconfirmPassword" placeholder="Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                  <label for="floatingconfirmPassword">confirm Password</label>
              </div>

              </div>

              <button class="btn btn-outline-dark m-2" type="submit" onClick={submitHandler}>Register</button>

              <div className='m-3'>
                  <p class="mb-0">Already have an account? <a class="text-dark fw-bold" onClick={handleShowLoginModal}>Sign In</a></p>
              </div>
            </div>

            
            <div className="modal-footer justify-content-start">
            <p><small>*Register as an instructor to build your own course</small></p>
            </div>

          </div>
        </div>
      </div>
      )}

    </>
  );
}

export default AuthModal;
