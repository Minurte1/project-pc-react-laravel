<?php

namespace App\Http\Controllers;


use Illuminate\Support\Facades\Log;    
use Illuminate\Http\Request;        
use Illuminate\Support\Facades\Storage;

use Illuminate\Support\Facades\DB;  
class PostController extends Controller
{
    // Lấy tất cả sản phẩm
    public function getAllSanPham()
    {
        $rows = DB::select("SELECT * FROM sanpham");

        $productsWithImageUrls = array_map(function ($SanPham) {
            return (array) $SanPham + [
                'imageUrl' => 'http://localhost:8080/public/images/' . $SanPham->AnhSP,
            ];
        }, $rows);

        return response()->json([
            'message' => 'ok',
            'data' => $productsWithImageUrls,
        ]);
    }


    




    // Lấy khách hàng
    public function getKhachHang()
    {
        $rows = DB::select("SELECT * FROM KhachHang LIMIT 1");

        return response()->json([
            'message' => 'ok',
            'data' => $rows,
        ]);
    }

    // Lấy sản phẩm theo id
    public function getSanPhamById($id)
    {
        if (!$id) {
            return response()->json([
                'error' => 'Bad Request',
                'message' => 'Thiếu thông tin id sản phẩm',
            ], 400);
        }

        $rows = DB::select("SELECT * FROM SanPham WHERE MaSP = ?", [$id]);

        if (empty($rows)) {
            return response()->json([
                'message' => 'Không tìm thấy sản phẩm với id đã cho',
            ], 404);
        }

        $productWithImageUrl = (array) $rows[0];
        $productWithImageUrl['imageUrl'] = 'http://localhost:8080/public/images/' . $productWithImageUrl['AnhSP'];

        return response()->json([
            'message' => 'ok',
            'data' => $productWithImageUrl,
        ]);
    }

    // Lấy sản phẩm cho slider
    public function getSanPhamSlider()
    {
        try {
            $rows = DB::select("SELECT * FROM SanPham LIMIT 7");

            if (empty($rows)) {
                return response()->json([
                    'message' => 'Không tìm thấy sản phẩm',
                ], 404);
            }

            $productsWithImageUrl = array_map(function ($row) {
                return (array) $row + [
                    'imageUrl' => 'http://localhost:8080/public/images/' . $row->AnhSP,
                ];
            }, $rows);

            return response()->json([
                'message' => 'ok',
                'data' => $productsWithImageUrl,
            ]);
        } catch (\Exception $error) {
            Log::error($error->getMessage());
            return response()->json([
                'error' => 'Internal Server Error',
                'message' => 'Đã xảy ra lỗi khi lấy dữ liệu sản phẩm',
            ], 500);
        }
    }

    // Tạo hóa đơn
    public function createHoaDon(Request $request)
    {
        $validatedData = $request->validate([
            'MaKH' => 'required',
            'MaNV' => 'required',
            'DiaChiShip' => 'required',
            'NgayDatHang' => 'required',
            'GhiChu' => 'nullable',
            'ChiTietHoaDon' => 'required|array',
        ]);

        try {
            // Insert HoaDon
            $newMaHD = DB::insert("INSERT INTO HoaDon (MaKH, MaNV, DiaChiShip, NgayDatHang, GhiChu) VALUES (?, ?, ?, ?, ?)", [
                $validatedData['MaKH'],
                $validatedData['MaNV'],
                $validatedData['DiaChiShip'],
                $validatedData['NgayDatHang'],
                $validatedData['GhiChu'],
            ]);

            // Insert ChiTietHoaDon
            foreach ($validatedData['ChiTietHoaDon'] as $item) {
                DB::insert("INSERT INTO ChiTietHoaDon (MaHD, MaSP, SoLuong, GiamGia) VALUES (?, ?, ?, ?)", [
                    $newMaHD,
                    $item['MaSP'],
                    $item['SoLuong'],
                    $item['GiamGia'],
                ]);

                // Cập nhật TonKhoSP
                DB::update("UPDATE SanPham SET TonKhoSP = TonKhoSP - ? WHERE MaSP = ?", [
                    $item['SoLuong'],
                    $item['MaSP'],
                ]);
            }

            return response()->json(['message' => 'HoaDon created successfully']);
        } catch (\Exception $error) {
            Log::error('Error creating HoaDon: ' . $error->getMessage());
            return response()->json(['message' => 'Internal Server Error'], 500);
        }
    }

