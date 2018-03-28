import { FETCH_USER } from '../actions/types';
import { CREATE_USER } from '../actions/types';
import { LOGIN_USER } from '../actions/types';
// make initial state an empty object rather than undefined by default
// determine if user is logged in
// make state an empty object as of video 80, because we have no clue
// if user is logged in, only once we get a value, will we enter the
// switch case
export default function(state = null, action) {
	switch (action.type) {
		case FETCH_USER:
			return action.payload || false;
		case CREATE_USER:
			// action.payload gets passed username-taken if username taken 
			// from actions/index.js
			return action.payload || false;
		case LOGIN_USER:
			return action.payload || false;
		default: 
			return state;
	}
}
