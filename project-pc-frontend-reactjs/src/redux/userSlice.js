// src/store/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    list: [
      { id: 1, name: "Eric" },
      { id: 2, name: "Hoi dan it" },
      { id: 3, name: "Eric va Hoi dan it" },
    ],
    loggedInUser: null, // Trạng thái người dùng đang đăng nhập
  },
  reducers: {
    loginUser: (state, action) => {
      const user = state.list.find((user) => user.id === action.payload.id);
      if (user) {
        state.loggedInUser = user;
        localStorage.setItem("loggedInUser", JSON.stringify(user)); // Lưu thông tin người dùng vào local storage
      }
    },
    logoutUser: (state) => {
      state.loggedInUser = null;
      localStorage.removeItem("loggedInUser"); // Xóa thông tin người dùng khỏi local storage
    },
    deleteUser: (state, action) => {
      state.list = state.list.filter((user) => user.id !== action.payload.id);
    },
    createUser: (state) => {
      const id = Math.floor(Math.random() * 10000);
      const user = { id, name: `random - ${id}` };
      state.list.push(user);
    },
  },
});

export const { loginUser, logoutUser, deleteUser, createUser } =
  userSlice.actions;
export default userSlice.reducer;