    // Lấy sản phẩm desktop
    public function getSanPhamDesktop()
    {
        $rows = DB::select("SELECT * FROM SanPham WHERE NhanSanXuat LIKE ?", ["Shop PC"]);

        $productsWithImageUrls = array_map(function ($SanPham) {
            return (array) $SanPham + [
                'imageUrl' => 'http://localhost:8080/public/images/' . $SanPham->AnhSP,
            ];
        }, $rows);

        return response()->json([
            'message' => 'ok',
            'data' => $productsWithImageUrls,
        ]);
    }

    // Lấy sản phẩm Apple
    public function getSanPhamApple()
    {
        $rows = DB::select("SELECT * FROM SanPham WHERE NhanSanXuat LIKE ?", ["Apple"]);

        $productsWithImageUrls = array_map(function ($SanPham) {
            return (array) $SanPham + [
                'imageUrl' => 'http://localhost:8080/public/images/' . $SanPham->AnhSP,
            ];
        }, $rows);

        return response()->json([
            'message' => 'ok',
            'data' => $productsWithImageUrls,
        ]);
    }

    // Lấy sản phẩm ASUS
    public function getSanPhamASUS()
    {
        $rows = DB::select("SELECT * FROM SanPham WHERE NhanSanXuat LIKE ?", ["ASUS"]);

        $productsWithImageUrls = array_map(function ($SanPham) {
            return (array) $SanPham + [
                'imageUrl' => 'http://localhost:8080/public/images/' . $SanPham->AnhSP,
            ];
        }, $rows);

        return response()->json([
            'message' => 'ok',
            'data' => $productsWithImageUrls,
        ]);
    }

    // Tạo người dùng mới
    public function createNewUser(Request $request)
    {
        $validatedData = $request->validate([
            'MaSP' => 'required',
            'TenSP' => 'required',
            'MaTL' => 'required',
            'DonGiaSP' => 'required',
            'TonKhoSP' => 'required',
            'Chip' => 'required',
            'Main' => 'required',
            'VGA' => 'required',
            'NhanSanXuat' => 'required',
            'RAM' => 'required',
            'AnhSP' => 'required',
        ]);

        DB::insert("INSERT INTO SanPham (TenSP, MaTL, DonGiaSP, TonKhoSP, Chip, Main, VGA, NhanSanXuat, RAM, AnhSP) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
            $validatedData['TenSP'],
            $validatedData['MaTL'],
            $validatedData['DonGiaSP'],
            $validatedData['TonKhoSP'],
            $validatedData['Chip'],
            $validatedData['Main'],
            $validatedData['VGA'],
            $validatedData['NhanSanXuat'],
            $validatedData['RAM'],
            $validatedData['AnhSP'],
        ]);

