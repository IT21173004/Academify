import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import courseViewImg from '../../assets/images/courseViewImg.png';
import { getCourseById } from '../../actions/courseActions/courseActions';
import AddContentModal from '../../components/addContentModal/AddContent';
import CourseContentListView from '../../components/CourseContentListView/CourseContentListView';

const CourseView = () => {
    // Get course ID from URL
    const { id } = useParams(); 
    const dispatch = useDispatch();
    // Retrieve course details and user login info from Redux store
    const { course } = useSelector((state) => state.course_View);
    const { userInfo } = useSelector((state) => state.user_Login); 

    useEffect(() => {
        // Fetch course details by ID
        dispatch(getCourseById(id)); 
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
                            {/* Display course image */}
                            <img src={courseViewImg} alt="Online Education Platform" className="img-fluid" style={{maxHeight:"350px"}} />
                            
                        </div>

                        <div className="col-md-9 px-5">
                            <div className="row pb-4">
                                <div className='col-md-10'>
                                    <h5 className="pb-4">ABOUT</h5>
                                    {/* Display course description */}
                                    <p className="text-justify">{course.courseDescription}</p>
                                </div>
                                <div className='col-md-2'>
                                    <div className="row mb-0">
                                        {/* Display course details */}
                                        <small>ID : <text className="text-muted"/>{course.courseID}</small>
                                        <small>By : <text className="text-muted"/>{course.courseInstructor}</small>
                                        <small>Duration : <text className="text-muted"/>{course.courseDuration}</small>
                                        <small>Price : <text className="text-muted"/>{course.coursePrice}</small>

                                        {/* Render add content button if user is instructor */}
                                        {isInstructor && (
                                            <div className="row mt-4">
                                                <div className="col text-center">
                                                    <AddContentModal/>
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
                                <div className='row'><h5 className="pb-4">CONTENT</h5></div>
                                <div className='row'><CourseContentListView courseId={id}/>  </div>                                
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
