-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th1 11, 2025 lúc 04:17 AM
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
(11, 1, 10, 1, '0', NULL),
(12, 23, 10, 1, '0', NULL),
(13, 35, 10, 1, '0', NULL),
(14, 50, 10, 1, '0', NULL),
(15, 66, 10, 1, '0', NULL),
(16, 5, 11, 1, '0', NULL),
(17, 33, 11, 1, '0', NULL),
(18, 34, 11, 1, '0', NULL),
(19, 46, 11, 1, '0', NULL),
(20, 47, 11, 1, '0', NULL),
(21, 61, 11, 1, '0', NULL),
(22, 77, 11, 1, '0', NULL),
(23, 83, 11, 1, '0', NULL),
(24, 91, 11, 1, '0', NULL),
(25, 3, 12, 1, '0', NULL),
(26, 27, 12, 1, '0', NULL),
(27, 28, 12, 1, '0', NULL),
(28, 42, 12, 1, '0', NULL),
(29, 53, 12, 1, '0', NULL),
(30, 68, 12, 1, '0', NULL),
(31, 73, 12, 1, '0', NULL),
(32, 41, 13, 1, '0', NULL),
(33, 56, 13, 1, '0', NULL),
(34, 66, 13, 1, '0', NULL),
(35, 90, 13, 1, '0', NULL),
(36, 49, 14, 1, '0', NULL),
(37, 74, 14, 1, '0', NULL),
(38, 86, 14, 1, '0', NULL),
(39, 24, 15, 1, '0', NULL),
(40, 59, 15, 1, '0', NULL),
(41, 67, 15, 1, '0', NULL),
(42, 74, 15, 1, '0', NULL),
(43, 23, 17, 1, '0', NULL),
(44, 39, 17, 1, '0', NULL),
(45, 51, 17, 1, '0', NULL),
(46, 86, 17, 1, '0', NULL);

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

--
-- Đang đổ dữ liệu cho bảng `hoadon`
--

