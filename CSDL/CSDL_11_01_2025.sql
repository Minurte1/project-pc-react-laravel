-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th1 11, 2025 lúc 03:36 AM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `banpc`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chi_tiet_hoa_don`
--

CREATE TABLE `chi_tiet_hoa_don` (
  `MA_CTHD` int(11) NOT NULL,
  `MASP` int(11) NOT NULL,
  `MAHD` int(11) NOT NULL,
  `SO_LUONG` int(11) DEFAULT NULL,
  `GIAM_GIA` varchar(10) DEFAULT NULL,
  `GHI_CHU_CTHD` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `chi_tiet_hoa_don`
--

INSERT INTO `chi_tiet_hoa_don` (`MA_CTHD`, `MASP`, `MAHD`, `SO_LUONG`, `GIAM_GIA`, `GHI_CHU_CTHD`) VALUES
(1, 1, 1, 1, '0', 'Đơn hàng đầu tiên.'),
(2, 3, 2, 1, '0', 'Giảm giá cho khách hàng thân thiết.'),
(3, 5, 3, 1, '0', 'Giảm giá đặc biệt cho khách hàng mới.'),
(4, 2, 4, 1, '1', 'Dễ vỡ'),
(5, 2, 5, 1, '1', 'Dễ vỡ'),
(9, 1, 9, 1, '0', 'Giao từ từ thôi'),
(10, 2, 9, 1, '0', 'Giao nhanh');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `gio_hang`
--

CREATE TABLE `gio_hang` (
  `MA_KH` int(11) NOT NULL,
  `MASP` int(11) NOT NULL,
  `SO_LUONG_SP` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `gio_hang`
--

INSERT INTO `gio_hang` (`MA_KH`, `MASP`, `SO_LUONG_SP`) VALUES
(1, 1, 1),
(2, 3, 1),
(3, 5, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hoadon`
--

