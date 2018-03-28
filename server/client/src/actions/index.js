import axios from 'axios';
import { FETCH_USER } from './types';
import { CREATE_USER } from './types';
import { LOGIN_USER } from './types';
// redux thunk gives us direct access to the dispatch function
// to dispatch to all the reducers in the store, causing them
// to instantly recalculate the app state. Redux Thunk will
// inspect the value returned from the action creator, and if
// it's a function, it will call and automatically call the function
// and pass in dispatch as an argument
// we have to export the function to make use of it as props
// don't need parens if single argument in function call () not needed
export const fetchUser = () => async dispatch => {
	// whenever action creator gets called, instantly return a function
	// want to dispatch an action, after this api request has been completed
	// treat it as an asynchronous piece of code, only once it resolves, will
	// it actually dispatch an action, we can replace res with await line, 
	// to reduce it down to 1 line, but this is good.
	const res = await axios.get('/api/current_user');
	// we only need the user model, so we can pass res.data
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const userSignupRequest = (userData) => async dispatch => {
	const res = await axios.post('/api/register', userData)
	// res.data comes in as username-taken if taken, from api
	console.log(res.data);
	dispatch({ type: CREATE_USER, payload: res.data });
}

export const userLoginRequest = (userData) => async dispatch => {
	const res = await axios.post('/api/login', userData)
	console.log(res.data);
	dispatch({ type: LOGIN_USER, payload: res.data });
}
