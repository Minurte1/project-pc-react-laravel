-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 13, 2024 lúc 04:21 PM
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
(1, 1, 1, 1, '0%', 'Mua 1 bản game The Legend of Zelda: Tears of the Kingdom.'),
(2, 2, 1, 1, '10%', 'Mua 1 bản game Elden Ring với giảm giá 10%.'),
(3, 3, 2, 2, '0%', 'Mua 2 bản God of War Ragnarök.'),
(4, 4, 3, 1, '5%', 'Mua 1 bản Horizon Forbidden West với giảm giá 5%.'),
(5, 5, 1, 1, '0%', 'Mua 1 bản Spider-Man: Miles Morales.'),
(6, 6, 2, 1, '0%', 'Mua 1 bản Dying Light 2.'),
(7, 7, 3, 1, '0%', 'Mua 1 bản Call of Duty: Modern Warfare II.'),
(8, 8, 1, 1, '0%', 'Mua 1 bản Resident Evil Village.');

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
(1, 2, 1),
(2, 3, 2),
(3, 4, 1);

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
(1, 1, 'Hà Nội', '0123456789', 'Hóa đơn đầu tiên cho khách hàng.'),
(2, 2, 'Đà Nẵng', '0987654321', 'Khách hàng thân thiết đặt hàng.'),
(3, 3, 'TP.HCM', '0912345678', 'Đơn hàng cho game hành động.');

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
(1, '0123456789', 'Nguyễn Văn A', 'Hà Nội', 'Khách hàng thường xuyên'),
(2, '0987654321', 'Trần Thị B', 'Đà Nẵng', 'Khách hàng thân thiết'),
(3, '0912345678', 'Lê Văn C', 'TP.HCM', 'Yêu thích game hành động');

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
(1, 'Quản trị viên', 'Quyền truy cập đầy đủ.'),
(2, 'Người dùng', 'Quyền truy cập hạn chế.');

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
(1, 1, 'The Legend of Zelda: Tears of the Kingdom', '59.99', 100, 'N/A', 'N/A', 'N/A', 'Nintendo', '8GB', 'N/A', 'link_to_image_zelda.jpg', 'Game phiêu lưu hành động tuyệt vời.'),
(2, 1, 'Elden Ring', '59.99', 50, 'N/A', 'N/A', 'N/A', 'FromSoftware', '16GB', 'N/A', 'link_to_image_elden_ring.jpg', 'Trò chơi hành động nhập vai thế giới mở.'),
(3, 2, 'God of War Ragnarök', '69.99', 30, 'N/A', 'N/A', 'N/A', 'Santa Monica Studio', '16GB', 'N/A', 'link_to_image_god_of_war.jpg', 'Hành trình của Kratos và Atreus.'),
(4, 2, 'Horizon Forbidden West', '59.99', 75, 'N/A', 'N/A', 'N/A', 'Guerrilla Games', '16GB', 'N/A', 'link_to_image_horizon.jpg', 'Khám phá thế giới mới và chiến đấu với máy móc.'),
(5, 3, 'Spider-Man: Miles Morales', '49.99', 90, 'N/A', 'N/A', 'N/A', 'Insomniac Games', '16GB', 'N/A', 'link_to_image_spiderman.jpg', 'Trở thành Spider-Man mới.'),
(6, 3, 'Dying Light 2', '49.99', 60, 'N/A', 'N/A', 'N/A', 'Techland', '16GB', 'N/A', 'link_to_image_dying_light.jpg', 'Trò chơi sinh tồn trong thế giới mở.'),
(7, 3, 'Call of Duty: Modern Warfare II', '69.99', 40, 'N/A', 'N/A', 'N/A', 'Infinity Ward', '16GB', 'N/A', 'link_to_image_call_of_duty.jpg', 'Trò chơi bắn súng góc nhìn thứ nhất.'),
(8, 3, 'Resident Evil Village', '59.99', 55, 'N/A', 'N/A', 'N/A', 'Capcom', '16GB', 'N/A', 'link_to_image_resident_evil.jpg', 'Kinh dị sinh tồn trong thế giới ma quái.');

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
(3, 2, 3, 'levanc', 'password789');

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
(1, 'Game Hành Động', 'Các trò chơi tập trung vào hành động, chiến đấu.', 'Thể loại này bao gồm nhiều trò chơi nổi tiếng.'),
(2, 'Game Nhập Vai', 'Trò chơi cho phép người chơi nhập vai vào nhân vật.', 'Chủ yếu xoay quanh việc xây dựng nhân vật và khám phá.'),
(3, 'Game Phiêu Lưu', 'Trò chơi tập trung vào khám phá và phiêu lưu.', 'Người chơi khám phá thế giới và giải quyết câu đố.');

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
  MODIFY `MA_CTHD` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `hoadon`
--
ALTER TABLE `hoadon`
  MODIFY `MAHD` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `khachhang`
--
ALTER TABLE `khachhang`
  MODIFY `MA_KH` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `phan_quyen`
--
ALTER TABLE `phan_quyen`
  MODIFY `MA_PHAN_QUYEN` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `sanpham`
--
ALTER TABLE `sanpham`
  MODIFY `MASP` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `tai_khoan`
--
ALTER TABLE `tai_khoan`
  MODIFY `MA_TK` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `theloai`
--
ALTER TABLE `theloai`
  MODIFY `MATL` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
