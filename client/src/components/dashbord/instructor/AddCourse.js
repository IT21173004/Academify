import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCourse } from "../../../actions/courseActions/courseActions";
import addCourseImg from '../../../assets/images/addCourseImg.png'

const AddCourse = () => {

    const [courseID, setCourseID] = useState(""); // State for Course ID
    const [courseName, setCourseName] = useState("");
    const [courseInstructor, setCourseInstructor] = useState("");
    const [courseDuration, setCourseDuration] = useState("");
    const [courseDescription, setCourseDescription] = useState("");
    const [coursePrice, setCoursePrice] = useState("");
    
    const dispatch = useDispatch();

    const user_Login = useSelector((state) => state.user_Login);
    const { userInfo } = user_Login;

    const course_Create = useSelector((state) => state.course_Create);
    const { loading, error } = course_Create;

    const generateRandomID = () => {
        return 'ACAD' + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    }

    useEffect(() => {
        // Generate a random ID when the component mounts
        setCourseID(generateRandomID());
        // Set instructor name when userInfo changes
        if(userInfo) {
            setCourseInstructor(userInfo.name);
        }
    }, [userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();

        if (!courseID || !courseName || !courseInstructor || !courseDuration || !courseDescription || !coursePrice) return;

        dispatch(createCourse(userInfo._id, courseID, courseName, courseInstructor, courseDuration, courseDescription, coursePrice));
    }

    return (
        <div className='container-fluid '>
            <div className='row p-5'>
                <div className='col-md-3 d-none d-lg-block'>
                    <h3 className='pb-4'>ADD COURSE</h3>
                    <img src={addCourseImg} alt="Online Education Platform" className="img-fluid" style={{maxHeight:"350px"}} />
                </div>

                <div className='col-md-9'>
                    <form className='px-4'>
                        <div className="row mb-4">
                            <div className="col">
                                <div className="form-outline">
                                    <label className="form-label" htmlFor="courseID">Course ID</label>
                                    <input type="text" id="courseID" className="form-control" value={courseID} onChange={(e) => setCourseID(e.target.value)} disabled />
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-outline">
                                    <label className="form-label" htmlFor="courseInstructor">Instructor</label>
                                    <input type="text" id="courseInstructor" className="form-control" value={courseInstructor} onChange={(e) => setCourseInstructor(e.target.value)} disabled />
                                </div>
                            </div>
                        </div>
                
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="courseName">Course Name</label>
                            <input type="text" id="courseName" className="form-control" value={courseName} onChange={(e) => setCourseName(e.target.value)} />
                        </div>

                        <div className="row mb-4">
                            <div className="col">
                                <div className="form-outline">
                                    <label className="form-label" htmlFor="courseDuration">Duration</label>
                                    <input type="text" id="courseDuration" className="form-control" value={courseDuration} onChange={(e) => setCourseDuration(e.target.value)} />
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-outline">
                                    <label className="form-label" htmlFor="coursePrice">Price</label>
                                    <input type="text" id="coursePrice" className="form-control" value={coursePrice} onChange={(e) => setCoursePrice(e.target.value)} />
                                </div>
                            </div>
                        </div>
                
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="courseDescription">Description</label>
                            <textarea className="form-control" id="courseDescription" rows="4" value={courseDescription} onChange={(e) => setCourseDescription(e.target.value)} ></textarea>
                        </div>

                        <div className=''>
                            <button type="button" className="btn btn-primary btn-block mb-4" onClick={submitHandler}>ADD COURSE</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddCourse;
