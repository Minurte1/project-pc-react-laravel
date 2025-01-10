-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th1 10, 2025 lúc 07:53 AM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

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
-- Cấu trúc bảng cho bảng `chi_tiet_hoa__on`
--

CREATE TABLE `chi_tiet_hoa__on` (
  `MA_CTHD` int(11) NOT NULL,
  `MASP` int(11) NOT NULL,
  `MAHD` int(11) NOT NULL,
  `SO_LUONG` int(11) DEFAULT NULL,
  `GIAM_GIA` varchar(10) DEFAULT NULL,
  `GHI_CHU_CTHD` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `chi_tiet_hoa__on`
--

INSERT INTO `chi_tiet_hoa__on` (`MA_CTHD`, `MASP`, `MAHD`, `SO_LUONG`, `GIAM_GIA`, `GHI_CHU_CTHD`) VALUES
(1, 1, 1, 1, '0%', 'Đơn hàng đầu tiên.'),
(2, 3, 2, 1, '5%', 'Giảm giá cho khách hàng thân thiết.'),
(3, 5, 3, 1, '10%', 'Giảm giá đặc biệt cho khách hàng mới.'),
(4, 15, 4, 1, '0', NULL),
(5, 1, 5, 1, '0', NULL),
(6, 15, 5, 1, '0', NULL);

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
(1, 1, 'Hà Nội', '0912345678', 'Đơn hàng đầu tiên.'),
(2, 2, 'Đà Nẵng', '0987654321', 'Giao hàng trong vòng 2 ngày.'),
(3, 3, 'Hồ Chí Minh', '0901234567', 'Yêu cầu giao hàng gấp.'),
(4, 4, 'aaaaa', 'aaaaa', 'Đang chờ thanh toán'),
(5, 4, 'sdadasdas', '0334222111', 'Đang chờ thanh toán');

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
(1, '0912345678', 'Nguyễn Văn A', 'Hà Nội', 'Khách hàng VIP.'),
(2, '0987654321', 'Trần Thị B', 'Đà Nẵng', 'Khách hàng thân thiết.'),
(3, '0901234567', 'Lê Văn C', 'Hồ Chí Minh', 'Khách hàng mới.'),
(4, NULL, 'admin', 'admin', NULL);

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
(1, 1, 'PC Gaming Entry Level', '10000000', 50, 'null', 'null', 'null', 'HP', 'null', 'null', '1736490309_1108_1798319e79d7bc89e5c6.jpg', 'Máy tính PC chơi game giá rẻ.'),
(2, 1, 'PC Workstation', '25000000', 30, 'null', 'null', 'null', 'Dell', 'null', 'null', '1736490417_pc-game.png', 'Máy tính làm việc chuyên nghiệp cho đồ họa.'),
(3, 1, 'PC Gaming Mid Range', '60000000', 20, 'null', 'null', 'null', 'Asus', 'null', 'null', '1736490436_10239_340784857_799984757660921_1932046047919300131_n.jpg', 'Máy tính PC chơi game hiệu suất tốt.'),
(4, 1, 'PC Gaming High-End', '120000000', 10, 'null', 'null', 'null', 'MSI', 'null', 'null', '1736490462_pc-i9-13900k-rtx-4090.jpg', 'Máy tính PC chơi game cao cấp.'),
(5, 1, 'PC Gaming Premium', '200000000', 5, 'null', 'null', 'null', 'Alienware', 'null', 'null', '1736490375_27016-khung-pc.jpg', 'Máy tính PC chơi game hàng đầu, hiệu suất cực cao.'),
(6, 1, 'PC Mini Gaming', '15000000', 40, 'null', 'null', 'null', 'Lenovo', 'null', 'null', '1736490478_10609_2b81bef92315f74bae04.jpg', 'PC mini dành cho game thủ di động.'),
(7, 1, 'PC All-in-One', '30000000', 25, 'null', 'null', 'null', 'Acer', 'null', 'null', '1736490493_images.jpg', 'Máy tính All-in-One tiết kiệm không gian.'),
(8, 1, 'PC Desktop Văn Phòng', '20000000', 35, 'null', 'null', 'null', 'Asus', 'null', 'null', '1736490554_images (1).jpg', 'Máy tính văn phòng hiệu suất cao.'),
(9, 1, 'PC Gaming Ultra', '175000000', 15, 'null', 'null', 'null', 'Razer', 'null', 'null', '1736490586_maxresdefault.jpg', 'Máy tính chơi game hiệu suất cực cao.'),
(10, 1, 'PC Lắp Ráp Tùy Chỉnh', '50000000', 20, 'null', 'null', 'null', 'Tự Lắp', 'null', 'null', '1736490601_hq720.jpg', 'Máy tính lắp ráp theo yêu cầu người dùng.'),
(11, 1, 'PC Gaming High Performance', '95000000', 10, 'null', 'null', 'null', 'Corsair', 'null', 'null', '1736490616_vn-11134207-7r98o-lmhaa5xaysbj8a.jpg', 'Máy tính chơi game với hiệu suất hàng đầu.'),
(12, 1, 'PC Đồ Họa Chuyên Nghiệp', '180000000', 8, 'null', 'null', 'null', 'NVIDIA', 'null', 'null', '1736490637_images (2).jpg', 'Máy tính đồ họa cho designer chuyên nghiệp.'),
(13, 1, 'PC Gaming Budget', '12000000', 60, 'null', 'null', 'null', 'MSI', 'null', 'null', '1736490687_vn-11134207-7r98o-lnbb9l41ft9p79.jpg', 'Máy tính chơi game giá rẻ cho học sinh.'),
(14, 1, 'PC Trạm Làm Việc Cao Cấp', '300000000', 5, 'null', 'null', 'null', 'Apple', 'null', 'null', '1736490704_case-pc-be-ca-mixie-nemo-28w-264.jpg', 'Máy tính trạm cho công việc thiết kế đồ họa.'),
(15, 1, 'PC Văn Phòng Tiết Kiệm', '10000000', 70, 'null', 'null', 'null', 'HP', 'null', 'null', '1736490723_case-pc-be-ca-mixie-nemo-28b-mau-den-mat-kinh-trong-suot-size-340-x-270-x-350-mm-.jpg', 'Máy tính văn phòng với giá hợp lý.'),
(16, 2, 'PC Gaming VR Ready', '120000000', 12, 'null', 'null', 'null', 'Alienware', 'null', 'null', '1736490753_images (3).jpg', 'Máy tính chơi game VR với hiệu suất cao.'),
(17, 2, 'PC Workstation Đồ Họa', '250000000', 6, 'null', 'null', 'null', 'Dell', 'null', 'null', '1736490770_71xviGM3-qL.jpg', 'Máy tính workstation cho thiết kế đồ họa chuyên nghiệp.'),
(18, 2, 'PC Gaming Entry-Level', '9000000', 50, 'null', 'null', 'null', 'Gigabyte', 'null', 'null', '1736490791_images (4).jpg', 'Máy tính chơi game dành cho người mới bắt đầu.'),
(19, 2, 'PC Chiến Thắng', '50000000', 30, 'null', 'null', 'null', 'Cooler Master', 'null', 'null', '1736490808_images (5).jpg', 'Máy tính chơi game với thiết kế độc đáo và hiệu suất cao.'),
(20, 2, 'PC Văn Phòng Năng Động', '15000000', 45, 'null', 'null', 'null', 'Asrock', 'null', 'null', '1736490824_images (6).jpg', 'Máy tính văn phòng với hiệu suất tốt và giá cả hợp lý.');

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
(4, 1, 4, 'admin@gmail.com', '$2y$10$6PlUhQ42AQ733GEXeZ4/qO0HAxf4UXdHmoD1k6/S4jQkEqnL4vjwC');

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
-- Chỉ mục cho bảng `chi_tiet_hoa__on`
--
ALTER TABLE `chi_tiet_hoa__on`
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
-- AUTO_INCREMENT cho bảng `chi_tiet_hoa__on`
--
ALTER TABLE `chi_tiet_hoa__on`
  MODIFY `MA_CTHD` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `hoadon`
--
ALTER TABLE `hoadon`
  MODIFY `MAHD` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `khachhang`
--
ALTER TABLE `khachhang`
  MODIFY `MA_KH` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `phan_quyen`
--
ALTER TABLE `phan_quyen`
  MODIFY `MA_PHAN_QUYEN` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `sanpham`
--
ALTER TABLE `sanpham`
  MODIFY `MASP` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT cho bảng `tai_khoan`
--
ALTER TABLE `tai_khoan`
  MODIFY `MA_TK` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `theloai`
--
ALTER TABLE `theloai`
  MODIFY `MATL` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `chi_tiet_hoa__on`
--
ALTER TABLE `chi_tiet_hoa__on`
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
