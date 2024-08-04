import {combineReducers} from '@reduxjs/toolkit';
import other from './other/slice';
import app from './app/slice';

export default combineReducers({app, other});
