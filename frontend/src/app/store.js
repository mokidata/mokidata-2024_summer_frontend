import {configureStore} from '@reduxjs/toolkit'
import { saleSlice } from '../services/salesApiSlice';
import apiSliceReducer from './api/apiSlice';
import {  PERSIST, PURGE, persistReducer, persistStore} from 'redux-persist'
import sessionStorage from 'redux-persist/es/storage/session';


const persistConfig = {
    key:"root",
    storage:sessionStorage,
    whiteList : ["sale"]
};
const persistedReducer = persistReducer(persistConfig,saleSlice.reducer);
export const store = configureStore({
    reducer:{
        login: apiSliceReducer,
        sale : persistedReducer,
    },
    middleware:(getDefaultMiddleWare) => 
        getDefaultMiddleWare(
            {
                serializableCheck:false
            }
        )
});

export const persistor = persistStore(store);