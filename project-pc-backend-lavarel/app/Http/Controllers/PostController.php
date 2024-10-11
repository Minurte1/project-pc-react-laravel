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

    public function getImage($filename)
    {
        // Đường dẫn đầy đủ tới file trong storage
        $path = storage_path('app/public/images/' . $filename);

        // Kiểm tra xem file có tồn tại không
        if (!file_exists($path)) {
            return response()->json(['message' => 'Image not found'], 404);
        }

        // Trả về trực tiếp nội dung file hình ảnh
        return response()->file($path);
    }

    // Lấy khách hàng
    public function getKhachHang()
    {
        $rows = DB::select("SELECT * FROM khachhang LIMIT 1");

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

        $rows = DB::select("SELECT * FROM sanpham WHERE MASP = ?", [$id]);

        if (empty($rows)) {
            return response()->json([
                'message' => 'Không tìm thấy sản phẩm với id đã cho',
            ], 404);
        }

        $productWithImageUrl = (array) $rows[0];
        $productWithImageUrl['imageUrl'] = 'http://localhost:8080/public/images/' . $productWithImageUrl['ANHSP'];

        return response()->json([
            'message' => 'ok',
            'data' => $productWithImageUrl,
        ]);
    }

    // Lấy sản phẩm cho slider
    public function getSanPhamSlider()
    {
        try {
            $rows = DB::select("SELECT * FROM sanpham LIMIT 7");

            if (empty($rows)) {
                return response()->json([
                    'message' => 'Không tìm thấy sản phẩm',
                ], 404);
            }

            $productsWithImageUrl = array_map(function ($row) {
                return (array) $row + [
                    'imageUrl' => 'http://localhost:8080/public/images/' . $row->ANHSP,
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
            'MA_KH' => 'required',
            'DIA_CHI_SHIP' => 'required',
            'SDT_LIEN_HE_KH' => 'required',
            'GHI_CHU_HOA_DON' => 'nullable',
            'ChiTietHoaDon' => 'required|array',
        ]);

        try {
            // Insert hoadon
            $newMaHD = DB::insert("INSERT INTO hoadon (MA_KH, DIA_CHI_SHIP, SDT_LIEN_HE_KH, GHI_CHU_HOA_DON) (?, ?, ?, ?)", [
                $validatedData['MA_KH'],
                $validatedData['DIA_CHI_SHIP'],
                $validatedData['SDT_LIEN_HE_KH'],
                $validatedData['GHI_CHU_HOA_DON'],
            ]);

            // Insert ChiTietHoaDon
            foreach ($validatedData['ChiTietHoaDon'] as $item) {
                DB::insert("INSERT INTO ChiTietHoaDon (MAHD, MASP, SO_LUONG, GIAM_GIA) VALUES (?, ?, ?, ?)", [
                    $newMaHD,
                    $item['MASP'],
                    $item['SO_LUONG'],
                    $item['GIAM_GIA'],
                ]);

                // Cập nhật TonKhoSP
                DB::update("UPDATE sanpham SET TON_KHO_SP = TON_KHO_SP - ? WHERE MASP = ?", [
                    $item['SO_LUONG'],
                    $item['MASP'],
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
        $rows = DB::select("SELECT * FROM sanpham WHERE NHA_SAN_XUAT LIKE ?", ["Shop PC"]);

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
        $rows = DB::select("SELECT * FROM sanpham WHERE NHA_SAN_XUAT LIKE ?", ["Apple"]);

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
        $rows = DB::select("SELECT * FROM sanpham WHERE NHA_SAN_XUAT LIKE ?", ["ASUS"]);

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
            'MaTL' => 'required',
            'TENSP' => 'required',
            'DON_GIA' => 'required',
            'TON_KHO_SP' => 'required',
            'CHIP' => 'required',
            'MAIN' => 'required',
            'VGA' => 'required',
            'NHA_SAN_XUAT' => 'required',
            'RAM' => 'required',
            'ROM' => 'required',
            'ANHSP' => 'required',
            'GHI_CHU_SP' => 'nullable',
        ]);

        DB::insert("INSERT INTO sanpham (MaTL, TENSP, DON_GIA, TON_KHO_SP, CHIP, MAIN, VGA, NHA_SAN_XUAT, RAM, ROM, ANHSP, GHI_CHU_SP) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
            $validatedData['MaTL'],
            $validatedData['TENSP'],
            $validatedData['DON_GIA'],
            $validatedData['TON_KHO_SP'],
            $validatedData['CHIP'],
            $validatedData['MAIN'],
            $validatedData['VGA'],
            $validatedData['NHA_SAN_XUAT'],
            $validatedData['RAM'],
            $validatedData['ROM'],
            $validatedData['ANHSP'],
            $validatedData['GHI_CHU_SP'],
        ]);

        return response()->json(['message' => 'ok']);
    }

    // Cập nhật sản phẩm
    public function updateSanPham(Request $request)
    {
        // Xác thực dữ liệu đầu vào
        $validatedData = $request->validate([
            'MASP' => 'required',  // Thêm MaSP vào để xác định sản phẩm cần cập nhật
            'MaTL' => 'required',
            'TENSP' => 'required',
            'DON_GIA' => 'required',
            'TON_KHO_SP' => 'required',
            'CHIP' => 'required',
            'MAIN' => 'required',
            'VGA' => 'required',
            'NHA_SAN_XUAT' => 'required',
            'RAM' => 'required',
            'ROM' => 'required',
            'ANHSP' => 'required',
            'GHI_CHU_SP' => 'nullable',
        ]);

        // Thực hiện câu lệnh UPDATE
        DB::update("UPDATE SanPham SET TENSP = ?, MaTL = ?, DON_GIA = ?, TON_KHO_SP = ?, CHIP = ?, MAIN = ?, VGA = ?, NHA_SAN_XUAT = ?, RAM = ?, ROM = ?, ANHSP = ?, GHI_CHU_SP = ? WHERE MASP = ?", [
            $validatedData['TENSP'],         // Truy xuất đúng tên trường từ validatedData
            $validatedData['MaTL'],
            $validatedData['DON_GIA'],
            $validatedData['TON_KHO_SP'],
            $validatedData['CHIP'],
            $validatedData['MAIN'],
            $validatedData['VGA'],
            $validatedData['NHA_SAN_XUAT'],
            $validatedData['RAM'],
            $validatedData['ROM'],           // Thêm ROM vào câu lệnh SQL
            $validatedData['ANHSP'],
            $validatedData['GHI_CHU_SP'],    // Trường nullable (có thể không bắt buộc)
            $validatedData['MASP'],          // Điều kiện WHERE MaSP để cập nhật sản phẩm
        ]);

        // Trả về phản hồi JSON khi cập nhật thành công
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
        // Định nghĩa câu lệnh SQL thô
        $sql = "
        SELECT 
            sp.*,
            tl.*
        FROM 
            sanpham AS sp
        JOIN 
            theloai AS tl 
        ON 
            sp.MATL = tl.MATL
        ORDER BY 
            sp.MASP DESC
    ";

        // Thực thi câu lệnh SQL và lấy kết quả
        $sanPham = DB::select($sql);

        // Trả về phản hồi JSON
        return response()->json([
            'message' => 'ok',
            'data' => $sanPham,
        ]);
    }

    public function getThongKe()
    {
        // Định nghĩa câu lệnh SQL thô
        $sql = "
            SELECT 
                sp.*, 
                kh.*, 
                ct.*
            FROM 
                HoaDon AS hd
            JOIN 
                chi_tiet_hoa__on AS ct ON hd.MaHD = ct.MaHD
            JOIN 
                khachhang AS kh ON hd.MA_KH = kh.MA_KH
            JOIN 
                sanpham AS sp ON ct.MaSP = sp.MaSP
        ";

        // Thực thi câu lệnh SQL và lấy kết quả
        $thongKe = DB::select($sql);

        // Trả về phản hồi JSON
        return response()->json([
            'message' => 'ok',
            'data' => $thongKe,
        ]);
    }

    // public function postHomePage(Request $request)
    // {
    //     // Sử dụng $request để lấy dữ liệu từ biểu mẫu POST
    //     $data = $request->validate([
    //         'TimTenSP' => 'nullable|string',
    //         'TimTenTL' => 'nullable|string',
    //         'TimDonGiaSP' => 'nullable|numeric',
    //         'TimTonKhoSP' => 'nullable|numeric',
    //         'TimChip' => 'nullable|string',
    //         'TimMain' => 'nullable|string',
    //         'TimVGA' => 'nullable|string',
    //         'TimNhanSanXuat' => 'nullable|string',
    //         'TimRAM' => 'nullable|string',
    //     ]);

    //     // Bắt đầu câu truy vấn SQL
    //     $query = DB::table('sanpham as sp')
    //         ->join('theloai as tl', 'sp.MaTL', '=', 'tl.MaTL')
    //         ->select('sp.MaSP', 'sp.TenSP', 'tl.TenTL', 'sp.DonGiaSP', 'sp.TonKhoSP', 'sp.Chip', 'sp.Main', 'sp.VGA', 'sp.NhanSanXuat', 'sp.RAM', 'sp.AnhSP');

    //     // Thêm điều kiện WHERE cho các trường cần tìm kiếm
    //     if (!empty($data['TimTenSP'])) {
    //         $query->where('sp.TenSP', 'like', '%' . $data['TimTenSP'] . '%');
    //     }

    //     if (!empty($data['TimTenTL'])) {
    //         $query->where('tl.TenTL', 'like', '%' . $data['TimTenTL'] . '%');
    //     }

    //     if (!empty($data['TimDonGiaSP'])) {
    //         $query->where('sp.DonGiaSP', $data['TimDonGiaSP']);
    //     }

    //     if (!empty($data['TimTonKhoSP'])) {
    //         $query->where('sp.TonKhoSP', $data['TimTonKhoSP']);
    //     }

    //     if (!empty($data['TimChip'])) {
    //         $query->where('sp.Chip', 'like', '%' . $data['TimChip'] . '%');
    //     }

    //     if (!empty($data['TimMain'])) {
    //         $query->where('sp.Main', 'like', '%' . $data['TimMain'] . '%');
    //     }

    //     if (!empty($data['TimVGA'])) {
    //         $query->where('sp.VGA', 'like', '%' . $data['TimVGA'] . '%');
    //     }

    //     if (!empty($data['TimNhanSanXuat'])) {
    //         $query->where('sp.NhanSanXuat', 'like', '%' . $data['TimNhanSanXuat'] . '%');
    //     }

    //     if (!empty($data['TimRAM'])) {
    //         $query->where('sp.RAM', 'like', '%' . $data['TimRAM'] . '%');
    //     }

    //     $sanPham = $query->get();
    //     return response()->json([
    //         'message' => 'ok',
    //         'data' => $sanPham,
    //     ]);
    // }

    // public function getThemSanPhamPage()
    // {
    //     return view('sanphamNew');
    // }

    // public function themSanPham(Request $request)
    // {
    //     // Validate và xử lý upload hình ảnh
    //     $request->validate([
    //         'TenSP' => 'required|string',
    //         'MaTL' => 'required|integer',
    //         'DonGiaSP' => 'required|numeric',
    //         'TonKhoSP' => 'required|integer',
    //         'Chip' => 'nullable|string',
    //         'Main' => 'nullable|string',
    //         'VGA' => 'nullable|string',
    //         'NhanSanXuat' => 'nullable|string',
    //         'RAM' => 'nullable|string',
    //         'AnhSP' => 'required|string', // Chúng ta xác thực là string
    //     ]);

    //     // Xử lý dữ liệu hình ảnh
    //     $image = $request->AnhSP; // Lấy dữ liệu hình ảnh từ JSON
    //     if (preg_match('/^data:image\/(\w+);base64,/', $image, $type)) {
    //         $data = substr($image, strpos($image, ',') + 1);
    //         $type = strtolower($type[1]); // Lấy định dạng hình ảnh
    //         if (!in_array($type, ['jpg', 'jpeg', 'png', 'gif'])) {
    //             throw new \Exception('Image type not supported.');
    //         }
    //         $data = base64_decode($data);
    //         $filename = uniqid() . '.' . $type; // Tạo tên tệp ngẫu nhiên
    //         $path = storage_path('app/public/images/' . $filename); // Đường dẫn tệp
    //         file_put_contents($path, $data); // Lưu tệp vào server
    //     } else {
    //         throw new \Exception('Image is not valid.');
    //     }

    //     try {
    //         DB::table('SanPham')->insert([
    //             'TenSP' => $request->TenSP,
    //             'MaTL' => $request->MaTL,
    //             'DonGiaSP' => $request->DonGiaSP,
    //             'TonKhoSP' => $request->TonKhoSP,
    //             'Chip' => $request->Chip,
    //             'Main' => $request->Main,
    //             'VGA' => $request->VGA,
    //             'NhanSanXuat' => $request->NhanSanXuat,
    //             'RAM' => $request->RAM,
    //             'AnhSP' => $filename,
    //         ]);
    //         return response()->json(['message' => 'Sản phẩm đã được thêm thành công.'], 201);
    //     } catch (\Exception $e) {
    //         return response()->json(['error' => $e->getMessage()], 500);
    //     }
    // }


    // public function getEditPage($id)
    // {
    //     $sanPhamUp = DB::table('SanPham')->where('MaSP', $id)->first();
    //     return view('update', ['SanPham' => $sanPhamUp]);
    // }

    // public function postUpdateSanPham(Request $request)
    // {
    //     $request->validate([
    //         'MaSP' => 'required|integer',
    //         'TenSP' => 'required|string',
    //         'MaTL' => 'required|integer',
    //         'DonGiaSP' => 'required|numeric',
    //         'TonKhoSP' => 'required|integer',
    //         'Chip' => 'nullable|string',
    //         'Main' => 'nullable|string',
    //         'VGA' => 'nullable|string',
    //         'NhanSanXuat' => 'nullable|string',
    //         'RAM' => 'nullable|string',
    //         'AnhSP' => 'nullable|string', // Thay đổi validate cho AnhSP
    //     ]);

    //     $filename = null;

    //     // Kiểm tra nếu có hình ảnh và là chuỗi base64
    //     if (!empty($request->AnhSP)) {
    //         // Tách phần type và data
    //         list($type, $data) = explode(';', $request->AnhSP);
    //         list(, $data) = explode(',', $data);

    //         // Giải mã base64
    //         $data = base64_decode($data);

    //         // Tạo tên file ngẫu nhiên
    //         $filename = 'images/' . uniqid() . '.png';

    //         // Lưu file vào storage
    //         Storage::disk('public')->put($filename, $data);
    //     }

    //     try {
    //         DB::table('SanPham')->where('MaSP', $request->MaSP)->update([
    //             'TenSP' => $request->TenSP,
    //             'MaTL' => $request->MaTL,
    //             'DonGiaSP' => $request->DonGiaSP,
    //             'TonKhoSP' => $request->TonKhoSP,
    //             'Chip' => $request->Chip,
    //             'Main' => $request->Main,
    //             'VGA' => $request->VGA,
    //             'NhanSanXuat' => $request->NhanSanXuat,
    //             'RAM' => $request->RAM,
    //             'AnhSP' => $filename,
    //         ]);
    //         return response()->json(['message' => 'Product updated successfully']);
    //     } catch (\Exception $e) {
    //         return response()->json(['error' => $e->getMessage()], 500);
    //     }
    // }
}