/* eslint-disable no-useless-catch */
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

// Lấy tất cả sản phẩm
export const getAllSanPham = async () => {
  try {
    const response = await axios.get(`${API_URL}/sanpham`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Lấy sản phẩm theo ID
export const getSanPhamById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/sanpham/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Thêm mới sản phẩm
export const createSanPham = async (sanpham) => {
  try {
    const response = await axios.post(`${API_URL}/them-san-pham`, sanpham);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Cập nhật sản phẩm
export const updateSanPham = async (id, sanpham) => {
  try {
    console.log("id: ", id, " sanpham: ", sanpham)
    const response = await axios.put(`${API_URL}/update-sanpham`, sanpham);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Xóa sản phẩm
export const deleteSanPham = async (id) => {
  try {
    await axios.delete(`${API_URL}/delete-san-pham/${id}`);
  } catch (error) {
    throw error;
  }
};
