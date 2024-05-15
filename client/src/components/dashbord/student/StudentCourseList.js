import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCoursesByStudentId, deleteEnroll } from '../../../actions/enrollActions/enrollActions'; // Import deleteEnroll action

const StudentCourseList = () => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.user_Login);
    const { enrolllist, loading, error } = useSelector(state => state.enrolls_By_Student);

    useEffect(() => {
        if (userInfo) {
            dispatch(getCoursesByStudentId(userInfo._id));
        }
    }, [dispatch, userInfo]);

    const handleDelete = (enrollmentId) => {
        console.log('Deleting enrollment:', enrollmentId);
        dispatch(deleteEnroll(enrollmentId)); // Dispatch deleteEnroll action
    };

    return (
        <div className="container py-5">
            <div className="row">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Course ID</th>
                            <th scope="col">Course Name</th>
                            <th scope="col">Mobile Number</th>
                            <th scope="col">Actions</th> {/* Added Actions column */}
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="4">Loading...</td>
                            </tr>
                        ) : error ? (
                            <tr>
                                <td colSpan="4">{error}</td>
                            </tr>
                        ) : enrolllist && enrolllist.length ? (
                            enrolllist.map((enrollment) => (
                                <tr key={enrollment._id}>
                                    <td>{enrollment.course}</td>
                                    <td>{enrollment.email}</td>
                                    <td>{enrollment.mobilenumber}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDelete(enrollment._id)}
                                        >
                                            Un-Enroll
                                        </button>
                                    </td> {/* Added Delete button */}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No courses enrolled.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentCourseList;
