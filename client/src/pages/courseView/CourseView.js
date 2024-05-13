import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import courseViewImg from '../../assets/images/courseViewImg.png'

const CourseView = () => {
    const user_Login = useSelector((state) => state.user_Login); // Get user login info from Redux store
    const { userInfo } = user_Login; // Destructure userInfo from user_Login

    // Initialize navigate using useNavigate hook
    const navigate = useNavigate();

    // Check if user is instructor or admin
    const Enroll = userInfo && (userInfo.userRole = 'learner'); //  const Enroll = userInfo && (userInfo.userRole === 'learner');

    const handleEnrollClick = () => {
        // Navigate to the "EnrollCourse" page when the button is clicked
        navigate('/enroll-course');
    };

    return (
        <div className='container-fluid '>
            <div className='row p-5'>
                <div className='row mb-4'>
                    <h3 className='pb-4 text-center mb-3'>COURSE NAME</h3>
                </div>
                
                <div className='col-md-3 d-none d-lg-block'>
                    <img src={courseViewImg} alt="Online Education Platform" className="img-fluid" style={{maxHeight:"350px"}} />
                </div>

                <div className='col-md-9 px-5 '>
                    <div className='row'>
                        <div className='row'>
                            <h5 className='pb-4'>DESCRIPTION</h5>
                            <div className="col">
                                <p class="text-muted mb-3">courseID</p>
                            </div>
                            <div className="col">
                                <p className="text">Instructor :</p>
                                <p className="text-muted">Instructor Name</p>     
                            </div>
                            <div className="col">
                                <p className="text">Institution :</p>
                                <p className="text-muted">Institution Name</p>     
                            </div>
                            <div className="col">
                                <p className="text">Duration :</p>
                                <p className="text-muted">Duration</p>     
                            </div>
                        </div>

                        <div className='row'>
                            <h5 className='pb-4'>CONTENT</h5>
                        </div>
                    </div>
                </div>  

                {/* Render enroll button if user is learner */}
                {Enroll && (
                    <div className="row mt-4">
                        <div className="col text-center">
                            {/* Attach onClick event to handleEnrollClick */}
                            <button className="btn btn-primary" onClick={handleEnrollClick}>Enroll To Course</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CourseView;