        return response()->json(['message' => 'ok']);
    }

    // Cập nhật sản phẩm
    public function updateSanPham(Request $request)
    {
        $validatedData = $request->validate([
            'MaSP' => 'required',
            'TenSP' => 'required',
            'MaTL' => 'required',
            'DonGiaSP' => 'required',
            'TonKhoSP' => 'required',
            'Chip' => 'required',
            'Main' => 'required',
            'VGA' => 'required',
            'NhanSanXuat' => 'required',
            'RAM' => 'required',
            'AnhSP' => 'required',
        ]);

        DB::update("UPDATE SanPham SET TenSP = ?, MaTL = ?, DonGiaSP = ?, TonKhoSP = ?, Chip = ?, Main = ?, VGA = ?, NhanSanXuat = ?, RAM = ?, AnhSP = ? WHERE MaSP = ?", [
            $validatedData['TenSP'],
            $validatedData['MaTL'],
            $validatedData['DonGiaSP'],
            $validatedData['TonKhoSP'],
            $validatedData['Chip'],
            $validatedData['Main'],
            $validatedData['VGA'],
            $validatedData['NhanSanXuat'],
            $validatedData['RAM'],
            $validatedData['AnhSP'],
            $validatedData['MaSP'],
        ]);

        return response()->json(['message' => 'Product updated successfully']);
    }

    // Xóa sản phẩm
    public function deleteSanPham($id)
    {
        DB::delete("DELETE FROM SanPham WHERE MaSP = ?", [$id]);

        return response()->json(['message' => 'Product deleted successfully']);
    }
    public function getHomePage()
    {
        // Bắt đầu câu truy vấn SQL
        $sanPham = DB::table('sanpham as sp')
            ->join('theloai as tl', 'sp.MaTL', '=', 'tl.MaTL')
            ->select('sp.MaSP', 'sp.TenSP', 'tl.TenTL', 'sp.DonGiaSP', 'sp.TonKhoSP', 'sp.Chip', 'sp.Main', 'sp.VGA', 'sp.NhanSanXuat', 'sp.RAM', 'sp.AnhSP')
            ->orderBy('sp.MaSP', 'desc')
            ->get();

            return response()->json([
                'message' => 'ok',
                'data' => $sanPham,
            ]);
    }

    public function getThongKe()
    {
        // Bắt đầu câu truy vấn SQL
        $thongKe = DB::table('HoaDon as hd')
            ->join('ChiTietHoaDon as ct', 'hd.MaHD', '=', 'ct.MaHD')
            ->join('KhachHang as kh', 'hd.MaKH', '=', 'kh.MaKH')
            ->join('SanPham as sp', 'ct.MaSP', '=', 'sp.MaSP')
            ->select('sp.TenSP', 'sp.NhanSanXuat', 'kh.TenLienHe', 'ct.SoLuong', 'sp.DonGiaSP', DB::raw("DATE_FORMAT(hd.NgayDatHang, '%Y-%m-%d %H:%i:%s') AS FormattedNgayDatHang"))
            ->get();

            return response()->json([
                'message' => 'ok',
                'data' => $thongKe,
            ]);
    }

    public function postHomePage(Request $request)
    {
        // Sử dụng $request để lấy dữ liệu từ biểu mẫu POST
        $data = $request->validate([
            'TimTenSP' => 'nullable|string',
            'TimTenTL' => 'nullable|string',
            'TimDonGiaSP' => 'nullable|numeric',
            'TimTonKhoSP' => 'nullable|numeric',
            'TimChip' => 'nullable|string',
            'TimMain' => 'nullable|string',
            'TimVGA' => 'nullable|string',
            'TimNhanSanXuat' => 'nullable|string',
            'TimRAM' => 'nullable|string',
        ]);

        // Bắt đầu câu truy vấn SQL
        $query = DB::table('sanpham as sp')
            ->join('theloai as tl', 'sp.MaTL', '=', 'tl.MaTL')
            ->select('sp.MaSP', 'sp.TenSP', 'tl.TenTL', 'sp.DonGiaSP', 'sp.TonKhoSP', 'sp.Chip', 'sp.Main', 'sp.VGA', 'sp.NhanSanXuat', 'sp.RAM', 'sp.AnhSP');

        // Thêm điều kiện WHERE cho các trường cần tìm kiếm
        if (!empty($data['TimTenSP'])) {
            $query->where('sp.TenSP', 'like', '%' . $data['TimTenSP'] . '%');
        }

        if (!empty($data['TimTenTL'])) {
            $query->where('tl.TenTL', 'like', '%' . $data['TimTenTL'] . '%');
        }

        if (!empty($data['TimDonGiaSP'])) {
            $query->where('sp.DonGiaSP', $data['TimDonGiaSP']);
        }

        if (!empty($data['TimTonKhoSP'])) {
            $query->where('sp.TonKhoSP', $data['TimTonKhoSP']);
        }

        if (!empty($data['TimChip'])) {
            $query->where('sp.Chip', 'like', '%' . $data['TimChip'] . '%');
        }

        if (!empty($data['TimMain'])) {
            $query->where('sp.Main', 'like', '%' . $data['TimMain'] . '%');
        }

        if (!empty($data['TimVGA'])) {
            $query->where('sp.VGA', 'like', '%' . $data['TimVGA'] . '%');
        }

        if (!empty($data['TimNhanSanXuat'])) {
            $query->where('sp.NhanSanXuat', 'like', '%' . $data['TimNhanSanXuat'] . '%');
        }

        if (!empty($data['TimRAM'])) {
            $query->where('sp.RAM', 'like', '%' . $data['TimRAM'] . '%');
        }

        $sanPham = $query->get();
        return response()->json([
            'message' => 'ok',
            'data' => $sanPham,
        ]);
    }

    public function getThemSanPhamPage()
    {
        return view('sanphamNew');
    }

    public function themSanPham(Request $request)
{
    // Validate và xử lý upload hình ảnh
    $request->validate([
        'TenSP' => 'required|string',
        'MaTL' => 'required|integer',
        'DonGiaSP' => 'required|numeric',
        'TonKhoSP' => 'required|integer',
        'Chip' => 'nullable|string',
        'Main' => 'nullable|string',
        'VGA' => 'nullable|string',
        'NhanSanXuat' => 'nullable|string',
        'RAM' => 'nullable|string',
        'AnhSP' => 'required|string', // Chúng ta xác thực là string
    ]);

    // Xử lý dữ liệu hình ảnh
    $image = $request->AnhSP; // Lấy dữ liệu hình ảnh từ JSON
    if (preg_match('/^data:image\/(\w+);base64,/', $image, $type)) {
        $data = substr($image, strpos($image, ',') + 1);
        $type = strtolower($type[1]); // Lấy định dạng hình ảnh
        if (!in_array($type, ['jpg', 'jpeg', 'png', 'gif'])) {
            throw new \Exception('Image type not supported.');
        }
        $data = base64_decode($data);
        $filename = uniqid() . '.' . $type; // Tạo tên tệp ngẫu nhiên
        $path = storage_path('app/public/images/' . $filename); // Đường dẫn tệp
        file_put_contents($path, $data); // Lưu tệp vào server
    } else {
        throw new \Exception('Image is not valid.');
    }

    try {
        DB::table('SanPham')->insert([
            'TenSP' => $request->TenSP,
            'MaTL' => $request->MaTL,
            'DonGiaSP' => $request->DonGiaSP,
            'TonKhoSP' => $request->TonKhoSP,
            'Chip' => $request->Chip,
            'Main' => $request->Main,
            'VGA' => $request->VGA,
            'NhanSanXuat' => $request->NhanSanXuat,
            'RAM' => $request->RAM,
            'AnhSP' => $filename,
        ]);
        return response()->json(['message' => 'Sản phẩm đã được thêm thành công.'], 201);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
}


    public function getEditPage($id)
    {
        $sanPhamUp = DB::table('SanPham')->where('MaSP', $id)->first();
        return view('update', ['SanPham' => $sanPhamUp]);
    }

    public function postUpdateSanPham(Request $request)
{
    $request->validate([
        'MaSP' => 'required|integer',
        'TenSP' => 'required|string',
        'MaTL' => 'required|integer',
        'DonGiaSP' => 'required|numeric',
        'TonKhoSP' => 'required|integer',
        'Chip' => 'nullable|string',
        'Main' => 'nullable|string',
        'VGA' => 'nullable|string',
        'NhanSanXuat' => 'nullable|string',
        'RAM' => 'nullable|string',
        'AnhSP' => 'nullable|string', // Thay đổi validate cho AnhSP
    ]);

    $filename = null;

    // Kiểm tra nếu có hình ảnh và là chuỗi base64
    if (!empty($request->AnhSP)) {
        // Tách phần type và data
        list($type, $data) = explode(';', $request->AnhSP);
        list(, $data)      = explode(',', $data);

        // Giải mã base64
        $data = base64_decode($data);

        // Tạo tên file ngẫu nhiên
        $filename = 'images/' . uniqid() . '.png';

        // Lưu file vào storage
        Storage::disk('public')->put($filename, $data);
    }

    try {
        DB::table('SanPham')->where('MaSP', $request->MaSP)->update([
            'TenSP' => $request->TenSP,
            'MaTL' => $request->MaTL,
            'DonGiaSP' => $request->DonGiaSP,
            'TonKhoSP' => $request->TonKhoSP,
            'Chip' => $request->Chip,
            'Main' => $request->Main,
            'VGA' => $request->VGA,
            'NhanSanXuat' => $request->NhanSanXuat,
            'RAM' => $request->RAM,
            'AnhSP' => $filename,
        ]);
        return response()->json(['message' => 'Product updated successfully']);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
}

    
}
