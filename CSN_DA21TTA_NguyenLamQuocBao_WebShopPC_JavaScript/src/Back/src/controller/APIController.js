import pool from "../configs/connectDB";

let getAllSanPham = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM SanPham");

  // Thêm đường dẫn đầy đủ cho mỗi sản phẩm
  const productsWithImageUrls = rows.map((SanPham) => {
    return {
      ...SanPham,
      imageUrl: `http://localhost:8080/public/images/${SanPham.AnhSP}`,
    };
  });

  return res.status(200).json({
    message: "ok",
    data: productsWithImageUrls,
  });
};

let getKhachHang = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM KhachHang LIMIT 1");

  // Thêm đường dẫn đầy đủ cho mỗi sản phẩm
  const productsWithImageUrls = rows.map((KhachHang) => {
    return {
      ...KhachHang,
    };
  });

  return res.status(200).json({
    message: "ok",
    data: productsWithImageUrls,
  });
};

// Thêm hàm để lấy thông tin chi tiết sản phẩm theo id
let getSanPhamById = async (req, res) => {
  let { id } = req.params;

  if (!id) {
    return res.status(400).json({
      error: "Bad Request",
      message: "Thiếu thông tin id sản phẩm",
    });
  }

  const [rows, fields] = await pool.execute(
    "SELECT * FROM SanPham WHERE MaSP = ?",
    [id]
  );

  if (rows.length === 0) {
    return res.status(404).json({
      message: "Không tìm thấy sản phẩm với id đã cho",
    });
  }

  const productWithImageUrl = {
    ...rows[0],
    imageUrl: `http://localhost:8080/public/images/${rows[0].AnhSP}`,
  };

  return res.status(200).json({
    message: "ok",
    data: productWithImageUrl,
  });
};

let getSanPhamSlider = async (req, res) => {
  try {
    const [rows, fields] = await pool.execute("SELECT * FROM SanPham LIMIT 7");

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Không tìm thấy sản phẩm",
      });
    }

    const productsWithImageUrl = rows.map((row) => ({
      ...row,
      imageUrl: `http://localhost:8080/public/images/${row.AnhSP}`,
    }));

    return res.status(200).json({
      message: "ok",
      data: productsWithImageUrl,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      error: "Internal Server Error",
      message: "Đã xảy ra lỗi khi lấy dữ liệu sản phẩm",
    });
  }
};

