import {
    ENROLL_COURSE_REQUEST,
    ENROLL_COURSE_SUCCESS,
    ENROLL_COURSE_FAIL,
    ENROLLS_GET_BY_ID_REQUEST,
    ENROLLS_GET_BY_ID_SUCCESS,
    ENROLLS_GET_BY_ID_FAIL,
    ENROLL_DELETE_REQUEST,
    ENROLL_DELETE_SUCCESS,
    ENROLL_DELETE_FAIL
} from '../../constants/enrollConstants/enrollConstants'; // Adjust import path if needed

const initialState = {
    loading: false,
    error: null,
    enrolllist: []
};

export const enrollCreateReducer = (state = initialState, action) => {
    switch (action.type) {
        case ENROLL_COURSE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case ENROLL_COURSE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                enrollment: action.payload
            };
        case ENROLL_COURSE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export const enrollsByStudentReducer = (state = initialState, action) => {
    switch (action.type) {
        case ENROLLS_GET_BY_ID_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case ENROLLS_GET_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                enrolllist: action.payload.enrollments // Assuming action.payload contains enrollments array
            };
        case ENROLLS_GET_BY_ID_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};


export const enrollDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case ENROLL_DELETE_REQUEST:
        return { loading: true };
      case ENROLL_DELETE_SUCCESS:
        return { loading: false, success: true };
      case ENROLL_DELETE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

