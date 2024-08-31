import {combineReducers} from '@reduxjs/toolkit';
import other from './other/slice';
import app from './app/slice';
import auth from './auth/slice';

import user from './user/slice';

export default combineReducers({app, auth, user, other});