INSERT INTO `hoadon` (`MAHD`, `MA_KH`, `DIA_CHI_SHIP`, `SDT_LIEN_HE_KH`, `GHI_CHU_HOA_DON`) VALUES
(10, 6, 'Trà vinh', '0372701722', 'Đang chờ thanh toán'),
(11, 6, 'Hà Nội', '0372701722', 'Đang chờ thanh toán'),
(12, 6, 'Hồ Chí Minh', '0372701722', 'Đang chờ thanh toán'),
(13, 11, 'Nha trang', '0321456879', 'Đang chờ thanh toán'),
(14, 11, 'Cà Mau', '0321456879', 'Đang chờ thanh toán'),
(15, 12, 'Nha trang', '0897456213', 'Đang chờ thanh toán'),
(17, 13, 'Trà Vinh', '0321456879', 'Đang chờ thanh toán');

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
(6, '0213654897', 'Nguyễn Lâm Quốc Bảo', 'Trà Vinh', 'Ngưng hoạt động'),
(11, NULL, 'Quốc Bảo Khác', 'Trà Vinh', NULL),
(12, NULL, 'Phúc', 'Trà Vinh', NULL),
(13, NULL, 'Thành', 'Trà Vinh', NULL);

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
(23, 1, 'PC Gaming Entry-Level', '10000000', 50, 'Intel Core i3', 'MSI B450', 'GTX 1050', 'HP', '8GB', '256GB SSD', '1736563530_profile_pic-1701606596194.png', 'PC chơi game giá rẻ, phù hợp cho người mới.'),
(24, 1, 'PC Gaming Mid-Range', '25000000', 30, 'Intel Core i5', 'ASUS TUF', 'RTX 3060', 'Asus', '16GB', '512GB SSD', '1736563556_profile_pic-1701606602644.png', 'PC chơi game tầm trung, hiệu suất ổn định.'),
(25, 1, 'PC Gaming High-End', '50000000', 20, 'Intel Core i7', 'Gigabyte Z690', 'RTX 3080', 'MSI', '32GB', '1TB SSD', '1736563563_profile_pic-1701606608922.png', 'PC chơi game cao cấp, đáp ứng mọi nhu cầu game.'),
(26, 2, 'PC Workstation Basic', '15000000', 25, 'AMD Ryzen 5', 'ASRock A320', 'Radeon RX 550', 'Dell', '16GB', '512GB SSD', '1736563696_profile_pic-1701874727974.jpg', 'PC làm việc cơ bản cho đồ họa và lập trình.'),
(27, 2, 'PC Workstation Pro', '60000000', 10, 'AMD Ryzen 9', 'ASUS ProArt', 'RTX 4070', 'Alienware', '32GB', '1TB SSD', '1736563704_profile_pic-1701606602644.png', 'PC workstation chuyên nghiệp cho công việc đồ họa nặng.'),
(28, 2, 'PC Gaming VR Ready', '75000000', 15, 'Intel Core i9', 'MSI MEG', 'RTX 4090', 'Razer', '64GB', '2TB SSD', '1736563910_profile_pic-1701606596194.png', 'PC chơi game VR với hiệu suất cực cao.'),
(29, 1, 'PC Mini Gaming', '12000000', 40, 'Intel Core i3', 'MSI H310', 'GTX 1650', 'Lenovo', '8GB', '256GB SSD', '1736563571_profile_pic-1701606616285.png', 'PC nhỏ gọn dành cho gaming di động.'),
(30, 2, 'PC Văn Phòng Nâng Cao', '20000000', 35, 'Intel Core i5', 'Gigabyte B460', 'Intel UHD 630', 'HP', '16GB', '512GB SSD', '1736563917_profile_pic-1701606602644.png', 'PC văn phòng mạnh mẽ cho công việc đa nhiệm.'),
(31, 1, 'PC Custom Build', '35000000', 20, 'Intel Core i7', 'MSI MPG', 'RTX 3070', 'Tự Lắp', '32GB', '1TB SSD', '1736563578_profile_pic-1701606624469.png', 'PC lắp ráp tùy chỉnh theo nhu cầu người dùng.'),
(32, 2, 'PC Đồ Họa Cao Cấp', '90000000', 8, 'AMD Ryzen Threadripper', 'ASUS ROG Zenith', 'RTX A6000', 'Corsair', '128GB', '2TB SSD', '1736563924_profile_pic-1701606608922.png', 'PC đồ họa cao cấp cho chuyên gia thiết kế.'),
(33, 1, 'PC Gaming Ultra', '150000000', 5, 'Intel Xeon W', 'ASUS WS C621', 'Quadro RTX 8000', 'Apple', '128GB', '4TB SSD', '1736563586_profile_pic-1701874343809.png', 'PC chơi game và đồ họa hàng đầu.'),
(34, 2, 'PC Workstation Elite', '300000000', 2, 'AMD EPYC 7742', 'Supermicro H11DSi', 'RTX A6000', 'Dell', '256GB', '8TB SSD', '1736563931_profile_pic-1701606616285.png', 'PC workstation mạnh nhất cho mọi nhu cầu.'),
(35, 1, 'PC Gaming Budget', '8000000', 60, 'Intel Pentium G6400', 'Gigabyte H410', 'GTX 1030', 'Acer', '8GB', '256GB SSD', '1736563594_profile_pic-1701874727974.jpg', 'PC gaming giá rẻ cho học sinh, sinh viên.'),
(36, 1, 'PC Gaming Compact', '18000000', 25, 'AMD Ryzen 5', 'MSI A520M', 'RX 5600XT', 'Acer', '16GB', '512GB SSD', '1736563603_profile_pic-1702104939491.png', 'PC nhỏ gọn nhưng mạnh mẽ dành cho game thủ.'),
(37, 1, 'PC Gaming Max', '120000000', 8, 'Intel Core i9-12900K', 'ASUS ROG Strix', 'RTX 4090', 'Alienware', '64GB', '2TB SSD + 2TB HDD', '1736563636_profile_pic-1701606596194.png', 'Cấu hình cao cho mọi tựa game và stream.'),
(38, 2, 'PC Workstation Creative', '45000000', 12, 'Intel Xeon E', 'ASRock Rack', 'Quadro T1000', 'Lenovo', '32GB', '1TB SSD', '1736563938_profile_pic-1701606624469.png', 'Workstation tối ưu cho thiết kế đồ họa và dựng phim.'),
(39, 2, 'PC Văn Phòng Tiết Kiệm', '12000000', 50, 'Intel Core i3', 'Gigabyte B365', 'Intel UHD 610', 'HP', '8GB', '256GB SSD', '1736563947_profile_pic-1701874343809.png', 'PC văn phòng giá rẻ, tiết kiệm chi phí.'),
(40, 1, 'PC Gaming Water-Cooled', '80000000', 10, 'Intel Core i7-12700F', 'MSI MPG Z690', 'RTX 3080 Ti', 'NZXT', '32GB', '1TB SSD', '1736563644_profile_pic-1701606602644.png', 'PC chơi game với hệ thống tản nhiệt nước hiệu suất cao.'),
(41, 1, 'PC Gaming Portable', '15000000', 30, 'AMD Ryzen 3', 'ASUS Prime', 'GTX 1650 Super', 'Lenovo', '8GB', '512GB SSD', '1736563651_profile_pic-1701606608922.png', 'PC gaming nhỏ gọn, dễ dàng di chuyển.'),
(42, 2, 'PC Workstation Video Editing', '70000000', 5, 'AMD Ryzen 9 5950X', 'Gigabyte TRX40', 'RTX 3070', 'HP', '64GB', '2TB SSD', '1736563954_profile_pic-1701874727974.jpg', 'PC workstation tối ưu cho dựng video chuyên nghiệp.'),
(43, 1, 'PC Gaming RGB', '28000000', 20, 'Intel Core i5-12600KF', 'MSI MPG Z690', 'RTX 3060 Ti', 'Asus', '16GB', '1TB SSD', '1736563659_profile_pic-1701606624469.png', 'PC gaming với đèn LED RGB bắt mắt.'),
(44, 2, 'PC Văn Phòng Cao Cấp', '30000000', 15, 'Intel Core i7', 'ASUS Pro', 'Intel Iris Xe', 'Dell', '32GB', '1TB SSD', '1736563960_profile_pic-1702104939491.png', 'PC văn phòng dành cho các nhà lãnh đạo.'),
(45, 1, 'PC Gaming Silent', '45000000', 10, 'AMD Ryzen 7 5800X', 'ASUS ROG Crosshair', 'RTX 3070', 'Corsair', '32GB', '1TB SSD', '1736563665_profile_pic-1702104939491.png', 'PC gaming tối ưu âm thanh, vận hành êm ái.'),
(46, 2, 'PC Workstation AI', '150000000', 3, 'AMD EPYC 7643', 'Supermicro H12', 'Quadro RTX 6000', 'Dell', '128GB', '4TB SSD', '1736563966_profile_pic-1701606596194.png', 'Workstation mạnh mẽ dành cho AI và học máy.'),
(47, 1, 'PC Gaming Extreme', '200000000', 2, 'Intel Xeon W-2295', 'ASUS WS C621E', 'RTX A5000', 'Apple', '256GB', '8TB SSD', '1736563674_profile_pic-1701606596194.png', 'PC chơi game và đồ họa mạnh nhất thị trường.'),
(48, 2, 'PC Workstation Data Analysis', '90000000', 6, 'Intel Xeon Gold', 'MSI PRO WS', 'Quadro P4000', 'HP', '128GB', '2TB SSD + 2TB HDD', '1736563973_profile_pic-1701606602644.png', 'PC dành riêng cho phân tích dữ liệu lớn.'),
(49, 1, 'PC Gaming Entry RGB', '15000000', 40, 'Intel Core i5', 'ASRock B450', 'GTX 1660', 'Acer', '16GB', '512GB SSD', '1736563682_profile_pic-1701606602644.png', 'PC gaming giá rẻ với hiệu ứng RGB đẹp mắt.'),
(50, 1, 'PC Gaming Beginner', '9500000', 45, 'Intel Core i3', 'ASUS H310', 'GTX 1050 Ti', 'Lenovo', '8GB', '256GB SSD', 'profile_pic-1701606596194.png', 'PC gaming khởi đầu, phù hợp với người mới.'),
(51, 2, 'PC Workstation Basic+', '16000000', 20, 'AMD Ryzen 5', 'MSI B450', 'RX 560', 'HP', '16GB', '512GB SSD', 'profile_pic-1701606602644.png', 'PC workstation nâng cấp từ bản cơ bản.'),
(52, 1, 'PC Gaming Advanced', '45000000', 12, 'Intel Core i7-12700F', 'Gigabyte Z690', 'RTX 3060 Ti', 'Acer', '32GB', '1TB SSD', 'profile_pic-1701606608922.png', 'PC gaming cao cấp, hiệu năng mạnh mẽ.'),
(53, 2, 'PC Workstation Premium', '70000000', 5, 'Intel Xeon E', 'Supermicro X11', 'Quadro T1000', 'Dell', '64GB', '2TB SSD', 'profile_pic-1701606616285.png', 'PC workstation dành cho dân chuyên nghiệp.'),
(54, 1, 'PC Gaming Compact RGB', '25000000', 15, 'AMD Ryzen 5', 'ASRock B550', 'RX 6600', 'Alienware', '16GB', '512GB SSD', 'profile_pic-1701606624469.png', 'PC gaming nhỏ gọn với hiệu ứng RGB đẹp mắt.'),
(55, 2, 'PC Workstation Ultimate', '120000000', 3, 'AMD Ryzen Threadripper 3960X', 'MSI TRX40', 'RTX 4070 Ti', 'Corsair', '128GB', '4TB SSD', 'profile_pic-1701874343809.png', 'PC workstation mạnh mẽ nhất cho thiết kế và AI.'),
(56, 1, 'PC Gaming Entry+', '12000000', 30, 'Intel Core i5', 'Gigabyte B460', 'GTX 1660 Super', 'HP', '16GB', '512GB SSD', 'profile_pic-1701874727974.jpg', 'PC gaming khởi đầu với cấu hình mạnh hơn.'),
(57, 2, 'PC Workstation Data Pro', '95000000', 4, 'Intel Xeon Gold', 'ASUS Pro WS', 'Quadro RTX 5000', 'Lenovo', '128GB', '2TB SSD', 'profile_pic-1702104939491.png', 'PC workstation tối ưu cho phân tích dữ liệu chuyên sâu.'),
(58, 1, 'PC Gaming Starter Kit', '11000000', 35, 'Intel Core i3-12100F', 'MSI B560M', 'GTX 1650', 'Acer', '8GB', '512GB SSD', 'profile_pic-1701606596194.png', 'Bộ PC gaming dành cho người mới bắt đầu.'),
(59, 2, 'PC Workstation Advanced', '18000000', 18, 'AMD Ryzen 7', 'ASUS Prime B550', 'RX 570', 'Lenovo', '16GB', '1TB SSD', 'profile_pic-1701606602644.png', 'PC workstation tối ưu hóa hiệu năng công việc.'),
(60, 1, 'PC Gaming Beast', '80000000', 7, 'Intel Core i9-13900K', 'Gigabyte Z790 Aorus', 'RTX 4080', 'MSI', '64GB', '2TB SSD', 'profile_pic-1701606608922.png', 'PC gaming siêu khủng dành cho game thủ hardcore.'),
(61, 2, 'PC Workstation AI Model', '150000000', 2, 'AMD Ryzen Threadripper Pro 3975WX', 'Supermicro H12SSL', 'Quadro RTX 8000', 'Dell', '256GB', '8TB SSD', 'profile_pic-1701606616285.png', 'PC dành riêng cho mô hình AI và học sâu.'),
(62, 1, 'PC Gaming Compact Light', '20000000', 25, 'Intel Core i5-12400', 'ASUS TUF B660M', 'RTX 3050', 'Alienware', '16GB', '512GB SSD', 'profile_pic-1701606624469.png', 'PC gaming gọn nhẹ, thích hợp cho mọi không gian.'),
(63, 2, 'PC Workstation Visualization', '95000000', 4, 'Intel Xeon W-1290P', 'MSI CREATOR TRX40', 'Quadro RTX 6000', 'Corsair', '128GB', '4TB SSD', 'profile_pic-1701874343809.png', 'Tối ưu hóa cho công việc render và visualization.'),
(64, 1, 'PC Gaming Performance+', '30000000', 10, 'AMD Ryzen 7 5800X', 'ASUS ROG Strix B550', 'RTX 3060 Ti', 'Asus', '32GB', '1TB SSD', 'profile_pic-1701874727974.jpg', 'PC gaming với hiệu năng mạnh và ổn định.'),
(65, 2, 'PC Workstation Developer', '45000000', 8, 'Intel Core i7-12700', 'MSI MAG B660M', 'RX 6500 XT', 'HP', '32GB', '2TB SSD', 'profile_pic-1702104939491.png', 'PC tối ưu cho lập trình viên và xử lý dữ liệu.'),
(66, 1, 'PC Gaming Beginner', '9500000', 45, 'Intel Core i3-10100F', 'Gigabyte H410M', 'GTX 1030', 'HP', '8GB', '256GB SSD', 'profile_pic-1701606596194.png', 'PC gaming giá rẻ cho người mới làm quen.'),
(67, 2, 'PC Workstation Entry', '20000000', 20, 'AMD Ryzen 5 3600', 'MSI B450M', 'RX 550', 'Dell', '16GB', '512GB SSD', 'profile_pic-1701606602644.png', 'Workstation cơ bản dành cho thiết kế và lập trình.'),
(68, 1, 'PC Gaming Hardcore', '65000000', 8, 'Intel Core i7-12700K', 'ASUS ROG Z690', 'RTX 3080 Ti', 'MSI', '32GB', '1TB SSD', 'profile_pic-1701606608922.png', 'PC gaming hiệu suất cao dành cho game thủ chuyên nghiệp.'),
(69, 2, 'PC Workstation Multimedia', '85000000', 5, 'Intel Xeon W-1290', 'ASUS ProArt', 'Quadro RTX 4000', 'Lenovo', '64GB', '2TB SSD', 'profile_pic-1701606616285.png', 'Workstation mạnh mẽ dành cho sản xuất đa phương tiện.'),
(70, 1, 'PC Gaming All-Around', '22000000', 30, 'AMD Ryzen 5 5600', 'Gigabyte B550M', 'RTX 3050', 'Alienware', '16GB', '512GB SSD', 'profile_pic-1701606624469.png', 'PC gaming hiệu năng tốt, phù hợp cho cả làm việc và chơi game.'),
(71, 2, 'PC Workstation ProRender', '120000000', 3, 'AMD Ryzen Threadripper 3990X', 'MSI Creator', 'RTX A5000', 'Corsair', '128GB', '4TB SSD', 'profile_pic-1701874343809.png', 'Dành riêng cho render đồ họa cao cấp.'),
(72, 1, 'PC Gaming Compact Pro', '27000000', 12, 'Intel Core i5-12600K', 'ASUS TUF B660M', 'RTX 3060', 'Acer', '16GB', '1TB SSD', 'profile_pic-1701874727974.jpg', 'PC gaming nhỏ gọn nhưng mạnh mẽ.'),
(73, 2, 'PC Workstation Data Science', '70000000', 6, 'AMD Ryzen 9 5950X', 'Gigabyte TRX40 Aorus', 'RTX 3070', 'HP', '64GB', '2TB SSD', 'profile_pic-1702104939491.png', 'PC tối ưu cho phân tích dữ liệu và mô hình hóa.'),
(74, 1, 'PC Gaming Mid-Tier', '15000000', 25, 'Intel Core i5-11400', 'MSI H510M', 'GTX 1650', 'Lenovo', '16GB', '512GB SSD', 'profile_pic-1701606596194.png', 'Cấu hình trung cấp, phù hợp cho gaming nhẹ.'),
(75, 2, 'PC Workstation Film Editing', '100000000', 4, 'Intel Core i9-12900', 'ASUS ProArt B660M', 'RTX 3090', 'Asus', '128GB', '4TB SSD', 'profile_pic-1701606602644.png', 'Workstation tối ưu hóa cho biên tập video và phim.'),
(76, 1, 'PC Gaming Overclock', '55000000', 10, 'Intel Core i9-11900K', 'ASUS ROG Strix Z590', 'RTX 3070 Ti', 'MSI', '32GB', '1TB SSD', 'profile_pic-1701606608922.png', 'Hỗ trợ ép xung, hiệu năng vượt trội.'),
(77, 2, 'PC Workstation Science', '130000000', 3, 'AMD EPYC 7643', 'Supermicro H11SSL', 'Quadro RTX 8000', 'Dell', '256GB', '8TB SSD', 'profile_pic-1701606616285.png', 'Workstation dành riêng cho nghiên cứu khoa học.'),
(78, 1, 'PC Gaming Enthusiast', '48000000', 12, 'Intel Core i7-13700K', 'MSI Z790 Tomahawk', 'RTX 4070 Ti', 'Alienware', '32GB', '1TB SSD', 'profile_pic-1701606596194.png', 'PC gaming cho người đam mê công nghệ, hiệu suất mạnh mẽ.'),
(79, 2, 'PC Workstation AI Development', '110000000', 5, 'AMD EPYC 7543', 'ASUS Pro WS WRX80E', 'Quadro RTX 6000', 'Dell', '128GB', '4TB SSD', 'profile_pic-1701606602644.png', 'Workstation chuyên dụng cho phát triển AI và machine learning.'),
(80, 1, 'PC Gaming Balanced Build', '21000000', 18, 'AMD Ryzen 5 7600', 'Gigabyte B650 Aorus', 'RTX 3060 Ti', 'Asus', '16GB', '1TB SSD', 'profile_pic-1701606608922.png', 'Cấu hình cân bằng giữa giá cả và hiệu năng.'),
(81, 2, 'PC Workstation Creative Studio', '95000000', 7, 'Intel Xeon W-3265', 'ASUS ProArt C422', 'RTX A4000', 'HP', '64GB', '2TB SSD', 'profile_pic-1701606616285.png', 'Thiết kế dành riêng cho studio sáng tạo nội dung.'),
(82, 1, 'PC Gaming Portable', '12500000', 30, 'Intel Core i5-10400', 'MSI H410I', 'GTX 1650', 'MSI', '8GB', '512GB SSD', 'profile_pic-1701606624469.png', 'PC gaming nhỏ gọn dễ dàng mang theo.'),
(83, 2, 'PC Workstation Editing Suite', '125000000', 3, 'AMD Ryzen Threadripper PRO 3975WX', 'ASUS Pro WS WRX80E', 'Quadro RTX 5000', 'Corsair', '128GB', '6TB SSD', 'profile_pic-1701874343809.png', 'Workstation tối ưu hóa cho biên tập video chuyên nghiệp.'),
(84, 1, 'PC Gaming High FPS', '36000000', 10, 'Intel Core i7-12700KF', 'ASUS ROG Strix Z690', 'RTX 3070 Ti', 'Lenovo', '32GB', '1TB SSD', 'profile_pic-1701874727974.jpg', 'Tối ưu hóa để đạt FPS cao trong mọi tựa game.'),
(85, 2, 'PC Workstation Data Analysis', '78000000', 8, 'AMD Ryzen 9 7900X', 'Gigabyte X670 Aorus', 'RTX 3080', 'HP', '64GB', '2TB SSD', 'profile_pic-1702104939491.png', 'Workstation mạnh mẽ dành cho phân tích dữ liệu chuyên sâu.'),
(86, 1, 'PC Gaming Ultra Compact', '15000000', 40, 'Intel Core i5-10400F', 'ASUS H510I', 'GTX 1660 Super', 'Acer', '8GB', '512GB SSD', 'profile_pic-1701606596194.png', 'Cấu hình nhỏ gọn phù hợp không gian hẹp.'),
(87, 2, 'PC Workstation Virtual Reality', '105000000', 6, 'Intel Xeon W-3345', 'MSI Creator TRX40', 'RTX A4500', 'Dell', '128GB', '3TB SSD', 'profile_pic-1701606602644.png', 'Workstation tối ưu hóa cho ứng dụng thực tế ảo (VR).'),
(88, 1, 'PC Gaming Next Gen', '45000000', 15, 'AMD Ryzen 9 7950X', 'Gigabyte X670 Aorus Master', 'RTX 4080', 'Razer', '32GB', '2TB SSD', 'profile_pic-1701606608922.png', 'Cấu hình gaming cao cấp thế hệ tiếp theo.'),
(89, 2, 'PC Workstation Advanced', '95000000', 4, 'Intel Xeon Gold 6330', 'Supermicro X12', 'Quadro RTX 8000', 'Lenovo', '256GB', '6TB SSD', 'profile_pic-1701606616285.png', 'Phù hợp cho công việc tính toán phức tạp và xử lý đồ họa.'),
(90, 1, 'PC Gaming 144Hz Ready', '18000000', 20, 'AMD Ryzen 5 5600G', 'MSI B450M Mortar', 'RTX 2060', 'MSI', '16GB', '512GB SSD', 'profile_pic-1701606624469.png', 'Hoàn hảo cho gaming với màn hình 144Hz.'),
(91, 2, 'PC Workstation AI Research', '140000000', 2, 'AMD EPYC 7713', 'ASUS Pro WS WRX80E', 'Quadro RTX A5000', 'Corsair', '256GB', '8TB SSD', 'profile_pic-1701874343809.png', 'Chuyên dụng cho nghiên cứu AI và học máy.');

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
(6, 1, 6, 'baoquoczero@gmail.com', '$2y$10$/OLWw6t01DtjLYd7oEDua.koHggPvH3lcp86BgPpqn6.h8AVKoP6y'),
(11, 2, 11, 'baoquocone@gmail.com', '$2y$10$kidLAYRnOUpyk2ZT8ioTc.eQ5L2IIvkD/0jdOEpDWhYAR/RdmMLDK'),
(12, 2, 12, 'hohoangphucjob@gmail.com', '$2y$10$ORufSk5TLo84JDLHweyQJONR5D8oXZ5T2B6sRPDDmJvu7iuhjH5su'),
(13, 2, 13, 'tinthanhtv2014@gmail.com', '$2y$10$bJ3VQ/hQSQph2vty.9cnRuYCx1.HuI3ZfCUiYPmoRua7vSyXo70K6');

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
  MODIFY `MA_CTHD` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT cho bảng `hoadon`
--
ALTER TABLE `hoadon`
  MODIFY `MAHD` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT cho bảng `khachhang`
--
ALTER TABLE `khachhang`
  MODIFY `MA_KH` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT cho bảng `phan_quyen`
--
ALTER TABLE `phan_quyen`
  MODIFY `MA_PHAN_QUYEN` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `sanpham`
--
ALTER TABLE `sanpham`
  MODIFY `MASP` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;

--
-- AUTO_INCREMENT cho bảng `tai_khoan`
--
ALTER TABLE `tai_khoan`
  MODIFY `MA_TK` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

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
