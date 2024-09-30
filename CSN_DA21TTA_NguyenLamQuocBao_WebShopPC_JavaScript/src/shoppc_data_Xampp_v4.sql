-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 11, 2023 at 01:43 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shoppc_data`
--

-- --------------------------------------------------------

--
-- Table structure for table `chitiethoadon`
--

CREATE TABLE `chitiethoadon` (
  `MaHD` int(11) NOT NULL,
  `MaSP` int(11) NOT NULL,
  `SoLuong` smallint(6) DEFAULT NULL,
  `GiamGia` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chitiethoadon`
--

INSERT INTO `chitiethoadon` (`MaHD`, `MaSP`, `SoLuong`, `GiamGia`) VALUES
(7, 25, 2, 1),
(8, 22, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `hoadon`
--

CREATE TABLE `hoadon` (
  `MaHD` int(11) NOT NULL,
  `MaKH` varchar(255) DEFAULT NULL,
  `MaNV` varchar(255) DEFAULT NULL,
  `DiaChiShip` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `SdtShip` varchar(10) DEFAULT NULL,
  `NgayDatHang` datetime DEFAULT NULL,
  `GhiChu` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hoadon`
--

INSERT INTO `hoadon` (`MaHD`, `MaKH`, `MaNV`, `DiaChiShip`, `SdtShip`, `NgayDatHang`, `GhiChu`) VALUES
(7, 'QuocBaoKH1', 'QuocBaoNV1', 'Trà vinh', NULL, '2023-12-10 00:00:00', 'Dễ vỡ'),
(8, 'QuocBaoKH1', 'QuocBaoNV1', 'Trà vinh', NULL, '2023-12-10 16:54:47', 'Không thể vỡ');

-- --------------------------------------------------------

--
-- Table structure for table `khachhang`
--

CREATE TABLE `khachhang` (
  `MaKH` varchar(255) NOT NULL,
  `PassKH` varchar(255) DEFAULT NULL,
  `TenLienHe` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DiaChi` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Sdt` varchar(24) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `khachhang`
--

INSERT INTO `khachhang` (`MaKH`, `PassKH`, `TenLienHe`, `DiaChi`, `Sdt`) VALUES
('QuocBaoKH1', '0000', 'Nguyễn Lâm Quốc Bảo', 'W8JX+46R, Đường D5, Phường 5, Trà Vinh, Việt Nam', '0372701722');

-- --------------------------------------------------------

--
-- Table structure for table `nhanvien`
--

CREATE TABLE `nhanvien` (
  `MaNV` varchar(255) NOT NULL,
  `PassNV` varchar(255) DEFAULT NULL,
  `HoLotNV` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `TenNV` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DiaChiNV` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `SdtNV` varchar(24) DEFAULT NULL,
  `AnhNV` text DEFAULT NULL,
  `GhiChu` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `nhanvien`
--

INSERT INTO `nhanvien` (`MaNV`, `PassNV`, `HoLotNV`, `TenNV`, `DiaChiNV`, `SdtNV`, `AnhNV`, `GhiChu`) VALUES
('QuocBaoNV1', '0000', 'Nguyễn Lâm Quốc', 'Bảo', 'W8JX+46R, Đường D5, Phường 5, Trà Vinh, Việt Nam', '0372701722', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sanpham`
--

CREATE TABLE `sanpham` (
  `MaSP` int(11) NOT NULL,
  `TenSP` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `MaTL` int(11) DEFAULT NULL,
  `DonGiaSP` float DEFAULT NULL,
  `TonKhoSP` int(6) DEFAULT NULL,
  `Chip` varchar(255) DEFAULT NULL,
  `Main` varchar(100) DEFAULT NULL,
  `VGA` varchar(255) DEFAULT NULL,
  `NhanSanXuat` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `RAM` varchar(100) DEFAULT NULL,
  `AnhSP` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sanpham`
--

INSERT INTO `sanpham` (`MaSP`, `TenSP`, `MaTL`, `DonGiaSP`, `TonKhoSP`, `Chip`, `Main`, `VGA`, `NhanSanXuat`, `RAM`, `AnhSP`) VALUES
(19, 'PC GAMER CHOICE', 1, 15890000, 10, 'Intel Core I5 12400F', 'MSI B660M-K DDR4', 'OCPC RTX 2060 Super 8GB New', 'Shop PC', 'TeamGroup VulcanZ 16Gb (2x8)/(1x16) Bus 3200mhz', 'profile_pic-1701606596194.png'),
(20, 'PC BEST FOR GAMING GTX 1660 Super I3 10105F', 1, 9990000, 10, 'Intel Core i3 10105F 3.7Ghz', 'GIGABYTE H410M DDR4 V2', 'VGA OCPC GTX 1660 Super 6GB New', 'Shop PC', 'RAM TEAMGROUP T-Force Vulcan Z 16GB (1x16GB)/(2x8Gb) DDR4 3200MHz', 'profile_pic-1701606602644.png'),
(21, 'PC SUPER STAR GAMING 2K RTX 3070TI ROG 13400F', 1, 26880000, 10, 'Intel Core I5 13400F', 'Mainboard Asrock B660M Pro RS DDR4', 'ASUS RTX 3070TI ROG 8GB NEW', 'Shop PC', 'ADATA D50 RGB 16GB (2x8) Bus 3200Mhz', 'profile_pic-1701606608922.png'),
(22, 'PC Republic Of Gamer ROG - EVANLEGION', 1, 148889000, 9, 'INTEL Core I9 13900KS', 'Mainboard Z790  HERO MAXIMUS EVANLEGION  DDR5', 'ROG Strix GeForce RTX™ 4090 24GB GDDR6X OC EVA-02 Edition', 'Shop PC', 'RAM DOMINATOR PLATIUM  64GB (16x4) DDR5 Bus 6200Mhz', 'profile_pic-1701606616285.png'),
(23, 'PC MAX PERFORMANCE RTX 3060TI 12400F', 1, 20690000, 10, 'Intel Core I5 12400F', 'Mainboard MSI B660M-E DDR4', 'MSI VENTUS RTX 3060TI 8GB NEW', 'Shop PC', 'TeamGroup VulcanZ 16Gb Bus 3200Mhz', 'profile_pic-1701606624469.png'),
(24, 'Laptop Asus VivoBook Go 14 E1404FA-NK177W', 2, 12990000, 10, 'AMD Ryzen 5 7520U (4MB cache, up to 4.3 GHz, 4 lõi/8 luồng)', 'Mainboard', 'AMD Radeon Graphics', 'ASUS', '16GB', 'profile_pic-1701606632644.png'),
(25, 'Apple MacBook Air M1 256GB 2020', 2, 18990000, 8, 'M1', 'Mainboard', 'GPU 8 nhân', 'Apple', '8GB', 'profile_pic-1701606642330.png'),
(26, 'Laptop Lenovo Ideapad Slim 5 14IAH8 83BF002NVN', 2, 14990000, 10, 'Intel Core i5-12450H', 'Mainboard', 'Intel UHD Graphics', 'Lenovo', '16GB', 'profile_pic-1701606651740.png'),
(27, 'Laptop Dell Inspirion 15 3511 PDP3H', 2, 13490000, 10, 'Intel Core i5-1135G7', 'Mainboard', 'Intel Iris Xe Graphics', 'Lenovo', '8GB', 'profile_pic-1701606662835.png'),
(28, 'Laptop Gaming Acer Nitro 5 Eagle AN515-57-5669', 2, 16990000, 10, 'Intel Core i5-11400H', 'Mainboard', 'NVIDIA GeForce GTX 1650 4 GB GDDR6', 'Lenovo', '8GB', 'profile_pic-1701606721645.jpg'),
(33, 'PC WALKING DEAD DUAL GLASS', 1, 44680000, 10, 'CPU Intel Core i7 13700K', 'Mainboard Z690M AORUS ELITE DDR4', 'MSI RTX 4070Ti 12GB Ventus 3Fan', 'Shop PC', 'RAM TridentZ RGB 32GB (2x16) Bus 3600Mhz', 'profile_pic-1701874608632.webp'),
(34, 'PC MULTI TASKING', 1, 25990000, 10, 'CPU Intel Core I7-13700 (2.10 GHz up to 5.20 GHz, 30M 16 nhân 24 luồng, Socket 1700)', 'Z690M AORUS ELITE', 'ZOTAC RTX 3060TI 8GB ', 'Shop PC', 'Team Vulcan 16Gb (2x8) Bus 3200Mhz', 'profile_pic-1701874727974.jpg'),
(35, 'PC TTG SUPER MAX GAMING', 1, 19990000, 10, 'Intel Core I5 12400F', 'Mainboard ASUS B660M-K DDR4', 'ASUS RTX 3070TI 8GB TUF GAMING', 'Shop PC', 'Ram ADATA D50 RGB 16GB (2x8GB) DDR4 3200MHz', 'profile_pic-1701874864913.webp'),
(36, 'PC BEST OF BEST', 1, 54168000, 10, 'Intel Core I7 13700K', 'Mainboard Z690M AORUS ELITE', 'ZOTAC RTX 4080 16Gb Infinity OC', 'Shop PC', 'ADATA D50  RGB16GB (2x8) Bus 3200Mhz', 'profile_pic-1701874988343.webp'),
(37, 'PC TTG CSGO Valorant PUBG FIFA LOL RX550', 1, 8490000, 10, 'CPU INTEL Core I3 10105F', 'Mainboard Gigabyte H410M H DDR4', 'Radeon RX 550 4GB', 'Shop PC', 'Teamgroup Vulcan 16GB Bus 3200Mhz', 'profile_pic-1701875197623.webp'),
(38, 'PC GALAX GAMING Type2', 1, 15990000, 10, 'Intel Core I5 12400F  (NK)', 'Mainboard ASUS B660M-K', 'ASUS DUAL RTX 3060 12GB', 'Shop PC', 'Team Vulcan 16Gb Bus 3200Mhz', 'profile_pic-1702104633471.webp'),
(39, 'PC TTG HERO GAMING', 1, 25990000, 10, 'Intel Core I5 12400F', 'ASROCK B660M PRO RS', 'MSI RTX 3080 GAMING Z TRIO 10Gb', 'Shop PC', 'Ram ADATA XPG SPECTRIX D50 16GB (2x8GB)', 'profile_pic-1702104758618.webp'),
(40, 'PC TTG CYPER', 1, 13990000, 10, 'CPU Intel Core I5 10400F 6 nhân 12 luồng', 'Mainboard GIGABYTE H410M H V2', 'NVIDIA RTX 2060 6GB', 'Shop PC', 'Ram ADATA D50 BLACK RGB 16GB (2x8GB) DDR4 3200Mhz ', 'profile_pic-1702104939491.png'),
(41, 'PC ZOTAC GAMING Type2 Super', 1, 9590000, 10, 'CPU Intel Core i3 10105F 3.7Ghz', 'Mainboard GIGABYTE H410M', 'MSI GTX 1660Super 6Gb', 'Shop PC', 'Team Vulcan 16Gb Bus 3200Mhz', 'profile_pic-1702105008164.webp'),
(42, 'PC Đồ Họa Hiệu Suất Cao', 1, 17990000, 10, 'CPU Intel Core I5-13500', 'ASUS B760M_K DDR4', 'OCPC RTX 2060 Super 8GB', 'Shop PC', 'RAM VulcanZ 16GB (2x8)/(1x6) Bus 3200Mhz', 'profile_pic-1702105130169.webp'),
(43, 'PC SUPER ULTIMATE 4K GAMING', 1, 25680000, 10, 'CPU Intel Core i5-12400F', 'Mainboard ASRock B760M PG Lightning/D4', 'OCPC GEFORCE RTX 3080 10GB BLACK', 'Shop PC', 'ADATA XPG D50 16GB (2x8) Bus 3200Mhz', 'profile_pic-1702105223443.webp'),
(44, 'PC MINI WHITE SPACE GAMING PRO', 1, 27888000, 10, 'CPU Intel Core I5 13400F', 'Mainboard Colorful CVN B760I FROZEN WIFI V20', 'VGA ASUS RTX 3060 12Gb Dual Mini 2Fan', 'Shop PC', 'ADATA D50 16GB (2x8) Bus 3200Mhz White DDR4', 'profile_pic-1702105295789.webp'),
(45, 'PC PRO GAMING', 1, 21680000, 10, 'Intel Core i5 12400F', 'Mainboard ASUS B760M-K DDR4', 'VGA ASUS ROG Strix GeForce RTX 3070 Ti OC 8GB GDDR6X', 'Shop PC', 'ADATA D50 16Gb (2x8) Bus 3200mhz', 'profile_pic-1702105387845.webp'),
(46, 'PC ADOBE - Worksation 3D Visualization', 1, 29990000, 10, 'Intel Core i7 13700K', 'AORUS Z690M ELITE DDR4', 'VGA ZOTAC GAMING GeForce RTX 4060 8GB Twin Edge OC', 'Shop PC', 'TeamGroup VulcanZ 32GB (2x16) Bus 3200Mhz', 'profile_pic-1702105482068.webp'),
(47, 'PC ADOBE - Workstation 2D 3D EDITING', 1, 25980000, 10, 'Intel Core i7 13700K', 'AORUS Z690M ELITE DDR4', 'VGA NVIDIA OCPC GTX 1660 Super 6GB GDDR6', 'Shop PC', 'TeamGroup VulcanZ 32GB (2x16) Bus 3200Mhz', 'profile_pic-1702105570898.webp');

-- --------------------------------------------------------

--
-- Table structure for table `theloai`
--

CREATE TABLE `theloai` (
  `MaTL` int(11) NOT NULL,
  `TenTL` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `MoTaTL` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `theloai`
--

INSERT INTO `theloai` (`MaTL`, `TenTL`, `MoTaTL`) VALUES
(1, 'PC', 'Một máy tính để bàn (PC) là một thiết bị máy tính độc lập, thường được đặt trên bàn làm việc. Nó bao gồm các thành phần như một bộ xử lý (CPU), bộ nhớ (RAM), ổ cứng lưu trữ, card đồ họa, bo mạch chủ, nguồn điện, và các thiết bị ngoại vi như bàn phím và chuột. PC thường chạy hệ điều hành như Windows, macOS hoặc Linux, và được sử dụng cho nhiều mục đích như công việc văn phòng, chơi game, xem phim, và làm đồ họa. Có nhiều dạng và cấu hình khác nhau của PC phù hợp với nhu cầu và ngân sách của người sử dụng.'),
(2, 'Laptop', 'Một laptop là một thiết bị máy tính di động nhẹ và tiện ích, thường có màn hình tích hợp, bàn phím, và touchpad hoặc chuột. Nó chứa các thành phần chính như bộ xử lý (CPU), bộ nhớ (RAM), ổ cứng lưu trữ, card đồ họa, và pin để cung cấp năng lượng di động. Laptop thường chạy các hệ điều hành như Windows, macOS hoặc Linux. Với thiết kế di động, laptop là lựa chọn phổ biến cho công việc di động, học tập, giải trí, và công việc văn phòng.');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chitiethoadon`
--
ALTER TABLE `chitiethoadon`
  ADD PRIMARY KEY (`MaHD`,`MaSP`);

--
-- Indexes for table `hoadon`
--
ALTER TABLE `hoadon`
  ADD PRIMARY KEY (`MaHD`);

--
-- Indexes for table `khachhang`
--
ALTER TABLE `khachhang`
  ADD PRIMARY KEY (`MaKH`);

--
-- Indexes for table `nhanvien`
--
ALTER TABLE `nhanvien`
  ADD PRIMARY KEY (`MaNV`);

--
-- Indexes for table `sanpham`
--
ALTER TABLE `sanpham`
  ADD PRIMARY KEY (`MaSP`);

--
-- Indexes for table `theloai`
--
ALTER TABLE `theloai`
  ADD PRIMARY KEY (`MaTL`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `hoadon`
--
ALTER TABLE `hoadon`
  MODIFY `MaHD` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `sanpham`
--
ALTER TABLE `sanpham`
  MODIFY `MaSP` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `theloai`
--
ALTER TABLE `theloai`
  MODIFY `MaTL` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
