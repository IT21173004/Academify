import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import landpagemain from '../../assets/images/landpagemain.png';
import AuthModal from '../auth/authModal/AuthModal';

const LandingPage = () => {

  const dispatch = useDispatch();
  const user_Login = useSelector((state) => state.user_Login);
	const { userInfo } = user_Login;

  return (
    <div>

      <section className="container-fluid bg-dark text-white">
        <div className="container">
          <div className="row align-items-center">
            
            <div className="col-md-6 order-md-2">
              <div className='row d-flex mb-4'>
                <h2>Learn without limits</h2>
                <p>Start, switch, or advance your career with more than 7000 courses, Professional Certificates, and degrees from world-class universities and companies.</p>
              </div>
              <div className="row d-flex">

                {userInfo? (
                  <></>
                ) : (
                  <div className="col-md-3 mb-3"><AuthModal/></div>  
                )}
                <div className="col-md-3">
                  <button type="button" class="btn btn-primary" style={{width: "250px"}}>Explore</button>
                </div>
              </div>  
            </div>

            <div className="col-md-6 d-none d-lg-block ">
              <img src={landpagemain} alt="Online Education Platform" className="img-fluid" style={{maxHeight:"350px"}} />
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-5 d-none d-lg-block">
        <div className="container">
          <div className="row mb-3">
            <div className="col-md-4">
              <h2>Learn Anywhere, Anytime</h2>
            </div>
            <div className="col-md-4">
              <h2>Expert Instructors</h2> 
            </div>
            <div className="col-md-4">
              <h2>Wide Range of Courses</h2>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <p>Access our courses from any device, at your own pace.</p>       
            </div>
            <div className="col-md-4">
              <p>Learn from industry experts with real-world experience.</p>
            </div>
            <div className="col-md-4">
              <p>Explore our diverse selection of courses covering various topics.</p>
            </div>
          </div>
        </div>
      </section>

      

      
      <footer className="bg-dark text-white py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h5>About Us</h5>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="col-md-6">
              <h5>Contact Us</h5>
              <ul className="list-unstyled">
                <li>info@example.com</li>
                <li>123-456-7890</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      
    </div>
    
  );
}

export default LandingPage;
