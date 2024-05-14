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

const AllCourses = () => {
  // Redux Hooks
  const { userInfo } = useSelector((state) => state.user_Login);
  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.course_List);

  // Local State
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(10); // 2 cards per row * 5 rows = 10 cards per page

  // Fetch all courses on component mount
  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  // Guard against undefined courses
  if (!courses) {
    return <div>Loading...</div>;
  }

  // Pagination
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      {/* Title */}
      <div className="row text-center p-5"> 
        <h3>BROWSE OUR COURSES</h3> 
      </div>

      {/* Course Cards */}
      <div className="row px-4">
        {Array.from({ length: Math.ceil(currentCourses.length / 2) }).map((_, rowIndex) => (
          <div key={rowIndex} className="row mb-4">
            {currentCourses.slice(rowIndex * 2, rowIndex * 2 + 2).map((course, colIndex) => (
              <div key={colIndex} className="col">
                <div className="card mb-3" style={{ maxWidth: "600px" }}>
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img src={cardImg} className="img-fluid rounded-start" alt="Course" />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <div className="row mb-2"><h6 className="card-title text-uppercase">{truncateText(course.courseName, 6)}</h6></div>
                        <div className="row mb-2"><small><p className="card-text text-muted mb-1">{course.courseInstructor}</p></small></div>
                        <div className="row mb-4"><small><p className="card-text">{truncateText(course.courseDescription, 20)}</p></small></div>
                        <div className="row"><Link to={`/view-course/${course._id}`} className="btn btn-outline-primary btn-sm mx-2" style={{width: "100px"}}>View Course</Link></div>
                        
                        
                        
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="row justify-content-center">
        <nav>
          <ul className="pagination justify-content-center">
            {Array.from({ length: Math.ceil(courses.length / coursesPerPage) }).map((_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                <button onClick={() => paginate(index + 1)} className="page-link">
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default AllCourses;
