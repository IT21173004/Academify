// enrollActions.js

import axios from 'axios';
import swal from 'sweetalert';
import { ENROLL_COURSE_REQUEST, ENROLL_COURSE_SUCCESS, ENROLL_COURSE_FAIL, ENROLLS_GET_BY_ID_REQUEST, ENROLLS_GET_BY_ID_SUCCESS, ENROLLS_GET_BY_ID_FAIL,  ENROLL_DELETE_REQUEST, ENROLL_DELETE_SUCCESS, ENROLL_DELETE_FAIL} from '../../constants/enrollConstants/enrollConstants'; 
import { API_ENDPOINT } from '../../config'; // Import your API endpoint config

export const enrollCourse = (learnerId, courseId, email, phoneNumber) => async (dispatch, getState) => {
    try {
        dispatch({ type: ENROLL_COURSE_REQUEST });

        const {
            user_Login: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(
            `${API_ENDPOINT}/learner/enrollment/enroll`,
            {
                learnerId,
                courseId,
                email,
                phoneNumber,
            },
            config
        );

        dispatch({
            type: ENROLL_COURSE_SUCCESS,
            payload: data,
        });

        swal({
            title: 'Success !!!',
            text: 'Enrollment Successful.',
            icon: 'success',
            timer: 2000,
            button: false,
        });

        setTimeout(function () {
            window.location.href = '/user-dashboard'; // Redirect to user dashboard after enrollment
        }, 2000);
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({
            type: ENROLL_COURSE_FAIL,
            payload: message,
        });
    }
};



export const getCoursesByStudentId = (learnerId) => async (dispatch, getState) => {
    try {
        dispatch({ type: ENROLLS_GET_BY_ID_REQUEST });

        const { user_Login: { userInfo } } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`${API_ENDPOINT}/learner/enrollment/enrolls/${learnerId}`, config);
        console.log("Actions",data)
        dispatch({
            type: ENROLLS_GET_BY_ID_SUCCESS,
            payload: data, // Pass learnerId and enrollments data
        });
    } catch (error) {
        dispatch({
            type: ENROLLS_GET_BY_ID_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};


export const deleteEnroll = (enrollmentId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ENROLL_DELETE_REQUEST
        });

        const {
            user_Login: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        // Make API request to delete enrollment
        await axios.delete(`${API_ENDPOINT}/learner/enrollment/enroll/${enrollmentId}`, config); // Use the correct API endpoint

        dispatch({
            type: ENROLL_DELETE_SUCCESS
        });

        // Optionally, you can dispatch another action to get updated enrollments after deletion
        // dispatch(getCoursesByStudentId(userInfo._id));

        // Optionally, show a success message
        swal({
            title: 'Success !!!',
            text: 'Enrollment Deleted Successfully.',
            icon: 'success',
            timer: 2000,
            button: false,
        });

    } catch (error) {
        dispatch({
            type: ENROLL_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });

        // Optionally, show an error message
        swal({
            title: 'Error !!!',
            text: 'Failed to Delete Enrollment.',
            icon: 'error',
            button: 'OK',
        });
    }
};


