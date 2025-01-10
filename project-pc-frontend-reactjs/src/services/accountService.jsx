/* eslint-disable no-useless-catch */
import { jwtDecode } from "jwt-decode"; // Sử dụng đúng cú pháp import
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

// Thêm mới account
export const createAccount = async (account) => {
    try {
        const response = await axios.post(`${API_URL}/register`, account);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Đăng nhập (Login)
export const login = async (email, password) => {
    try {
        // console.log("Email: ", email, " Pass: ", password)
        const response = await axios.post(`${API_URL}/login`, { email, password });
        // Assuming the response includes a token
        const { token } = response.data;

        // console.log("token: ", token)
        // token:  eyJNQV9USyI6NCwiVEVOX0RBTkdfTkhBUCI6ImJhb3F1b2N6ZXJvQGdtYWlsLmNvbSIsIlRFTl9QSEFOX1FVWUVOIjoiQWRtaW4iLCJURU5fS0hBQ0hfSEFORyI6Ik5ndXlcdTFlYzVuIExcdTAwZTJtIFF1XHUxZWQxYyBCXHUxZWEzbyIsIlNEVF9LSCI6bnVsbCwiRElBX0NISSI6IlRyXHUwMGUwIFZpbmgifQ==

        // Optionally, store the token in localStorage for future use
        localStorage.setItem('authToken', token);

        return token;
    } catch (error) {
        throw error;
    }
};
