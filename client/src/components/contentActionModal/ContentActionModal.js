import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateContent } from '../../actions/courseActions/contentActions'; 

const ContentActionModal = ({ contentDetails }) => {
    const [contentActionModal, setContentActionModal] = useState(false);

    const [courseID, setCourseID] = useState('');
    const [lessonNumber, setLessonNumber] = useState('');
    const [lessonName, setLessonName] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null);

    const courseView = useSelector((state) => state.course_View);
    const { course } = courseView;

    const contentUpdate = useSelector((state) => state.content_Update);
    const dispatch = useDispatch();

    useEffect(() => {
        if (contentDetails) {
            setLessonNumber(contentDetails.lessonNumber);
            setLessonName(contentDetails.lessonName);
            setContent(contentDetails.content);
        }
    }, [contentDetails]);

    const handleFileChange = (e) => {
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
        formData.append('courseID', courseID);
        formData.append('lessonNumber', lessonNumber);
        formData.append('lessonName', lessonName);
        formData.append('content', content);
        formData.append('file', file);

        dispatch(updateContent(contentDetails._id, formData)); // Pass content ID to updateContent action

        setLessonNumber('');
        setLessonName('');
        setContent('');
        setFile(null);
        setContentActionModal(false);
    };

    return (
        <>
            <button type="button" className="btn btn-outline-primary btn-sm ms-1" onClick={() => setContentActionModal(true)} style={{ width: "120px" }}>
                <i className="bi bi-pencil-square"></i> Update Content
            </button>

            {contentActionModal && (
                <div className="modal" id="exampleModalToggle2" aria-labelledby="exampleModalToggleLabel2" tabIndex="-1" style={{ display: 'block' }}>
                    <div className="modal-dialog modal-dialog-scrollable">
                        <div className="modal-content p-3">
                            <div className="m-3 d-flex justify-content-end">
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setContentActionModal(false)}></button>
                            </div>

                            <div className="modal-body text-center">
                                <h3 className="fw-bold mb-2 text-uppercase">Update content</h3>

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

                                    <button className="btn btn-outline-dark m-2" type="submit">Update Content</button>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ContentActionModal;
