import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../../actions/courseActions/courseActions";
import CourseActionModal from "../common/CourseActionModal";

const CourseList = () => {
  const { userInfo } = useSelector((state) => state.user_Login);
  const navigate = useNavigate(); // Step 1: Import and declare useNavigate hook

  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.course_List);

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  console.log("courses", courses);

  // Step 2: Create handleViewCourse function
  const handleViewCourse = (courseId) => {
    navigate(`/view-course/${courseId}`); // Step 3: Navigate to "view-course" page
  };

  return (
    <div className="container py-5">
      <div className="row">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Course ID | Name</th>
              <th scope="col">Instructor</th>
              <th scope="col">Duration</th>
              <th scope="col">Price</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {courses !== null ? (
              Array.isArray(courses) &&
              courses.map((course) => (
                <tr key={course._id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <h2>
                        <i className="bi bi-journal-text"></i>
                      </h2>
                      <div className="ms-3">
                        <small>
                          <p className="text-muted mb-0">{course.courseID}</p>
                        </small>
                        <p className="mb-1 ">{course.courseName}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="mb-1">{course.courseInstructor}</p>
                  </td>
                  <td>
                    <p className="mb-1">{course.courseDuration}</p>
                  </td>
                  <td>
                    <p className="mb-1">{course.coursePrice}</p>
                  </td>
                  <td>
                    {/* Step 4: Add onClick event to "View" button */}
                    <button
                      type="button"
                      className="btn btn-outline-primary ms-1"
                      onClick={() => handleViewCourse(course._id)} // Pass course ID to handleViewCourse
                    >
                      <i className="bi bi-person-up"></i> View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">Loading...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseList;
