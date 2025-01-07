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


}