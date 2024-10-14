// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // Đường dẫn đến userSlice của bạn

const store = configureStore({
  reducer: {
    users: userReducer,
  },
});

const storedUser = localStorage.getItem("loggedInUser");
if (storedUser) {
  const user = JSON.parse(storedUser);
}

export default store;
