/* eslint-disable no-useless-catch */
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

// // Lấy tất cả account
// export const getAccounts = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/accounts`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// // Lấy account theo id
// export const getAccountById = async (id) => {
//   try {
//     const response = await axios.get(`${API_URL}/accounts/${id}`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// Thêm mới account
export const createAccount = async (account) => {
    try {
        // account:
        //     TEN_KHACH_HANG: "",
        //     DIA_CHI: "",
        //     GHI_CHU_KH: "",
        //     TEN_DANG_NHAP: "",
        //     MAT_KHAU: "",
        //     NHAP_LAI_MAT_KHAU: "",
        //     MA_PHAN_QUYEN: 1,

        console.log("account: ", account)
        const response = await axios.post(`${API_URL}/register`, account);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// // Cập nhật account
// export const updateAccount = async (id, account) => {
//   try {
//     const response = await axios.put(`${API_URL}/accounts/${id}`, account);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// // Xóa account
// export const deleteAccount = async (id) => {
//   try {
//     const response = await axios.delete(`${API_URL}/accounts/${id}`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

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