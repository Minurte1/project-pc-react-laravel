import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Avatar,
  Typography,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
const UserProfile = () => {
  const api = process.env.URL_NODE;
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    TEN_KHACH_HANG: "", // Tên khách hàng
    SDT_KH: "", // Số điện thoại
    DIA_CHI: "", // Địa chỉ
    GHI_CHU_KH: "", // Ghi chú khách hàng
    TEN_DANG_NHAP: "", // Tên đăng nhập
    MA_PHAN_QUYEN: "", // Mã phân quyền
    TEN_PHAN_QUYEN: "", // Tên phân quyền
    GHI_CHU_PHAN_QUYEN: "", // Ghi chú phân quyền
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [avatarFile, setAvatarFile] = useState(null);
  const [dataUser, setDataUser] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Lấy token từ localStorage

        if (!token) {
          // Nếu không có token, điều hướng người dùng ra trang chủ
          navigate("/");
          return;
        }

        // Kiểm tra tính hợp lệ của token bằng cách giải mã và xử lý lỗi nếu token không hợp lệ
        try {
          const decoded = jwtDecode(token);
          setDataUser(decoded);
        } catch (decodeError) {
          console.error("Invalid token:", decodeError);
          navigate("/"); // Điều hướng ra trang chủ nếu token không hợp lệ
          return;
        }

        const decoded = jwtDecode(token);
        const response = await axios.get(
          `http://localhost:8000/api/khachhang/${decoded.MA_TK}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data.message == "ok") {
          console.log("oke");
          setUserData(response.data.data);
          setFormData({
            TEN_KHACH_HANG: response.data.data.TEN_KHACH_HANG,
            SDT_KH: response.data.data.SDT_KH,
            DIA_CHI: response.data.data.DIA_CHI,
            GHI_CHU_KH: response.data.data.GHI_CHU_KH,
            TEN_DANG_NHAP: response.data.data.TEN_DANG_NHAP,
            MA_PHAN_QUYEN: response.data.data.MA_PHAN_QUYEN,
            TEN_PHAN_QUYEN: response.data.data.TEN_PHAN_QUYEN,
            GHI_CHU_PHAN_QUYEN: response.data.data.GHI_CHU_PHAN_QUYEN,
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        // navigate("/"); // Điều hướng ra trang chủ nếu có lỗi xảy ra
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [api, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      if (avatarFile) {
        const formData = new FormData();
        formData.append("AVATAR", avatarFile);

        const response = await axios.put(
          `${api}/user/${dataUser.MANGUOIDUNG}`,
          formData
        );
        if (response.data.EC === 1) {
          enqueueSnackbar(response.data.EM, { variant: "success" });
        } else {
          enqueueSnackbar(response.data.EM, { variant: "error" });
        }
      }

      const response = await axios.put(
        `${api}/user/${dataUser.MANGUOIDUNG}`,
        formData
      );
      if (response.data.EC === 1) {
        setUserData(response.data.DT);
        enqueueSnackbar(response.data.EM, { variant: "success" });
      } else if (response.data.EC === 0) {
        enqueueSnackbar(response.data.EM, { variant: "error" });
      }

      setIsEditing(false);
    } catch (error) {
      enqueueSnackbar(error.response.data.EM, { variant: "error" });
      console.error("Error updating user data:", error);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  console.log("user", userData);
  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <Avatar
          src={`${api}/images/${userData?.AVATAR}`}
          alt={userData?.TENNGUOIDUNG}
          sx={{ width: 40, height: 40, mr: 2 }}
        />
        <Typography variant="h5">{userData?.TENNGUOIDUNG || "User"}</Typography>
      </Box>{" "}
      {isEditing && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" gutterBottom>
            Change Avatar:
          </Typography>
          <input
            name="AVATAR"
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
          />
        </Box>
      )}
      {isEditingPassword ? (
        <>
          {" "}
          <TextField
            margin="normal"
            type="password"
            label="Nhập Mật khẩu Cũ"
            name="CURRENT_PASSWORD"
            value={formData.CURRENT_PASSWORD || ""}
            onChange={handleChange}
            fullWidth
          />{" "}
          <TextField
            margin="normal"
            type="password"
            label="Nhập Mật khẩu Mới"
            name="MATKHAU"
            value={formData.MATKHAU || ""}
            onChange={handleChange}
            fullWidth
          />{" "}
          <TextField
            margin="normal"
            type="password"
            label="Xác nhận mật khẩu mới"
            name="MATKHAUMOI"
            value={confirmPassword || ""}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
          />{" "}
        </>
      ) : (
        <>
          {" "}
          <TextField
            margin="normal"
            label="Tên Khách Hàng"
            name="TEN_KHACH_HANG"
            value={formData.TEN_KHACH_HANG || ""}
            onChange={handleChange}
            fullWidth
            disabled={!isEditing}
          />
          <TextField
            margin="normal"
            label="Email"
            name="TEN_DANG_NHAP"
            value={formData.TEN_DANG_NHAP || ""}
            onChange={handleChange}
            fullWidth
            disabled={true}
          />
          <TextField
            margin="normal"
            label="Số điện thoại"
            name="SDT_KH"
            value={formData.SDT_KH || ""}
            onChange={handleChange}
            fullWidth
            disabled={!isEditing}
          />
          <TextField
            margin="normal"
            label="Địa chỉ"
            name="DIA_CHI"
            value={formData.DIA_CHI || ""}
            onChange={handleChange}
            fullWidth
            disabled={!isEditing}
          />{" "}
        </>
      )}
      {isEditing ? (
        <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
          <Button variant="outlined" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </Box>
      ) : (
        <>
          {" "}
          {!isEditingPassword ? (
            <>
              {" "}
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={() => setIsEditing(true)}
              >
                Chỉnh sửa thông tin
              </Button>{" "}
            </>
          ) : (
            false
          )}
        </>
      )}{" "}
      {isEditingPassword ? (
        <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="outlined"
            onClick={() => setIsEditingPassword(false)}
          >
            Hủy bỏ
          </Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Lưu
          </Button>
        </Box>
      ) : (
        <>
          {" "}
          {!isEditing ? (
            <>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={() => setIsEditingPassword(true)}
              >
                Thay đổi mật khẩu
              </Button>{" "}
            </>
          ) : (
            false
          )}
        </>
      )}
    </Box>
  );
};

export default UserProfile;
