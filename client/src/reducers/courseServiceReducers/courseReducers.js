import { 
    COURSE_CREATE_REQUEST, COURSE_CREATE_SUCCESS, COURSE_CREATE_FAIL,
	COURSE_GET_ALL_REQUEST, COURSE_GET_ALL_SUCCESS, COURSE_GET_ALL_FAIL,
    COURSE_GET_REQUEST, COURSE_GET_SUCCESS, COURSE_GET_FAIL,
    COURSE_UPDATE_REQUEST, COURSE_UPDATE_SUCCESS, COURSE_UPDATE_FAIL,
    COURSE_DELETE_REQUEST, COURSE_DELETE_SUCCESS, COURSE_DELETE_FAIL,
    COURSES_GET_BY_ID_REQUEST, COURSES_GET_BY_ID_SUCCESS, COURSES_GET_BY_ID_FAIL

 } from "../../constants/courseConstants/courseConstants";

export const courseCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case COURSE_CREATE_REQUEST:
			return { loading: true };
		case COURSE_CREATE_SUCCESS:
			return { loading: false, success: true };
		case COURSE_CREATE_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const courseViewReducer = (state = {}, action) => {
	switch (action.type) {
		case COURSE_GET_REQUEST:
			return { loading: true };
		case COURSE_GET_SUCCESS:
			return { loading: false, course: action.payload };
		case COURSE_GET_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const courseListReducer = (state = { courses: [] }, action) => {
	switch (action.type) {
		case COURSE_GET_ALL_REQUEST:
			return { loading: true };
		case COURSE_GET_ALL_SUCCESS:
			return { loading: false, courses: action.payload };
		case COURSE_GET_ALL_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const courseUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case COURSE_UPDATE_REQUEST:
			return { loading: true };
		case COURSE_UPDATE_SUCCESS:
			return { loading: false, success: true };
		case COURSE_UPDATE_FAIL:
			return { loading: false, error: action.payload, success: false };

		default:
			return state;
	}
};

export const courseDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case COURSE_DELETE_REQUEST:
			return { loading: true };
		case COURSE_DELETE_SUCCESS:
			return { loading: false, success: true };
		case COURSE_DELETE_FAIL:
			return { loading: false, error: action.payload, success: false };

		default:
			return state;
	}
};

export const coursesByInstructorReducer = (state = { courselist: [] }, action) => {
	switch (action.type) {
		case COURSE_GET_ALL_REQUEST:
			return { loading: true };
		case COURSE_GET_ALL_SUCCESS:
			return { loading: false, courselist: action.payload };
		case COURSE_GET_ALL_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};