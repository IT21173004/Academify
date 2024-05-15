import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { enrollCourse } from '../../../actions/enrollActions/enrollActions'; // Update import path
import swal from 'sweetalert'; // Import sweetalert for notifications
import addCourseImg from '../../../assets/images/addCourseImg.png';

const EnrollCourse = () => {
    const [courseId, setCourseId] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.user_Login);
    const { userInfo } = userLogin;

    const isValidEmail = (inputEmail) => {
        // Regular expression for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(inputEmail);
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!courseId || !email || !phoneNumber) return;

        if (!isValidEmail(email)) {
            swal('Error', 'Please enter a valid email address.', 'error');
            return;
        }

        try {
            await dispatch(
                enrollCourse(
                    userInfo._id, // Assuming learnerId is userInfo._id
                    courseId,
                    email,
                    phoneNumber
                )
            );

            // Show success message
            swal('Success', 'Enrollment Successful.', 'success').then(() => {
                // Redirect to user dashboard after enrollment
                window.location.href = '/user-dashboard';
            });
        } catch (error) {
            // Show error message if enrollment fails
            swal('Error', error.message, 'error');
        }
    };

    // Function to handle phone number input validation
    const handlePhoneNumberChange = (e) => {
        const inputPhoneNumber = e.target.value;
        const formattedPhoneNumber = inputPhoneNumber.replace(/\D/g, ''); // Remove non-numeric characters

        if (formattedPhoneNumber.length <= 10) {
            setPhoneNumber(formattedPhoneNumber); // Update state only if the input is within the limit
        }
    };

    return (
        <div className="container-fluid">
            <div className="row p-5">
                <div className="col-md-3 d-none d-lg-block">
                    <h3 className="pb-4">ENROLL COURSE</h3>
                    <img src={addCourseImg} alt="Online Education Platform" className="img-fluid" style={{ maxHeight: '350px' }} />
                </div>

                <div className="col-md-9">
                    <form className="px-4" onSubmit={submitHandler}>
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="courseId">
                                Course ID
                            </label>
                            <input type="text" id="courseId" className="form-control" value={courseId} onChange={(e) => setCourseId(e.target.value)} />
                        </div>
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="email">
                                Email
                            </label>
                            <input type="email" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="phoneNumber">
                                Phone Number
                            </label>
                            <input type="text" id="phoneNumber" className="form-control" value={phoneNumber} onChange={handlePhoneNumberChange} maxLength={10} />
                        </div>

                        <div className="">
                            <button type="submit" className="btn btn-primary btn-block mb-4">
                                ENROLL COURSE
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EnrollCourse;