CREATE TABLE `hoadon` (
  `MAHD` int(11) NOT NULL,
  `MA_KH` int(11) NOT NULL,
  `DIA_CHI_SHIP` varchar(255) DEFAULT NULL,
  `SDT_LIEN_HE_KH` varchar(20) DEFAULT NULL,
  `GHI_CHU_HOA_DON` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `hoadon`
--

INSERT INTO `hoadon` (`MAHD`, `MA_KH`, `DIA_CHI_SHIP`, `SDT_LIEN_HE_KH`, `GHI_CHU_HOA_DON`) VALUES
(1, 1, 'Hà Nội', '0912345678', 'Đơn thanh toán thành công'),
(2, 2, 'Đà Nẵng', '0987654321', 'Đơn đang chờ xử lý'),
(3, 3, 'Hồ Chí Minh', '0901234567', 'Đơn hàng đã hủy'),
(4, 1, 'Trà vinh', '0372701722', 'Đơn thanh toán thành công'),
(5, 1, 'Trà vinh', '0372701722', 'Đơn thanh toán thành công'),
(9, 6, 'Trà vinh', '0372701722', 'Đang chờ thanh toán');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `khachhang`
--

CREATE TABLE `khachhang` (
  `MA_KH` int(11) NOT NULL,
  `SDT_KH` varchar(20) DEFAULT NULL,
  `TEN_KHACH_HANG` varchar(255) DEFAULT NULL,
  `DIA_CHI` varchar(255) DEFAULT NULL,
  `GHI_CHU_KH` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `khachhang`
--

INSERT INTO `khachhang` (`MA_KH`, `SDT_KH`, `TEN_KHACH_HANG`, `DIA_CHI`, `GHI_CHU_KH`) VALUES
(1, '0912345678', 'Nguyễn Văn A', 'Hà Nội', 'Đang hoạt động'),
(2, '0987654321', 'Trần Thị B', 'Đà Nẵng', 'Đang hoạt động'),
(3, '0901234567', 'Lê Văn C', 'Hồ Chí Minh', 'Đang hoạt động'),
(4, '0213654897', 'Nguyễn Lâm Quốc Bảo', 'Trà Vinh', 'Đang hoạt động'),
(6, '0213654897', 'Nguyễn Lâm Quốc Bảo', 'Trà Vinh', 'Ngưng hoạt động'),
(10, '0213654897', 'baoquocone@gmail.com', 'baoquocone@gmail.com', 'Đang hoạt động');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `phan_quyen`
--

CREATE TABLE `phan_quyen` (
  `MA_PHAN_QUYEN` int(11) NOT NULL,
  `TEN_PHAN_QUYEN` varchar(255) DEFAULT NULL,
  `GHI_CHU_PHAN_QUYEN` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `phan_quyen`
--

INSERT INTO `phan_quyen` (`MA_PHAN_QUYEN`, `TEN_PHAN_QUYEN`, `GHI_CHU_PHAN_QUYEN`) VALUES
(1, 'Admin', 'Quyền quản trị.'),
(2, 'User', 'Quyền người dùng.');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sanpham`
--

CREATE TABLE `sanpham` (
  `MASP` int(11) NOT NULL,
  `MATL` int(11) NOT NULL,
  `TENSP` varchar(1000) DEFAULT NULL,
  `DON_GIA` varchar(255) DEFAULT NULL,
  `TON_KHO_SP` int(11) DEFAULT NULL,
  `CHIP` varchar(1000) DEFAULT NULL,
  `MAIN` varchar(1000) DEFAULT NULL,
  `VGA` varchar(1000) DEFAULT NULL,
  `NHA_SAN_XUAT` varchar(1000) DEFAULT NULL,
  `RAM` varchar(1000) DEFAULT NULL,
  `ROM` varchar(1000) DEFAULT NULL,
  `ANHSP` text DEFAULT NULL,
  `GHI_CHU_SP` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `sanpham`
--

INSERT INTO `sanpham` (`MASP`, `MATL`, `TENSP`, `DON_GIA`, `TON_KHO_SP`, `CHIP`, `MAIN`, `VGA`, `NHA_SAN_XUAT`, `RAM`, `ROM`, `ANHSP`, `GHI_CHU_SP`) VALUES
(1, 1, 'PC Gaming Entry Level', '10000000', 50, 'I7', 'Mainboard ASUS ROG Strix Z790-E Gaming WiFi II', 'GTX4090', 'HP', '64GB', '1TB', '1736497744_profile_pic-1701606602644.png', 'Máy tính PC chơi game giá rẻ.'),
(2, 1, 'PC Workstation', '25000000', 30, 'i9', 'Mainboard ASUS ROG Strix Z790-E Gaming WiFi II', 'Intel UHD Graphics', 'Dell', '8GB', '1TB', '1736497785_profile_pic-1702104939491.png', 'Máy tính làm việc chuyên nghiệp cho đồ họa.'),
(3, 1, 'PC Gaming Mid Range', '60000000', 20, 'i9', 'Mainboard ASUS ROG Strix Z790-E Gaming WiFi II', 'Intel Iris Xe Graphics', 'Asus', '16GB', '1TB', '1736497810_profile_pic-1701606624469.png', 'Máy tính PC chơi game hiệu suất tốt.'),
(4, 1, 'PC Gaming High-End', '120000000', 10, 'I7', 'Mainboard ASUS ROG Strix Z790-E Gaming WiFi II', 'Intel Iris Xe Graphics', 'MSI', '16GB', '1TB', '1736497851_profile_pic-1701874343809.png', 'Máy tính PC chơi game cao cấp.'),
(5, 1, 'PC Gaming Premium', '200000000', 5, 'I7', 'Mainboard ASUS ROG Strix Z790-E Gaming WiFi II', 'Intel Iris Xe Graphics', 'Alienware', '16GB', '1TB', '1736562813_profile_pic-1701606616285.png', 'Máy tính PC chơi game hàng đầu, hiệu suất cực cao.'),
(6, 1, 'PC Mini Gaming', '15000000', 40, 'null', 'null', 'null', 'Lenovo', 'null', 'null', '1736445144_anh-meo-53.jpg', 'PC mini dành cho game thủ di động.'),
(7, 1, 'PC All-in-One', '30000000', 25, 'null', 'null', 'null', 'Acer', 'null', 'null', '1736445151_anh-meo-53.jpg', 'Máy tính All-in-One tiết kiệm không gian.'),
(8, 1, 'PC Desktop Văn Phòng', '20000000', 35, 'null', 'null', 'null', 'Asus', 'null', 'null', '1736445158_anh-meo-53.jpg', 'Máy tính văn phòng hiệu suất cao.'),
(9, 1, 'PC Gaming Ultra', '175000000', 15, 'null', 'null', 'null', 'Razer', 'null', 'null', '1736445166_anh-meo-53.jpg', 'Máy tính chơi game hiệu suất cực cao.'),
(10, 1, 'PC Lắp Ráp Tùy Chỉnh', '50000000', 20, 'null', 'null', 'null', 'Tự Lắp', 'null', 'null', '1736445173_anh-meo-53.jpg', 'Máy tính lắp ráp theo yêu cầu người dùng.'),
(11, 1, 'PC Gaming High Performance', '95000000', 10, 'null', 'null', 'null', 'Corsair', 'null', 'null', '1736445180_anh-meo-53.jpg', 'Máy tính chơi game với hiệu suất hàng đầu.'),
(12, 1, 'PC Đồ Họa Chuyên Nghiệp', '180000000', 8, NULL, NULL, NULL, 'NVIDIA', NULL, NULL, 'link_anh_12.jpg', 'Máy tính đồ họa cho designer chuyên nghiệp.'),
(13, 1, 'PC Gaming Budget', '12000000', 60, NULL, NULL, NULL, 'MSI', NULL, NULL, 'link_anh_13.jpg', 'Máy tính chơi game giá rẻ cho học sinh.'),
(14, 1, 'PC Trạm Làm Việc Cao Cấp', '300000000', 5, NULL, NULL, NULL, 'Apple', NULL, NULL, 'link_anh_14.jpg', 'Máy tính trạm cho công việc thiết kế đồ họa.'),
(15, 1, 'PC Văn Phòng Tiết Kiệm', '10000000', 70, NULL, NULL, NULL, 'HP', NULL, NULL, 'link_anh_15.jpg', 'Máy tính văn phòng với giá hợp lý.'),
(16, 2, 'PC Gaming VR Ready', '120000000', 12, NULL, NULL, NULL, 'Alienware', NULL, NULL, 'link_anh_16.jpg', 'Máy tính chơi game VR với hiệu suất cao.'),
(17, 2, 'PC Workstation Đồ Họa', '250000000', 6, NULL, NULL, NULL, 'Dell', NULL, NULL, 'link_anh_17.jpg', 'Máy tính workstation cho thiết kế đồ họa chuyên nghiệp.'),
(18, 2, 'PC Gaming Entry-Level', '9000000', 50, NULL, NULL, NULL, 'Gigabyte', NULL, NULL, 'link_anh_18.jpg', 'Máy tính chơi game dành cho người mới bắt đầu.'),
(19, 2, 'PC Chiến Thắng', '50000000', 30, NULL, NULL, NULL, 'Cooler Master', NULL, NULL, 'link_anh_19.jpg', 'Máy tính chơi game với thiết kế độc đáo và hiệu suất cao.'),
(20, 2, 'PC Văn Phòng Năng Động', '15000000', 45, NULL, NULL, NULL, 'Asrock', NULL, NULL, 'link_anh_20.jpg', 'Máy tính văn phòng với hiệu suất tốt và giá cả hợp lý.'),
(21, 1, 'aaaaaaaaaaaa', '1', 2, 'aaaaaaaaaaaa', 'aaaaaaaaaaaa', 'aaaaaaaaaaaa', 'aaaaaaaaaaaa', 'aaaaaaaaaaaa', 'aaaaaaaaaaaa', '1736287227_anh-meo-53.jpg', 'aaaaaaaaaaaa'),
(22, 1, 'aaaaaaaaggggg', '1', 1, 'aaaaaaaaggggg', 'aaaaaaaaggggg', 'aaaaaaaaggggg', 'aaaaaaaaggggg', 'aaaaaaaaggggg', 'aaaaaaaaggggg', '1736287576_YrTtSIz8-wallha.com.jpg', 'aaaaaaaaggggg');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tai_khoan`
--

CREATE TABLE `tai_khoan` (
  `MA_TK` int(11) NOT NULL,
  `MA_PHAN_QUYEN` int(11) NOT NULL,
  `MA_KH` int(11) NOT NULL,
  `TEN_DANG_NHAP` varchar(255) DEFAULT NULL,
  `MAT_KHAU` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `tai_khoan`
--

INSERT INTO `tai_khoan` (`MA_TK`, `MA_PHAN_QUYEN`, `MA_KH`, `TEN_DANG_NHAP`, `MAT_KHAU`) VALUES
(1, 1, 1, 'nguyenvana', 'password123'),
(2, 2, 2, 'tranthib', 'password456'),
(3, 1, 3, 'levanc', 'password789'),
(6, 1, 6, 'baoquoczero@gmail.com', '$2y$10$/OLWw6t01DtjLYd7oEDua.koHggPvH3lcp86BgPpqn6.h8AVKoP6y'),
(10, 2, 10, 'baoquocone@gmail.com', '$2y$10$KSkTxO3gUek0NYrr9Gwod.IlJ0voMsj6pKT9gkt0AQXR0ImjOzoIK');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `theloai`
--

CREATE TABLE `theloai` (
  `MATL` int(11) NOT NULL,
  `TENTL` varchar(1000) DEFAULT NULL,
  `MO_TA_TL` text DEFAULT NULL,
  `GHI_CHU_TL` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `theloai`
--

INSERT INTO `theloai` (`MATL`, `TENTL`, `MO_TA_TL`, `GHI_CHU_TL`) VALUES
(1, 'Gaming', 'Máy tính chơi game.', 'Được thiết kế cho game thủ.'),
(2, 'Workstation', 'Máy tính văn phòng.', 'Dành cho công việc chuyên nghiệp.');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `chi_tiet_hoa_don`
--
ALTER TABLE `chi_tiet_hoa_don`
  ADD PRIMARY KEY (`MA_CTHD`),
  ADD KEY `FK_CO_CHI_TIET` (`MAHD`),
  ADD KEY `FK_CO_SAN_PHAM` (`MASP`);

--
-- Chỉ mục cho bảng `gio_hang`
--
ALTER TABLE `gio_hang`
  ADD PRIMARY KEY (`MA_KH`,`MASP`),
  ADD KEY `FK_GIO_HANG2` (`MASP`);

--
-- Chỉ mục cho bảng `hoadon`
--
ALTER TABLE `hoadon`
  ADD PRIMARY KEY (`MAHD`),
  ADD KEY `FK_TAO_HOA__ON` (`MA_KH`);

--
-- Chỉ mục cho bảng `khachhang`
--
ALTER TABLE `khachhang`
  ADD PRIMARY KEY (`MA_KH`);

--
-- Chỉ mục cho bảng `phan_quyen`
--
ALTER TABLE `phan_quyen`
  ADD PRIMARY KEY (`MA_PHAN_QUYEN`);

--
-- Chỉ mục cho bảng `sanpham`
--
ALTER TABLE `sanpham`
  ADD PRIMARY KEY (`MASP`),
  ADD KEY `FK_THUOC_LOAI` (`MATL`);

--
-- Chỉ mục cho bảng `tai_khoan`
--
ALTER TABLE `tai_khoan`
  ADD PRIMARY KEY (`MA_TK`),
  ADD KEY `FK_CO_QUYEN` (`MA_PHAN_QUYEN`),
  ADD KEY `FK_CO_TAI_KHOAN` (`MA_KH`);

--
-- Chỉ mục cho bảng `theloai`
--
ALTER TABLE `theloai`
  ADD PRIMARY KEY (`MATL`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `chi_tiet_hoa_don`
--
ALTER TABLE `chi_tiet_hoa_don`
  MODIFY `MA_CTHD` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `hoadon`
--
ALTER TABLE `hoadon`
  MODIFY `MAHD` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT cho bảng `khachhang`
--
ALTER TABLE `khachhang`
  MODIFY `MA_KH` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `phan_quyen`
--
ALTER TABLE `phan_quyen`
  MODIFY `MA_PHAN_QUYEN` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `sanpham`
--
ALTER TABLE `sanpham`
  MODIFY `MASP` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT cho bảng `tai_khoan`
--
ALTER TABLE `tai_khoan`
  MODIFY `MA_TK` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `theloai`
--
ALTER TABLE `theloai`
  MODIFY `MATL` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `chi_tiet_hoa_don`
--
ALTER TABLE `chi_tiet_hoa_don`
  ADD CONSTRAINT `FK_CO_CHI_TIET` FOREIGN KEY (`MAHD`) REFERENCES `hoadon` (`MAHD`),
  ADD CONSTRAINT `FK_CO_SAN_PHAM` FOREIGN KEY (`MASP`) REFERENCES `sanpham` (`MASP`);

--
-- Các ràng buộc cho bảng `gio_hang`
--
ALTER TABLE `gio_hang`
  ADD CONSTRAINT `FK_GIO_HANG` FOREIGN KEY (`MA_KH`) REFERENCES `khachhang` (`MA_KH`),
  ADD CONSTRAINT `FK_GIO_HANG2` FOREIGN KEY (`MASP`) REFERENCES `sanpham` (`MASP`);

--
-- Các ràng buộc cho bảng `hoadon`
--
ALTER TABLE `hoadon`
  ADD CONSTRAINT `FK_TAO_HOA__ON` FOREIGN KEY (`MA_KH`) REFERENCES `khachhang` (`MA_KH`);

--
-- Các ràng buộc cho bảng `sanpham`
--
ALTER TABLE `sanpham`
  ADD CONSTRAINT `FK_THUOC_LOAI` FOREIGN KEY (`MATL`) REFERENCES `theloai` (`MATL`);

--
-- Các ràng buộc cho bảng `tai_khoan`
--
ALTER TABLE `tai_khoan`
  ADD CONSTRAINT `FK_CO_QUYEN` FOREIGN KEY (`MA_PHAN_QUYEN`) REFERENCES `phan_quyen` (`MA_PHAN_QUYEN`),
  ADD CONSTRAINT `FK_CO_TAI_KHOAN` FOREIGN KEY (`MA_KH`) REFERENCES `khachhang` (`MA_KH`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
