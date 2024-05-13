import axios from 'axios';
import {
    ENROLL_COURSE_REQUEST,
    ENROLL_COURSE_SUCCESS,
    ENROLL_COURSE_FAIL,
} from '../../constants/enrollConstants/enrollConstants'; // Define your action types/constants

export const enrollCourse = (enrollmentData) => async (dispatch) => {
    try {
        dispatch({ type: ENROLL_COURSE_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post('/api/enroll', enrollmentData, config);

        dispatch({
            type: ENROLL_COURSE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ENROLL_COURSE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};
