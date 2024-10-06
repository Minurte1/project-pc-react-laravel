CREATE DATABASE ShopPC_data
GO
USE ShopPC_data;
GO
CREATE TABLE SanPham(
	MaSP INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	TenSP VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
	DonGiaSP FLOAT,
	TonKhoSP SMALLINT,
	Chip VARCHAR(50),
	Main VARCHAR(100),
	VGA VARCHAR(50),
	NhanSanXuat VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
	RAM VARCHAR(100),
	AnhSP TEXT
)
INSERT INTO SanPham (TenSP, DonGiaSP, TonKhoSP, Chip, Main, VGA, NhanSanXuat, RAM, AnhSP)
VALUES
('PC Desktop XYZ', 1500.00, 50, 'Intel Core i7', 'ASUS Prime Z390-A', 'NVIDIA GeForce RTX 3070', 'ABC Corporation', '16GB DDR4', 'link_anh_san_pham.jpg');

GO
CREATE TABLE NhanVien(
	MaNV INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	HoLotNV VARCHAR(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
	TenNV VARCHAR(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
	DiaChiNV VARCHAR(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
	ThanhPhoNV VARCHAR(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
	QuocGiaNV VARCHAR(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
	SdtNV VARCHAR(24),
	AnhNV TEXT
)

GO
CREATE TABLE KhachHang (
    MaKH INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    UseNameKH VARCHAR(255) UNIQUE,
    PassKH TEXT,
    HoTenKH VARCHAR(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    DiaChiKH VARCHAR(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    ThanhPhoKH VARCHAR(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    QuocGiaKH VARCHAR(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    Sdt VARCHAR(24)
);
GO
-- Thêm dữ liệu mẫu vào bảng KhachHang với tiếng Việt
INSERT INTO KhachHang (UseNameKH, PassKH, HoTenKH, DiaChiKH, ThanhPhoKH, QuocGiaKH, Sdt)
VALUES
('nguoidung1', '123456', 'Nguyễn Văn A', '123 Đường, Quận 1', 'Thành phố Hồ Chí Minh', 'Việt Nam', '123456789');

GO
CREATE TABLE HoaDon(
	MaHD INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	MaKH INT,
	MaSP INT
)
GO
CREATE TABLE Admins(
	MaAD INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	UseNameAD VARCHAR(255) UNIQUE,
	PassAD TEXT,
	TenLienHeAD VARCHAR(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
)

INSERT INTO Admins (UseNameAD, PassAD, TenLienHeAD)
VALUES
('admin1', '0000', 'Nguyễn Lâm Quốc Bảo');