import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer";
import logger from './middleware/logger';
import toastify from './middleware/toastify';
import api from "./middleware/api";



export default function configureAppStore() {
    return configureStore({
        reducer: reducer,
        middleware: [
            ...getDefaultMiddleware(),
            api,
            logger({ destination: "console" }),
            toastify,
        ]
    })

}