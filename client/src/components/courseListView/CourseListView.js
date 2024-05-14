import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllCourses } from "../../actions/courseActions/courseActions";
import cardImg from "../../assets/images/courseCard.jpg";

// Function to truncate text to a specified number of words
const truncateText = (text, maxLength) => {
  const words = text.split(" ");
  if (words.length > maxLength) {
    return words.slice(0, maxLength).join(" ") + "...";
  } else {
    return text;
  }
};

const CourseListView = () => {
  const { userInfo } = useSelector((state) => state.user_Login);
  const history = useNavigate();
  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.course_List);

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  console.log("courses", courses);

  // Group courses into chunks of 4
  const chunkSize = 4;
  const groupedCourses = courses ? courses.reduce((acc, _, i) => (i % chunkSize === 0 ? [...acc, courses.slice(i, i + chunkSize)] : acc), []) : [];

  const [activeIndex, setActiveIndex] = useState(0);

  const handleIndicatorClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="row">
      <div className="carousel carousel-dark slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          {groupedCourses.length > 0 && groupedCourses.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target=".carousel"
              data-bs-slide-to={index}
              className={index === activeIndex ? "active" : ""}
              onClick={() => handleIndicatorClick(index)}
            ></button>
          ))}
        </div>
        <div className="carousel-inner">
          {groupedCourses.length > 0 ? (
            groupedCourses.map((chunk, index) => (
              <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                <div className="row" style={{paddingInlineStart: "120px", paddingInlineEnd: "120px"}}>
                  {chunk.map((course) => (
                    <div key={course._id} className="col-md-3 my-5" >
                      <div className="card" style={{ width: "16rem", height: "500px", overflow: "hidden" }}>
                        <img src={cardImg} className="card-img-top" alt="Course" />
                        <div className="card-body">
                          <div className="row mb-2"><h6 className="card-title text-uppercase">{truncateText(course.courseName, 5)}</h6></div>
                          
                          <div className="row mb-4"><small><p className="card-text">{truncateText(course.courseDescription, 20)}</p></small> {/* Limit to 10 words */}</div>
                          
                          <div className="row text-center align-item-center px-2">
                            <Link to={`/view-course/${course._id}`} className="btn btn-outline-primary btn-sm ms-1" style={{width: "100px"}}>View</Link>
                          </div>

                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target=".carousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target=".carousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default CourseListView;
