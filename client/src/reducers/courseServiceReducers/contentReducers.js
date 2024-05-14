import { 
    ADD_CONTENT_REQUEST, ADD_CONTENT_SUCCESS, ADD_CONTENT_FAILURE
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
  