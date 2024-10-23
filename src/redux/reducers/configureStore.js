import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import rootReducer from "./index"; // root reducer'ınız burada olacak
import { thunk } from "redux-thunk";


const store = configureStore({
  reducer: rootReducer,
},applyMiddleware(thunk));

export default store;