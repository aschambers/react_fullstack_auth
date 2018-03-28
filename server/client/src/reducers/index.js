import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { reducer as formReducer } from 'redux-form';

// auth piece of state is being manufactured by the authReducer
export default combineReducers({
	// this.state.auth gets passed username-taken from authReducer
	// if the username is taken
	auth: authReducer,
	form: formReducer
});
