<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    public function getListUser()
    {
        // Truy vấn dữ liệu giỏ hàng của 1 người dùng
        $listUser = DB::select("
        SELECT 
        khachhang.*,
        tai_khoan.*
        FROM khachhang
        JOIN tai_khoan ON tai_khoan.MA_KH = khachhang.MA_KH
        ", );

        // Nếu không có sản phẩm nào trong giỏ hàng, trả về mảng rỗng và tổng số tiền = 0
        if (empty($listUser)) {
            return response()->json([
                'message' => 'No items found in the cart for this user.',
                'data' => [],
            ]);
        }

        // Trả về dữ liệu giỏ hàng và tổng số tiền
        return response()->json([
            'message' => 'ok',
            'data' => $listUser
        ]);
    }

    public function getDonHang()
    {
        // Truy vấn dữ liệu giỏ hàng của 1 người dùng
        $listDonHang = DB::select("
        SELECT 
        khachhang.*,
        sanpham.*,
        theloai.*,
        hoadon.*,
        chi_tiet_hoa_don.*
        FROM khachhang
        JOIN tai_khoan ON tai_khoan.MA_KH = khachhang.MA_KH
        JOIN hoadon ON hoadon.MA_KH = khachhang.MA_KH
        JOIN chi_tiet_hoa_don ON chi_tiet_hoa_don.MAHD = hoadon.MAHD
        JOIN sanpham ON sanpham.MASP = chi_tiet_hoa_don.MASP
        JOIN theloai ON theloai.MATL = sanpham.MATL

        ", );

        // Nếu không có sản phẩm nào trong giỏ hàng, trả về mảng rỗng và tổng số tiền = 0
        if (empty($listDonHang)) {
            return response()->json([
                'message' => 'No items found in the cart for this user.',
                'data' => [],
            ]);
        }

        // Trả về dữ liệu giỏ hàng và tổng số tiền
        return response()->json([
            'message' => 'ok',
            'data' => $listDonHang
        ]);
    }

    public function getSanPham()
    {
        // Truy vấn dữ liệu giỏ hàng của 1 người dùng
        $listSanPham = DB::select("
        SELECT 
        sanpham.*,
        theloai.*
        FROM sanpham
        JOIN theloai ON theloai.MATL = sanpham.MATL

        ", );

        // Nếu không có sản phẩm nào trong giỏ hàng, trả về mảng rỗng và tổng số tiền = 0
        if (empty($listSanPham)) {
            return response()->json([
                'message' => 'No items found in the cart for this user.',
                'data' => [],
            ]);
        }

        // Trả về dữ liệu giỏ hàng và tổng số tiền
        return response()->json([
            'message' => 'ok',
            'data' => $listSanPham
        ]);
    }

    public function getTheLoai()
    {
        // Truy vấn dữ liệu giỏ hàng của 1 người dùng
        $listTheLoai = DB::select("
        SELECT * FROM theloai
        ", );

        // Nếu không có sản phẩm nào trong giỏ hàng, trả về mảng rỗng và tổng số tiền = 0
        if (empty($listTheLoai)) {
            return response()->json([
                'message' => 'No items found in the cart for this user.',
                'data' => [],
            ]);
        }

        // Trả về dữ liệu giỏ hàng và tổng số tiền
        return response()->json([
            'message' => 'ok',
            'data' => $listTheLoai
        ]);
    }

    public function createSanPham(Request $request)
    {
        try {
            // Validate dữ liệu
            $validatedData = $request->validate([
                'MATL' => 'required|string|max:255',
                'TENSP' => 'required|string|max:255',
                'DON_GIA' => 'required|numeric',
                'TON_KHO_SP' => 'required|integer',
                'CHIP' => 'nullable|string|max:255',
                'MAIN' => 'nullable|string|max:255',
                'VGA' => 'nullable|string|max:255',
                'NHA_SAN_XUAT' => 'nullable|string|max:255',
                'RAM' => 'nullable|string|max:255',
                'ROM' => 'nullable|string|max:255',
                'ANHSP' => 'required|file|image|mimes:jpeg,png,jpg,gif|max:2048',
                'GHI_CHU_SP' => 'nullable|string',
            ]);

            // Lưu ảnh vào thư mục public/images
            if ($request->hasFile('ANHSP')) {
                $file = $request->file('ANHSP');
                $fileName = time() . '_' . $file->getClientOriginalName();
                $file->move(public_path('images'), $fileName);
            } else {
                return response()->json(['message' => 'Ảnh sản phẩm là bắt buộc'], 400);
            }

            // Thêm sản phẩm vào cơ sở dữ liệu
            DB::table('sanpham')->insert([
                'MATL' => $validatedData['MATL'],
                'TENSP' => $validatedData['TENSP'],
                'DON_GIA' => $validatedData['DON_GIA'],
                'TON_KHO_SP' => $validatedData['TON_KHO_SP'],
                'CHIP' => $validatedData['CHIP'],
                'MAIN' => $validatedData['MAIN'],
                'VGA' => $validatedData['VGA'],
                'NHA_SAN_XUAT' => $validatedData['NHA_SAN_XUAT'],
                'RAM' => $validatedData['RAM'],
                'ROM' => $validatedData['ROM'],
                'ANHSP' => $fileName, // Lưu tên file vào DB
                'GHI_CHU_SP' => $validatedData['GHI_CHU_SP'],
            ]);

            return response()->json([
                'message' => 'Thêm sản phẩm thành công!',
                'data' => $validatedData,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Có lỗi xảy ra: ' . $e->getMessage(),
            ], 500);
        }
    }


}