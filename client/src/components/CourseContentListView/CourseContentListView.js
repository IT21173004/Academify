import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getContentForCourse } from "../../actions/courseActions/contentActions"; 
import contentImg from "../../assets/images/contentImg.jpg";

// Function to truncate text to a specified number of words
const truncateText = (text, maxLength) => {
  const words = text.split(" ");
  if (words.length > maxLength) {
    return words.slice(0, maxLength).join(" ") + "...";
  } else {
    return text;
  }
};

const CourseContentListView = ({ courseId }) => { // Access courseId from props
  const dispatch = useDispatch();
  const { contents, loading } = useSelector((state) => state.content_List);

  useEffect(() => {
    dispatch(getContentForCourse(courseId)); // Fetch content for the specific course
  }, [dispatch, courseId]); // Update dependency to course

  // Group contents into chunks of 4
  const chunkSize = 4;
  const groupedContents = contents ? contents.reduce((acc, _, i) => (i % chunkSize === 0 ? [...acc, contents.slice(i, i + chunkSize)] : acc), []) : [];

  return (
    <div className="row">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {groupedContents.map((chunk, index) => (
            <div key={index} className="row">
              {chunk.map((content) => (
                <div key={content._id} className="col-md-3 my-5">
                  <div className="card" style={{ width: "16rem", height: "400px", overflow: "hidden" }}>
                    <img src={contentImg} className="card-img-top" alt="Course" />
                    <div className="card-body">
                      <h6 className="card-title text-uppercase">{truncateText(content.lessonName, 5)}</h6>
                      <p className="card-text">{truncateText(content.content, 20)}</p>
                      {/* Add any other content fields you want to display */}
                      <div className="row text-center align-item-center px-2">
                        <Link to={`/view-content/${content._id}`} className="btn btn-outline-primary btn-sm ms-1" style={{width: "100px"}}>View</Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default CourseContentListView;
