import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import courseViewImg from '../../assets/images/courseViewImg.png';
import { getCourseById } from '../../actions/courseActions/courseActions';

const CourseView = () => {
    const { id } = useParams(); // Get course ID from URL
    const dispatch = useDispatch();
    const { course } = useSelector((state) => state.course_View);
    const { userInfo } = useSelector((state) => state.user_Login); // Get user login info from Redux store

    useEffect(() => {
        dispatch(getCourseById(id)); // Fetch course details by ID
    }, [dispatch, id]);

    console.log("courseId", id)

    // Check if user is learner or instructor
    const isLearner = userInfo && userInfo.role === 'learner';
    const isInstructor = userInfo && userInfo.role === 'instructor';

    const handleAddContent = () => {
        console.log("Adding content...");
    };

    return (
        <div className="container-fluid">
            <div className="row p-5">
                {course ? (
                    <>
                        <div className="row mb-4">
                            <h3 className="pb-4 text-center text-uppercase mb-3">{course.courseName}</h3>
                        </div>
                        
                        <div className="col-md-3 d-none d-lg-block">
                            <img src={courseViewImg} alt="Online Education Platform" className="img-fluid" style={{maxHeight:"350px"}} />
                            
                        </div>

                        <div className="col-md-9 px-5">
                            <div className="row pb-4">

                                    <div className='col-md-10'>
                                    <h5 className="pb-4">ABOUT</h5>
                                    <p className="text-justify">{course.courseDescription}</p>
                                    </div>
                                    <div className='col-md-2'>
                                    <div className="row mb-0">
                                        <small>ID : <text className="text-muted"/>{course.courseID}</small>
                                        <small>By : <text className="text-muted"/>{course.courseInstructor}</small>
                                        <small>Duration : <text className="text-muted"/>{course.courseDuration}</small>
                                        <small>Price : <text className="text-muted"/>{course.coursePrice}</small>

                                        {/* Render add content button if user is user */}
                                        {isInstructor && (
                                            <div className="row mt-4">
                                                <div className="col text-center">
                                                    <button className="btn btn-outline-primary btn-sm" onClick={handleAddContent}>Add Content</button>
                                                </div>
                                            </div>
                                        )}
                                        {/* Render enroll button if user is learner */}
                                        {isLearner && (
                                            <div className="row mt-4">
                                                <div className="col text-center">
                                                    <button className="btn btn-outline-primary btn-sm">Enroll</button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    </div>                                
                            </div>
                            <div className="row mt-4">
                                    <h5 className="pb-4">CONTENT</h5>                             
                            </div>
                        </div>

                    </>
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        </div>
    )
}

export default CourseView;