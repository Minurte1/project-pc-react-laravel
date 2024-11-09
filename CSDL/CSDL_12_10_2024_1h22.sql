-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 11, 2024 lúc 08:22 PM
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

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `gio_hang`
--

CREATE TABLE `gio_hang` (
  `MA_KH` int(11) NOT NULL,
  `MASP` int(11) NOT NULL,
  `SO_LUONG_SP` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `phan_quyen`
--

CREATE TABLE `phan_quyen` (
  `MA_PHAN_QUYEN` int(11) NOT NULL,
  `TEN_PHAN_QUYEN` varchar(255) DEFAULT NULL,
  `GHI_CHU_PHAN_QUYEN` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  MODIFY `MA_CTHD` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `hoadon`
--
ALTER TABLE `hoadon`
  MODIFY `MAHD` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `khachhang`
--
ALTER TABLE `khachhang`
  MODIFY `MA_KH` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `phan_quyen`
--
ALTER TABLE `phan_quyen`
  MODIFY `MA_PHAN_QUYEN` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `sanpham`
--
ALTER TABLE `sanpham`
  MODIFY `MASP` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `tai_khoan`
--
ALTER TABLE `tai_khoan`
  MODIFY `MA_TK` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `theloai`
--
ALTER TABLE `theloai`
  MODIFY `MATL` int(11) NOT NULL AUTO_INCREMENT;

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
