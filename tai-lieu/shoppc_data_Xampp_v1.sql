-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 03, 2023 at 03:38 PM
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

-- --------------------------------------------------------

--
-- Table structure for table `hoadon`
--

CREATE TABLE `hoadon` (
  `MaHD` int(11) NOT NULL,
  `MaKH` varchar(255) DEFAULT NULL,
  `MaNV` varchar(255) DEFAULT NULL,
  `DiaChiShip` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(22, 'PC Republic Of Gamer ROG - EVANLEGION', 1, 148889000, 10, 'INTEL Core I9 13900KS', 'Mainboard Z790  HERO MAXIMUS EVANLEGION  DDR5', 'ROG Strix GeForce RTX™ 4090 24GB GDDR6X OC EVA-02 Edition', 'Shop PC', 'RAM DOMINATOR PLATIUM  64GB (16x4) DDR5 Bus 6200Mhz', 'profile_pic-1701606616285.png'),
(23, 'PC MAX PERFORMANCE RTX 3060TI 12400F', 1, 20690000, 10, 'Intel Core I5 12400F', 'Mainboard MSI B660M-E DDR4', 'MSI VENTUS RTX 3060TI 8GB NEW', 'Shop PC', 'TeamGroup VulcanZ 16Gb Bus 3200Mhz', 'profile_pic-1701606624469.png'),
(24, 'Laptop Asus VivoBook Go 14 E1404FA-NK177W', 2, 12990000, 10, 'AMD Ryzen 5 7520U (4MB cache, up to 4.3 GHz, 4 lõi/8 luồng)', 'Mainboard', 'AMD Radeon Graphics', 'ASUS', '16GB', 'profile_pic-1701606632644.png'),
(25, 'Apple MacBook Air M1 256GB 2020', 2, 18990000, 10, 'M1', 'Mainboard', 'GPU 8 nhân', 'Apple', '8GB', 'profile_pic-1701606642330.png'),
(26, 'Laptop Lenovo Ideapad Slim 5 14IAH8 83BF002NVN', 2, 14990000, 10, 'Intel Core i5-12450H', 'Mainboard', 'Intel UHD Graphics', 'Lenovo', '16GB', 'profile_pic-1701606651740.png'),
(27, 'Laptop Dell Inspirion 15 3511 PDP3H', 2, 13490000, 10, 'Intel Core i5-1135G7', 'Mainboard', 'Intel Iris Xe Graphics', 'Lenovo', '8GB', 'profile_pic-1701606662835.png'),
(28, 'Laptop Gaming Acer Nitro 5 Eagle AN515-57-5669', 2, 16990000, 10, 'Intel Core i5-11400H', 'Mainboard', 'NVIDIA GeForce GTX 1650 4 GB GDDR6', 'Lenovo', '8GB', 'profile_pic-1701606721645.jpg');

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
  MODIFY `MaHD` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sanpham`
--
ALTER TABLE `sanpham`
  MODIFY `MaSP` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `theloai`
--
ALTER TABLE `theloai`
  MODIFY `MaTL` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
