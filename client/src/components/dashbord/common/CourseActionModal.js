import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCourse, deleteCourse } from '../../../actions/courseActions/courseActions';

const CourseActionModal = ({ course }) => {
    const [courseID, setCourseID] =useState('');
    const [courseName, setCourseName] = useState('');
    const [courseDuration, setCourseDuration] = useState('');
    const [coursePrice, setCoursePrice] = useState('');
    const [courseDescription, setCourseDescription] = useState('');

    const [CourseActionModal, setCourseActionModal] = useState(false);
    const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);

    const dispatch = useDispatch();
    const user_Login = useSelector((state) => state.user_Login);
    const { userInfo } = user_Login;

    useEffect(() => {
        if (course) {
            setCourseName(course.courseName);
            setCourseDuration(course.courseDuration);
            setCoursePrice(course.coursePrice);
            setCourseDescription(course.courseDescription);
        }
    }, [course]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const courseUpdatedInfo = {
            courseID,
            courseName,
            courseDuration,
            coursePrice,
            courseDescription
        };

        dispatch(updateCourse(course._id, courseUpdatedInfo));
    };

    const handleDelete = () => {
        dispatch(deleteCourse(course._id));
        setDeleteConfirmationModal(false);
    };

    return (
        <>
            <button type="button" className="btn btn-outline-primary ms-1" onClick={() => setCourseActionModal(true)}>
                <i className="bi bi-pencil-square"></i> Edit
            </button>

            {CourseActionModal && (
                <div className="modal" id="exampleModalToggle2" aria-labelledby="exampleModalToggleLabel2" tabIndex="-1" style={{ display: 'block' }}>
                    <div className="modal-dialog modal-dialog-scrollable">
                        <div className="modal-content p-3">
                            <div className="m-3 d-flex justify-content-end">
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setCourseActionModal(false)}></button>
                            </div>

                            <div className="modal-body text-center">
                                <h3 className="fw-bold mb-2 text-uppercase">Update course</h3>

                                <form onSubmit={handleSubmit}>
                                    <div className="m-4">
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" id="name" placeholder="" value={courseName} onChange={(e) => setCourseName(e.target.value)} required />
                                            <label htmlFor="name">Course Name</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" id="email" placeholder="" value={courseDuration} onChange={(e) => setCourseDuration(e.target.value)} required />
                                            <label htmlFor="text">Course Duration</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" id="name" placeholder="" value={coursePrice} onChange={(e) => setCoursePrice(e.target.value)} required />
                                            <label htmlFor="name">Course Price</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" id="name" placeholder="" value={courseDescription} onChange={(e) => setCourseDescription(e.target.value)} required />
                                            <label htmlFor="name">Course Description</label>
                                        </div>
                                    </div>

                                    <button className="btn btn-outline-dark m-2" type="submit">Update</button>

                                </form>
                            </div>
                            <div className="modal-footer justify-content-center">
                                <button className="btn btn-danger" onClick={() => setDeleteConfirmationModal(true)} style={{width: "150px"}}>DELETE</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {deleteConfirmationModal && (
                <div className="modal" id="deleteConfirmationModal" tabIndex="-1" style={{ display: 'block' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Delete User</h5>
                                <button type="button" className="btn-close" onClick={() => setDeleteConfirmationModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                Are you sure you want to delete this course?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setDeleteConfirmationModal(false)}>Cancel</button>
                                <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default CourseActionModal;
