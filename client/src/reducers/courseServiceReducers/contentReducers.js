import { 
    ADD_CONTENT_REQUEST, ADD_CONTENT_SUCCESS, ADD_CONTENT_FAILURE,
	GET_CONTENT_FOR_COURSE_REQUEST, GET_CONTENT_FOR_COURSE_SUCCESS, GET_CONTENT_FOR_COURSE_FAILURE,
	GET_SPECIFIC_CONTENT_REQUEST, GET_SPECIFIC_CONTENT_SUCCESS, GET_SPECIFIC_CONTENT_FAILURE,
    UPDATE_CONTENT_REQUEST, UPDATE_CONTENT_SUCCESS, UPDATE_CONTENT_FAILURE
 } from "../../constants/courseConstants/contentConstants";

 
export  const addContentReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_CONTENT_REQUEST:
			return { loading: true };
		case ADD_CONTENT_SUCCESS:
			return { loading: false, success: true };
		case ADD_CONTENT_FAILURE:
			return { loading: false, error: action.payload };

		default:
			return state;
    }
  };
  

  export const contentListReducer = (state = { contents: [] }, action) => {
	switch (action.type) {
		case GET_CONTENT_FOR_COURSE_REQUEST:
			return { loading: true };
		case GET_CONTENT_FOR_COURSE_SUCCESS:
			return { loading: false, contents: action.payload };
		case GET_CONTENT_FOR_COURSE_FAILURE:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};


export const contentViewReducer = (state = {}, action) => {
	switch (action.type) {
		case GET_SPECIFIC_CONTENT_REQUEST:
			return { loading: true };
		case GET_SPECIFIC_CONTENT_SUCCESS:
			return { loading: false, content: action.payload };
		case GET_SPECIFIC_CONTENT_FAILURE:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};



export const contentUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case UPDATE_CONTENT_REQUEST:
			return { loading: true };
		case UPDATE_CONTENT_SUCCESS:
			return { loading: false, success: true };
		case UPDATE_CONTENT_FAILURE:
			return { loading: false, error: action.payload, success: false };

		default:
			return state;
	}
};