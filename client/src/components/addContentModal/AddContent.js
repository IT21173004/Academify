import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContent } from '../../actions/courseActions/contentActions';

const AddContentModal = () => {
    const [AddContentModal, setAddContentModal] = useState(false);

    const [courseID, setCourseID] = useState('');
    const [lessonNumber, setLessonNumber] = useState('');
    const [lessonName, setLessonName] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null); // Initialize file state as null

    const course_View = useSelector((state) => state.course_View);
    const { course } = course_View;

    const content_Create = useSelector((state) => state.content_Create);
    const dispatch = useDispatch();

    const handleFileChange = (e) => {
        // Make sure a file is selected
        if (e.target.files.length > 0) {
        setFile(e.target.files[0]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!file) {
        alert('Please upload a file first!');
        return;
        }

        const formData = new FormData();
        formData.append('courseID', course._id);
        formData.append('lessonNumber', lessonNumber);
        formData.append('lessonName', lessonName);
        formData.append('content', content);
        formData.append('file', file);

        dispatch(addContent(formData));
        
        // Reset form fields
        setLessonNumber('');
        setLessonName('');
        setContent('');
        setFile(null); // Reset file state after form submission
    };

    return (
        <>
            <button type="button" className="btn btn-outline-primary btn-sm ms-1" onClick={() => setAddContentModal(true)} style={{width: "120px"}}>
                <i className="bi bi-pencil-square"></i> Add Content
            </button>

            {AddContentModal && (
                <div className="modal" id="exampleModalToggle2" aria-labelledby="exampleModalToggleLabel2" tabIndex="-1" style={{ display: 'block' }}>
                    <div className="modal-dialog modal-dialog-scrollable">
                        <div className="modal-content p-3">
                            <div className="m-3 d-flex justify-content-end">
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setAddContentModal(false)}></button>
                            </div>

                            <div className="modal-body text-center">
                                <h3 className="fw-bold mb-2 text-uppercase">Add content</h3>

                                <form onSubmit={handleSubmit}>
                                    <div className="m-4">
                                        <div className="form-floating mb-3">
                                            <input type="number" className="form-control" id="number" value={lessonNumber} onChange={(e) => setLessonNumber(e.target.value)} required />
                                            <label htmlFor="number">Lesson Number</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" id="name" value={lessonName} onChange={(e) => setLessonName(e.target.value)} required />
                                            <label htmlFor="name">Lesson Name</label>
                                        </div>
                                        <div className="form-floating mb-4">
                                            <textarea type="text" className="form-control" rows="4" id="name" value={content} onChange={(e) => setContent(e.target.value)} required ></textarea>
                                            <label htmlFor="name">Content</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="file" id="file" onChange={handleFileChange} required />
                                        </div>
                                    </div>

                                    <button className="btn btn-outline-dark m-2" type="submit">Add Content</button>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default AddContentModal;
