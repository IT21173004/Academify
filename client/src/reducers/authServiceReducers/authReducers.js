import { 
    LOGIN_LOADING, 
    LOGIN_SUCCESS, 
    LOGIN_FAILURE,
	USER_LOGOUT,
    REGISTER_REQUEST, 
    REGISTER_SUCCESS, 
    REGISTER_FAILURE,
	USER_VIEW_REQUEST,
	USER_VIEW_SUCCESS,
	USER_VIEW_FAIL,
	UPDATE_REQUEST,
	UPDATE_SUCCESS,
	UPDATE_FAIL
 } from "../../constants/authConstants/authConstants";

export const userLoginReducer = (state = {}, action) => {
	switch (action.type) {
		case LOGIN_LOADING:
			return { loading: true };
		case LOGIN_SUCCESS:
			return { loading: false, userInfo: action.payload };
		case LOGIN_FAILURE:
			return { loading: false, error: action.payload };
		case USER_LOGOUT:
			return {};
		default:
			return state;
	}
};

export const userRegisterReducer = (state = {}, action) => {
	switch (action.type) {
		case REGISTER_REQUEST:
			return { loading: true };
		case REGISTER_SUCCESS:
			return { loading: false, userInfo: action.payload };
		case REGISTER_FAILURE:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const userViewReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_VIEW_REQUEST:
			return { loading: true };
		case USER_VIEW_SUCCESS:
			return { loading: false, userInfo: action.payload };
		case USER_VIEW_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const userUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case UPDATE_REQUEST:
			return { loading: true };
		case UPDATE_SUCCESS:
			return { loading: false, userInfo: action.payload };
		case UPDATE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};