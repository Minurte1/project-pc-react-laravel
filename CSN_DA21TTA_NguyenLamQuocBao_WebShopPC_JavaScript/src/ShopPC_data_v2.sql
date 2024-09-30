CREATE DATABASE ShopPC_data
GO
USE ShopPC_data;
GO
CREATE TABLE TheLoai (
    MaTL INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    TenTL VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    MoTaTL TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
)
GO

CREATE TABLE SanPham(
	MaSP INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	TenSP VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
	MaTL INT,
	DonGiaSP FLOAT,
	TonKhoSP SMALLINT,
	Chip VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
	Main VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
	VGA VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
	NhanSanXuat VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
	RAM VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
	AnhSP TEXT
)
GO

CREATE TABLE NhanVien(
	MaNV VARCHAR(255) NOT NULL PRIMARY KEY,
	PassNV VARCHAR(255),
	HoLotNV VARCHAR(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
	TenNV VARCHAR(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
	DiaChiNV VARCHAR(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
	SdtNV VARCHAR(24),
	AnhNV TEXT,
	GhiChu TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
)
GO

CREATE TABLE KhachHang(
	MaKH VARCHAR(255) NOT NULL PRIMARY KEY,
	PassKH VARCHAR(255),
	TenLienHe VARCHAR(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
	DiaChi VARCHAR(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
	Sdt VARCHAR(24)
)
GO

CREATE TABLE HoaDon(
	MaHD INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	MaKH VARCHAR(255),
	MaNV VARCHAR(255),
	DiaChiShip VARCHAR(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
)
GO

CREATE TABLE ChiTietHoaDon(
	MaHD INT,
	MaSP INT,
	SoLuong SMALLINT,
	GiamGia FLOAT,
	PRIMARY KEY (MaHD, MaSP)
)

INSERT INTO `TheLoai` (`TenTL`, `MoTaTL`) VALUES 
('PC', 'Một máy tính để bàn (PC) là một thiết bị máy tính độc lập, thường được đặt trên bàn làm việc. Nó bao gồm các thành phần như một bộ xử lý (CPU), bộ nhớ (RAM), ổ cứng lưu trữ, card đồ họa, bo mạch chủ, nguồn điện, và các thiết bị ngoại vi như bàn phím và chuột. PC thường chạy hệ điều hành như Windows, macOS hoặc Linux, và được sử dụng cho nhiều mục đích như công việc văn phòng, chơi game, xem phim, và làm đồ họa. Có nhiều dạng và cấu hình khác nhau của PC phù hợp với nhu cầu và ngân sách của người sử dụng.'),
('Laptop', 'Một laptop là một thiết bị máy tính di động nhẹ và tiện ích, thường có màn hình tích hợp, bàn phím, và touchpad hoặc chuột. Nó chứa các thành phần chính như bộ xử lý (CPU), bộ nhớ (RAM), ổ cứng lưu trữ, card đồ họa, và pin để cung cấp năng lượng di động. Laptop thường chạy các hệ điều hành như Windows, macOS hoặc Linux. Với thiết kế di động, laptop là lựa chọn phổ biến cho công việc di động, học tập, giải trí, và công việc văn phòng.');

INSERT INTO `SanPham`(`TenSP`, `MaTL`, `DonGiaSP`, `TonKhoSP`, `Chip`, `Main`, `VGA`, `NhanSanXuat`, `RAM`, `AnhSP`) 
VALUES 
('PC GAMER CHOICE', '1', '15890000', '10', 'Intel Core I5 12400F', 'MSI B660M-K DDR4', 'OCPC RTX 2060 Super 8GB New', 'Shop PC', 'TeamGroup VulcanZ 16Gb (2x8)/(1x16) Bus 3200mhz', '1.png'),
('PC BEST FOR GAMING GTX 1660 Super I3 10105F', '1', '9990000', '10', 'Intel Core i3 10105F 3.7Ghz', 'GIGABYTE H410M DDR4 V2', 'VGA OCPC GTX 1660 Super 6GB New', 'Shop PC', 'RAM TEAMGROUP T-Force Vulcan Z 16GB (1x16GB)/(2x8Gb) DDR4 3200MHz', '2.png'),
('PC SUPER STAR GAMING 2K RTX 3070TI ROG 13400F', '1', '26880000', '10', 'Intel Core I5 13400F', 'Mainboard Asrock B660M Pro RS DDR4', 'ASUS RTX 3070TI ROG 8GB NEW', 'Shop PC', 'ADATA D50 RGB 16GB (2x8) Bus 3200Mhz', '3.png'),
('PC Republic Of Gamer ROG - EVANLEGION', '1', '148888888', '10', 'INTEL Core I9 13900KS', 'Mainboard Z790  HERO MAXIMUS EVANLEGION  DDR5', 'ROG Strix GeForce RTX™ 4090 24GB GDDR6X OC EVA-02 Edition', 'Shop PC', 'RAM DOMINATOR PLATIUM  64GB (16x4) DDR5 Bus 6200Mhz', '4.png'),
('PC MAX PERFORMANCE RTX 3060TI 12400F', '1', '20690000', '10', 'Intel Core I5 12400F', 'Mainboard MSI B660M-E DDR4', 'MSI VENTUS RTX 3060TI 8GB NEW', 'Shop PC', 'TeamGroup VulcanZ 16Gb Bus 3200Mhz', '5.png'),
('Laptop Asus VivoBook Go 14 E1404FA-NK177W', '2', '12990000', '10', 'AMD Ryzen 5 7520U (4MB cache, up to 4.3 GHz, 4 lõi/8 luồng)', 'Mainboard', 'AMD Radeon Graphics', 'ASUS', '16GB', '6.png'),
('Apple MacBook Air M1 256GB 2020', '2', '18990000', '10', 'M1', 'Mainboard', 'GPU 8 nhân', 'Apple', '8GB', '7.png'),
('Laptop Lenovo Ideapad Slim 5 14IAH8 83BF002NVN', '2', '14990000', '10', 'Intel Core i5-12450H', 'Mainboard', 'Intel UHD Graphics', 'Lenovo', '16GB', '8.png'),
('Laptop Dell Inspirion 15 3511 PDP3H', '2', '13490000', '10', 'Intel Core i5-1135G7', 'Mainboard', 'Intel Iris Xe Graphics', 'Lenovo', '8GB', '9.png'),
('Laptop Gaming Acer Nitro 5 Eagle AN515-57-5669', '2', '16990000', '10', 'Intel Core i5-11400H', 'Mainboard', 'NVIDIA GeForce GTX 1650 4 GB GDDR6', 'Lenovo', '8GB', '10.png');
