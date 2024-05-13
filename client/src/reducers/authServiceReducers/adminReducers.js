import { 
    INSTRUCTOR_LIST_REQUEST, INSTRUCTOR_LIST_SUCCESS, INSTRUCTOR_LIST_FAIL,
    LEARNER_LIST_REQUEST, LEARNER_LIST_SUCCESS, LEARNER_LIST_FAIL,
    UPDATE_USER_BY_ID_REQUEST, UPDATE_USER_BY_ID_SUCCESS, UPDATE_USER_BY_ID_FAIL,
    DELETE_USER_BY_ID_REQUEST, DELETE_USER_BY_ID_SUCCESS, DELETE_USER_BY_ID_FAIL,
} from "../../constants/authConstants/adminConstants";


export const instructorListReducer = (state = { instructors: [] }, action) => {
	switch (action.type) {
		case INSTRUCTOR_LIST_REQUEST:
			return { ...state, loading: true };
		case INSTRUCTOR_LIST_SUCCESS:
			return {...state, loading: false, instructors: action.payload };
		case INSTRUCTOR_LIST_FAIL:
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
};

export const learnerListReducer = (state = { learners: [] }, action) => {
	switch (action.type) {
		case LEARNER_LIST_REQUEST:
			return { ...state, loading: true };
		case LEARNER_LIST_SUCCESS:
			return {...state, loading: false, learners: action.payload };
		case LEARNER_LIST_FAIL:
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
};

export const updateUserByIdReducer = (state = { }, action) => {
	switch (action.type) {
		case UPDATE_USER_BY_ID_REQUEST:
			return { ...state, loading: true };
		case UPDATE_USER_BY_ID_SUCCESS:
			return {...state, loading: false, userInfo: action.payload };
		case UPDATE_USER_BY_ID_FAIL:
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
};

export const deleteUserByIdReducer = (state = { }, action) => {
	switch (action.type) {
		case DELETE_USER_BY_ID_REQUEST:
			return { ...state, loading: true };
		case DELETE_USER_BY_ID_SUCCESS:
			return {...state, loading: false, userInfo: action.payload };
		case DELETE_USER_BY_ID_FAIL:
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
};