let createHoaDon = async (req, res) => {
  try {
    const { MaKH, MaNV, DiaChiShip, NgayDatHang, GhiChu, ChiTietHoaDon } =
      req.body;
    console.log(">>>Check: ", req.body);

    // Insert HoaDon
    const [result] = await pool.execute(
      `
            INSERT INTO HoaDon(MaKH, MaNV, DiaChiShip, NgayDatHang, GhiChu) 
            VALUES (?, ?, ?, ?, ?)`,
      [MaKH, MaNV, DiaChiShip, NgayDatHang, GhiChu]
    );

    const newMaHD = result.insertId; // Lấy MaHD mới được tạo

    // Insert ChiTietHoaDon
    for (const { MaSP, SoLuong, GiamGia } of ChiTietHoaDon) {
      await pool.execute(
        `
                INSERT INTO ChiTietHoaDon(MaHD, MaSP, SoLuong, GiamGia) 
                VALUES (?, ?, ?, ?)`,
        [newMaHD, MaSP, SoLuong, GiamGia]
      );

      // Cập nhật TonKhoSP
      await pool.execute(
        `
                UPDATE SanPham
                SET TonKhoSP = TonKhoSP - ?
                WHERE MaSP = ?`,
        [SoLuong, MaSP]
      );
    }

    return res.status(200).json({
      message: "HoaDon created successfully",
    });
  } catch (error) {
    console.error("Error creating HoaDon:", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

let getSanPhamDesktop = async (req, res) => {
  const [rows, fields] = await pool.execute(
    "SELECT * FROM SanPham WHERE NhanSanXuat LIKE ?",
    ["Shop PC"]
  );

  // Thêm đường dẫn đầy đủ cho mỗi sản phẩm
  const productsWithImageUrls = rows.map((SanPham) => {
    return {
      ...SanPham,
      imageUrl: `http://localhost:8080/public/images/${SanPham.AnhSP}`,
    };
  });

  return res.status(200).json({
    message: "ok",
    data: productsWithImageUrls,
  });
};

let getSanPhamApple = async (req, res) => {
  const [rows, fields] = await pool.execute(
    "SELECT * FROM SanPham WHERE NhanSanXuat LIKE ?",
    ["Apple"]
  );

  // Thêm đường dẫn đầy đủ cho mỗi sản phẩm
  const productsWithImageUrls = rows.map((SanPham) => {
    return {
      ...SanPham,
      imageUrl: `http://localhost:8080/public/images/${SanPham.AnhSP}`,
    };
  });

  return res.status(200).json({
    message: "ok",
    data: productsWithImageUrls,
  });
};

let getSanPhamASUS = async (req, res) => {
  const [rows, fields] = await pool.execute(
    "SELECT * FROM SanPham WHERE NhanSanXuat LIKE ?",
    ["ASUS"]
  );

  // Thêm đường dẫn đầy đủ cho mỗi sản phẩm
  const productsWithImageUrls = rows.map((SanPham) => {
    return {
      ...SanPham,
      imageUrl: `http://localhost:8080/public/images/${SanPham.AnhSP}`,
    };
  });

  return res.status(200).json({
    message: "ok",
    data: productsWithImageUrls,
  });
};

//Api cũ
let createNewUser = async (req, res) => {
  let {
    MaSP,
    TenSP,
    MaTL,
    DonGiaSP,
    TonKhoSP,
    Chip,
    Main,
    VGA,
    NhanSanXuat,
    RAM,
    AnhSP,
  } = req.body;

  if (
    !MaSP ||
    !TenSP ||
    !MaTL ||
    !DonGiaSP ||
    !TonKhoSP ||
    !Chip ||
    !Main ||
    !VGA ||
    !NhanSanXuat ||
    !RAM ||
    !AnhSP
  ) {
    return res.status(200).json({
      message: "missing create",
    });
  }

  await pool.execute(
    `    
    INSERT INTO SanPham(TenSP, MaTL, DonGiaSP, TonKhoSP, Chip, Main, VGA, NhanSanXuat, RAM, AnhSP) 
    VALUES 
    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [TenSP, MaTL, DonGiaSP, TonKhoSP, Chip, Main, VGA, NhanSanXuat, RAM, AnhSP]
  );
  return res.status(200).json({
    message: "ok",
  });
};

let updateSanPham = async (req, res) => {
  let {
    MaSP,
    TenSP,
    MaTL,
    DonGiaSP,
    TonKhoSP,
    Chip,
    Main,
    VGA,
    NhanSanXuat,
    RAM,
    AnhSP,
  } = req.body;

  if (
    !MaSP ||
    !TenSP ||
    !MaTL ||
    !DonGiaSP ||
    !TonKhoSP ||
    !Chip ||
    !Main ||
    !VGA ||
    !NhanSanXuat ||
    !RAM ||
    !AnhSP
  ) {
    return res.status(200).json({
      message: "missing update",
    });
  }

  await pool.execute(
    `
    UPDATE SanPham SET TenSP = ?, MaTL = ?, DonGiaSP=?, TonKhoSP = ?, Chip = ?, Main = ?, VGA = ?, NhanSanXuat = ?, RAM = ?, AnhSP = ? 
    WHERE MaSP = ?`,
    [
      TenSP,
      MaTL,
      DonGiaSP,
      TonKhoSP,
      Chip,
      Main,
      VGA,
      NhanSanXuat,
      RAM,
      AnhSP,
      MaSP,
    ]
  );
  return res.status(200).json({
    message: "ok",
  });
};

let deleteUser = async (req, res) => {
  let { MaSP } = req.body;

  if (!MaSP) {
    return res.status(200).json({
      message: "missing delete",
    });
  }

  await pool.execute(
    `
    DELETE FROM SanPham
    WHERE MaSP = ?`,
    [MaSP]
  );
  return res.status(200).json({
    message: "ok",
  });
};

module.exports = {
  createNewUser,
  updateSanPham,
  deleteUser,
  getKhachHang,
  getAllSanPham,
  getSanPhamById,
  getSanPhamSlider,
  createHoaDon,
  getSanPhamDesktop,
  getSanPhamApple,
  getSanPhamASUS,
};
