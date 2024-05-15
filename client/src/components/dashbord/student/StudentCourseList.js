
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCoursesByStudentId } from '../../../actions/enrollActions/enrollActions';
const StudentCourseList = () => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.user_Login);
    const { enrolllist, loading, error } = useSelector(state => state.enrolls_By_Student);

    useEffect(() => {
        if (userInfo) {
            dispatch(getCoursesByStudentId(userInfo._id)); // Assuming userInfo contains student ID
        }
    }, [dispatch, userInfo]);

    return (
        <div>
            <h1>Enrolled Courses</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : enrolllist && enrolllist.length ? (
                <ul>
                    {enrolllist.map(enrollment => (
                        <li key={enrollment._id}>
                            <p>Course ID: {enrollment.course}</p>
                            <p>Course Name: {enrollment.email}</p>
                            <p>mobile Number: {enrollment.mobilenumber}</p>
                            {/* Add more course details as needed */}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No courses enrolled.</p>
            )}
        </div>
    );
};

export default StudentCourseList;

