import {configureStore} from '@reduxjs/toolkit'
import { saleSlice } from '../services/salesApiSlice';
import apiSliceReducer from './api/apiSlice';
const store = configureStore({
    reducer:{
        login: apiSliceReducer,
        sale : saleSlice.reducer,
    },
});

export default store;