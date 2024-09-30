import pool from "../configs/connectDB"

let getHomePage = async (req, res) => {
    // Bắt đầu câu truy vấn SQL
    let sqlQuery = `SELECT sp.MaSP, sp.TenSP, tl.TenTL, sp.DonGiaSP, sp.TonKhoSP, sp.Chip, sp.Main, sp.VGA, sp.NhanSanXuat, sp.RAM, sp.AnhSP 
                    FROM sanpham as sp, theloai as tl 
                    WHERE sp.MaTL = tl.MaTL ORDER BY sp.MaSP DESC`;

    // Kết thúc câu truy vấn SQL
    const [rows, fields] = await pool.execute(sqlQuery);

    return res.render("index.ejs", { SanPham: rows });
}

let getThongKe = async (req, res) => {
    // Bắt đầu câu truy vấn SQL
    let sqlQuery = `SELECT sp.TenSP, sp.NhanSanXuat , kh.TenLienHe, ct.SoLuong, sp.DonGiaSP, DATE_FORMAT(hd.NgayDatHang, '%Y-%m-%d %H:%i:%s') AS FormattedNgayDatHang
                    FROM HoaDon as hd
                    JOIN ChiTietHoaDon as ct ON hd.MaHD = ct.MaHD
                    JOIN KhachHang as kh ON hd.MaKH = kh.MaKH
                    JOIN SanPham as sp ON ct.MaSP = sp.MaSP
                    WHERE hd.MaHD = ct.MaHD AND kh.MaKH = hd.MaKH AND sp.MaSP = ct.MaSP
                    `;

    // Kết thúc câu truy vấn SQL
    const [rows, fields] = await pool.execute(sqlQuery);
    console.log(">>> Check: ", rows)
    return res.render("ThongKe.ejs", { SanPham: rows });
}

let postHomePage = async (req, res) => {
    // Sử dụng req.body để lấy dữ liệu từ biểu mẫu POST
    let { TimTenSP, TimTenTL, TimDonGiaSP, TimTonKhoSP, TimChip, TimMain, TimVGA, TimNhanSanXuat, TimRAM } = req.body;
    //console.log(req.body);
    // Bắt đầu câu truy vấn SQL
    let sqlQuery = `SELECT sp.MaSP, sp.TenSP, tl.TenTL, sp.DonGiaSP, sp.TonKhoSP, sp.Chip, sp.Main, sp.VGA, sp.NhanSanXuat, sp.RAM, sp.AnhSP 
                    FROM sanpham as sp, theloai as tl
                    WHERE sp.MaTL = tl.MaTL `;


    // Thêm điều kiện WHERE cho các trường cần tìm kiếm

    if (TimTenSP) {
        sqlQuery += `AND sp.TenSP LIKE '%${TimTenSP}%'`;
    }

    if (TimTenTL) {
        sqlQuery += ` AND tl.TenTL LIKE '%${TimTenTL}%'`;
    }

    if (TimDonGiaSP) {
        sqlQuery += ` AND sp.DonGiaSP = ${TimDonGiaSP}`;
    }

    if (TimTonKhoSP) {
        sqlQuery += ` AND sp.TonKhoSP = ${TimTonKhoSP}`;
    }

    if (TimChip) {
        sqlQuery += ` AND sp.Chip LIKE '%${TimChip}%'`;
    }

    if (TimMain) {
        sqlQuery += ` AND sp.Main LIKE '%${TimMain}%'`;
    }

    if (TimVGA) {
        sqlQuery += ` AND sp.VGA LIKE '%${TimVGA}%'`;
    }

    if (TimNhanSanXuat) {
        sqlQuery += ` AND sp.NhanSanXuat LIKE '%${TimNhanSanXuat}%'`;
    }

    if (TimRAM) {
        sqlQuery += ` AND sp.RAM LIKE '%${TimRAM}%'`;
    }

    // Kết thúc câu truy vấn SQL
    const [rows, fields] = await pool.execute(sqlQuery);
    return res.render("Tim.ejs", { SanPham: rows });
}


let getThemSanPhamPage = (req, res) => {
    return res.render('sanphamNew.ejs')
}

let themSanPham = async (req, res) => {
    let { TenSP, MaTL, DonGiaSP, TonKhoSP, Chip, Main, VGA, NhanSanXuat, RAM } = req.body;

    if (req.fileValidationError) {
        return res.status(400).json({ error: req.fileValidationError });
    } else if (!req.file) {
        return res.status(400).json({ error: "Please select an image to upload" });
    }

    //console.log(">>> Check:", TenSP, MaTL, DonGiaSP, TonKhoSP, Chip, Main, VGA, NhanSanXuat, RAM, req.file.filename)
    try {
        await pool.execute(`
    INSERT INTO SanPham (TenSP, MaTL, DonGiaSP, TonKhoSP, Chip, Main, VGA, NhanSanXuat, RAM, AnhSP) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [TenSP, MaTL, DonGiaSP, TonKhoSP, Chip, Main, VGA, NhanSanXuat, RAM, req.file.filename]);
        return res.redirect('/')
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

let getEditPage = async (req, res) => {
    let id = req.params.id
    let [SanPhamUp] = await pool.execute(`
    SELECT * FROM SanPham WHERE MaSP = ?`,
        [id]);
    return res.render("update.ejs", { SanPham: SanPhamUp[0] })
}

let postUpdateSanPham = async (req, res) => {
    let { MaSP, TenSP, MaTL, DonGiaSP, TonKhoSP, Chip, Main, VGA, NhanSanXuat, RAM } = req.body;

    if (req.fileValidationError) {
        return res.status(400).json({ error: req.fileValidationError });
    } else if (!req.file) {
        return res.status(400).json({ error: "Please select an image to upload" });
    }
    //console.log(">>> check ", req.file.filename)
    try {
        await pool.execute(`
        UPDATE SanPham SET TenSP = ?, MaTL = ?, DonGiaSP=?, TonKhoSP = ?, Chip = ?, Main = ?, VGA = ?, NhanSanXuat = ?, RAM = ?, AnhSP = ? 
        WHERE MaSP = ?`,
            [TenSP, MaTL, DonGiaSP, TonKhoSP, Chip, Main, VGA, NhanSanXuat, RAM, req.file.filename, MaSP]);
        return res.redirect('/')
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

let deleteSanPham = async (req, res) => {
    let MaSP = req.body.MaSP
    await pool.execute(`
    DELETE FROM SanPham WHERE MaSP = ?`,
        [MaSP]);
    return res.redirect('/')
}

module.exports = {
    getHomePage, getThemSanPhamPage, themSanPham, getThongKe,
    getEditPage, postUpdateSanPham, deleteSanPham, postHomePage
}