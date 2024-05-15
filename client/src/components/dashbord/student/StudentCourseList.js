import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCoursesByStudentId, deleteEnroll } from '../../../actions/enrollActions/enrollActions';

const StudentCourseList = () => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.user_Login);
    const { enrolllist, loading, error } = useSelector(state => state.enrolls_By_Student);
    const [showAlert, setShowAlert] = useState(false);
    const [enrollmentIdToDelete, setEnrollmentIdToDelete] = useState(null);

    useEffect(() => {
        if (userInfo) {
            dispatch(getCoursesByStudentId(userInfo._id));
        }
    }, [dispatch, userInfo]);

    const handleDelete = (enrollmentId) => {
        setEnrollmentIdToDelete(enrollmentId);
        setShowAlert(true);
    };

    const confirmDelete = () => {
        console.log('Deleting enrollment:', enrollmentIdToDelete);
        dispatch(deleteEnroll(enrollmentIdToDelete));
        setShowAlert(false);
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
                            <th scope="col">Actions</th>
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
                                    </td>
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
            {showAlert && (
                <div
                    style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        padding: '20px',
                        width: '500px', 
                        height: '130px', 
                        background: '#f8d7da',
                        color: '#721c24',
                        border: '1px solid #f5c6cb',
                        borderRadius: '5px',
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <p>Are you sure you want to un-enroll from this course?</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <button className="btn btn-secondary" onClick={() => setShowAlert(false)}>
                            Cancel
                        </button>
                        <button className="btn btn-danger" onClick={confirmDelete}>
                            Confirm
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentCourseList;
