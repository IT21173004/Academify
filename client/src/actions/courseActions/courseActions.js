// Import necessary modules
import axios from "axios";
import swal from "sweetalert";
import { API_ENDPOINT } from "../../config";
import { 
    // Constants for course actions
    COURSE_CREATE_REQUEST, COURSE_CREATE_SUCCESS, COURSE_CREATE_FAIL,
    COURSE_GET_ALL_REQUEST, COURSE_GET_ALL_SUCCESS, COURSE_GET_ALL_FAIL,
    COURSE_GET_REQUEST, COURSE_GET_SUCCESS, COURSE_GET_FAIL,
    COURSE_UPDATE_REQUEST, COURSE_UPDATE_SUCCESS, COURSE_UPDATE_FAIL,
    COURSE_DELETE_REQUEST, COURSE_DELETE_SUCCESS, COURSE_DELETE_FAIL,
    COURSES_GET_BY_ID_REQUEST, COURSES_GET_BY_ID_SUCCESS, COURSES_GET_BY_ID_FAIL
} from "../../constants/courseConstants/courseConstants";


// Action to create a new course
export const createCourse = (
    InstructorID,
    courseID,
    courseName,
    courseInstructor,
    courseDuration,
    courseDescription,
    coursePrice
) => async (dispatch, getState) => {
    try {
        dispatch({
            type: COURSE_CREATE_REQUEST,
        });

        // Get user info from state
        const {
            user_Login: { userInfo },
        } = getState();

        // Configure request headers
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        // Make POST request to create course
        const { data } = await axios.post(
            `${API_ENDPOINT}/course/instructor/add-course`,
            {
                InstructorID,
                courseID,
                courseName,
                courseInstructor,
                courseDuration,
                courseDescription,
                coursePrice
            },
            config
        );

        // Dispatch success action and show success message
        dispatch({
            type: COURSE_CREATE_SUCCESS,
            payload: data,
        });
        swal({
            title: "Success !!!",
            text: "Course Creation Successful.",
            icon: "success",
            timer: 2000,
            button: false,
        });
        // Redirect to homepage after successful creation
        setTimeout(function () {
            window.location.href = "/";
        }, 2000);
    } catch (error) {
        // If creation fails, dispatch failure action and display error message
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({
            type: COURSE_CREATE_FAIL,
            payload: message,
        });
    }
};


// Action to get all courses
export const getAllCourses = () => async (dispatch, getState) => {
    try {
        dispatch({ type: COURSE_GET_ALL_REQUEST });

        // Get user info from state
        const { user_Login: { userInfo }, } = getState();

        // Configure request headers
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        // Make GET request to fetch all courses
        const { data } = await axios.get(`${API_ENDPOINT}/course/instructor/get-courselist`, config);

        console.log("action data", data);

        // Dispatch success action with fetched courses
        dispatch({
            type: COURSE_GET_ALL_SUCCESS,
            payload: data,
        });
    } catch (error) {
        // Dispatch failure action if an error occurs
        dispatch({
            type: COURSE_GET_ALL_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};


// Action to get a single course by its ID
export const getCourseById = (courseId) => async (dispatch) => {
    try {
        dispatch({ type: COURSE_GET_REQUEST });

        // Make GET request to fetch course by ID
        const { data } = await axios.get(`${API_ENDPOINT}/course/instructor/view-course/${courseId}`);

        // Dispatch success action with fetched course
        dispatch({
            type: COURSE_GET_SUCCESS,
            payload: data,
        });

        console.log("getbyID", data)
    } catch (error) {
        // Dispatch failure action if an error occurs
        dispatch({
            type: COURSE_GET_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};


// Action to update a course
export const updateCourse = (courseId, courseData) => async (dispatch, getState) => {
    try {
        dispatch({ type: COURSE_UPDATE_REQUEST });

        // Get user info from state
        const {
            user_Login: { userInfo },
        } = getState();

        // Configure request headers
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        // Make PUT request to update course
        await axios.put(`${API_ENDPOINT}/course/instructor/update-course/${courseId}`, courseData, config);

        // Dispatch success action and show success message
        dispatch({ type: COURSE_UPDATE_SUCCESS });
        swal({
            title: "Success !!!",
            text: "Course Update Successful.",
            icon: "success",
            timer: 2000,
            button: false,
        });

        // Redirect to user dashboard after a short delay
        setTimeout(function () {
            window.location.href = "/user-dashboard";
        }, 500);

    } catch (error) {
        // If update fails, dispatch failure action and display error message
        dispatch({
            type: COURSE_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};


// Action to delete a course
export const deleteCourse = (courseId) => async (dispatch, getState) => {
    try {
        dispatch({ type: COURSE_DELETE_REQUEST });

        // Get user info from state
        const {
            user_Login: { userInfo },
        } = getState();

        // Configure request headers
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        // Make DELETE request to delete course
        await axios.delete(`${API_ENDPOINT}/course/instructor/delete-course/${courseId}`, config);

        // Dispatch success action and show success message
        dispatch({ type: COURSE_DELETE_SUCCESS });
        swal({
            title: "Success !!!",
            text: "Course Deletion Successful.",
            icon: "success",
            timer: 2000,
            button: false,
        });

        // Redirect to user dashboard after a short delay
        setTimeout(function () {
            window.location.href = "/user-dashboard";
        }, 500);

    } catch (error) {
        // If deletion fails, dispatch failure action and display error message
        dispatch({
            type: COURSE_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};


// Action to get courses by InstructorID
export const getCoursesByInstructor = (instructorId) => async (dispatch, getState) => {
    try {
        // Dispatch request action
        dispatch({ type: COURSES_GET_BY_ID_REQUEST });

        // Get user info from state
        const { user_Login: { userInfo } } = getState();

        // Configure request headers
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        // Make API call to fetch courses by InstructorID
        const { data } = await axios.get(`${API_ENDPOINT}/course/instructor/get-courses/${instructorId}`, config);

        console.log("Action", data);
        // Dispatch success action with fetched courses
        dispatch({
            type: COURSES_GET_BY_ID_SUCCESS,
            payload: data,
        });
    } catch (error) {
        // Dispatch failure action if an error occurs
        dispatch({
            type: COURSES_GET_BY_ID_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};
