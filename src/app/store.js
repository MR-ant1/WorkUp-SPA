
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { thunk } from "redux-thunk"
import userSlice from "./Slices/userSlice";
import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt"


const reducers = combineReducers({
    user: userSlice
});

const persistConfig = {
    key: 'root',
    storage,
    transforms: [
        encryptTransform({
            secretKey: 'BOMBOCLAAT',
            onError: function (error) {
                throw new Error(error)
            }
        })
    ]
};

const persistedReducer = persistReducer(persistConfig, reducers)

export default configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: false,
    }).concat(thunk)
});