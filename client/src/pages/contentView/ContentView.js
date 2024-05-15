import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import contentViewImg from '../../assets/images/contentViewImg.jpg';
import { getSpecificContent } from '../../actions/courseActions/contentActions'; 

const ContentView = () => {
    // Get course ID from URL
    const { id } = useParams(); 
    const dispatch = useDispatch();
    // Retrieve course details and user login info from Redux store
    const { content } = useSelector((state) => state.content_View);
    const { userInfo } = useSelector((state) => state.user_Login); 

    useEffect(() => {
        // Fetch course details by ID
        dispatch(getSpecificContent(id)); 
    }, [dispatch, id]);

    console.log("contentId", id)

    const isInstructor = userInfo && userInfo.role === 'instructor';

    return (
        <div className="container-fluid">
            <div className="row p-5">
                {content ? (
                    <>
                        <div className="row mb-4">
                            <h3 className="pb-4 text-center text-uppercase mb-3">{content.lessonName}</h3>
                        </div>
                        
                        <div className="col-md-3 d-none d-lg-block">
                            {/* Display course image */}
                            <img src={contentViewImg} alt="Online Education Platform" className="img-fluid" style={{maxHeight:"350px"}} />
                            
                        </div>

                        <div className="col-md-9 px-5">
                            <div className="row pb-4">
                                <div className='col-md-10'>
                                    <h5 className="pb-4">CONTENT</h5>
                                    {/* Display course description */}
                                    <p className="text-justify">{content.content}</p>
                                </div>
                                <div className='col-md-2'>
                                    <div className="row mb-0">
                                        {/* Display course details */}
                                        <small>ID : <text className="text-muted"/>{content.lessonNumber}</small>
                                        <small>Resource file : {content.fileUrl && (
                        <a href={content.fileUrl} target="_blank" rel="noopener noreferrer">View File</a>
                    )}</small>
                                        {/* Render add content button if user is instructor */}
                                        {isInstructor && (
                                            <div className="row mt-4">
                                                <div className="col text-center">
                                                    
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>                                
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

export default ContentView;
