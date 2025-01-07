<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    public function getCartItemsByUserId($maKh)
    {
        // Truy vấn dữ liệu giỏ hàng của 1 người dùng
        $cartItems = DB::select("
            SELECT 
                gh.MA_KH,
                kh.TEN_KHACH_HANG,
                kh.SDT_KH,
                sp.MASP,
                sp.TENSP,
                sp.DON_GIA,
                sp.TON_KHO_SP,
                sp.ANHSP,
                sp.GHI_CHU_SP,
                tl.TENTL AS LOAI_SAN_PHAM,
                gh.SO_LUONG_SP,
                (gh.SO_LUONG_SP * sp.DON_GIA) AS THANH_TIEN
            FROM gio_hang gh
            JOIN khachhang kh ON kh.MA_KH = gh.MA_KH
            JOIN sanpham sp ON sp.MASP = gh.MASP
            JOIN theloai tl ON tl.MATL = sp.MATL
            WHERE gh.MA_KH = ?
        ", [$maKh]);

        // Truy vấn tổng số tiền trong giỏ hàng của người dùng
        $totalAmount = DB::selectOne("
            SELECT SUM(gh.SO_LUONG_SP * sp.DON_GIA) AS totalAmount
            FROM gio_hang gh
            JOIN sanpham sp ON sp.MASP = gh.MASP
            WHERE gh.MA_KH = ?
        ", [$maKh]);

        // Nếu không có sản phẩm nào trong giỏ hàng, trả về mảng rỗng và tổng số tiền = 0
        if (empty($cartItems)) {
            return response()->json([
                'message' => 'No items found in the cart for this user.',
                'data' => [],
                'totalAmount' => 0
            ]);
        }

        // Trả về dữ liệu giỏ hàng và tổng số tiền
        return response()->json([
            'message' => 'ok',
            'data' => $cartItems,
            'totalAmount' => $totalAmount->totalAmount
        ]);
    }



    // Tăng hoặc giảm số lượng sản phẩm trong giỏ hàng
    public function updateCartItemQuantity(Request $request)
    {
        $validated = $request->validate([
            'MA_KH' => 'required|integer',
            'MASP' => 'required|integer',
            'CHANGE' => 'required|integer|in:1,-1', // +1 hoặc -1
        ]);

        $maKh = $validated['MA_KH'];
        $maSp = $validated['MASP'];
        $change = $validated['CHANGE'];

        // Kiểm tra sản phẩm trong giỏ hàng
        $cartItem = DB::table('gio_hang')
            ->where('MA_KH', $maKh)
            ->where('MASP', $maSp)
            ->first();

        if (!$cartItem) {
            // Nếu sản phẩm chưa có, tạo mới với số lượng là 1 nếu CHANGE = 1
            if ($change > 0) {
                DB::table('gio_hang')->insert([
                    'MA_KH' => $maKh,
                    'MASP' => $maSp,
                    'SO_LUONG_SP' => 1,
                ]);

                return response()->json(['message' => 'Product added to cart with quantity 1']);
            } else {
                return response()->json(['message' => 'Product not found in cart'], 404);
            }
        }

        // Nếu sản phẩm đã tồn tại, tính toán số lượng mới
        $newQuantity = $cartItem->SO_LUONG_SP + $change;

        if ($newQuantity <= 0) {
            // Nếu số lượng <= 0, xóa sản phẩm khỏi giỏ hàng
            DB::table('gio_hang')
                ->where('MA_KH', $maKh)
                ->where('MASP', $maSp)
                ->delete();

            return response()->json(['message' => 'Product removed from cart']);
        }

        // Cập nhật số lượng mới
        DB::table('gio_hang')
            ->where('MA_KH', $maKh)
            ->where('MASP', $maSp)
            ->update(['SO_LUONG_SP' => $newQuantity]);

        return response()->json(['message' => 'Product quantity updated', 'newQuantity' => $newQuantity]);
    }



    // Tạo giỏ hàng mới
    public function createCart(Request $request)
    {
        $validated = $request->validate([
            'MA_KH' => 'required|integer',
            'MASP' => 'required|integer',
        ]);

        $maKh = $validated['MA_KH'];
        $maSp = $validated['MASP'];

        // Kiểm tra sản phẩm trong giỏ hàng
        $existingCartItem = DB::table('gio_hang')
            ->where('MA_KH', $maKh)
            ->where('MASP', $maSp)
            ->first();

        if ($existingCartItem) {
            // Nếu sản phẩm đã tồn tại, tăng số lượng lên 1
            DB::table('gio_hang')
                ->where('MA_KH', $maKh)
                ->where('MASP', $maSp)
                ->increment('SO_LUONG_SP', 1);

            return response()->json(['message' => 'Product quantity increased by 1']);
        }

        // Nếu chưa có trong giỏ hàng, thêm mới với số lượng 1
        DB::table('gio_hang')->insert([
            'MA_KH' => $maKh,
            'MASP' => $maSp,
            'SO_LUONG_SP' => 1,
        ]);

        return response()->json(['message' => 'Product added to cart with quantity 1']);
    }


    // Loại bỏ giỏ hàng
    // Loại bỏ sản phẩm khỏi giỏ hàng của người dùng
    public function removeCart($maKh, $maSp)
    {
        // Xóa sản phẩm trong giỏ hàng của khách hàng theo MA_KH và MASP
        $deleted = DB::table('gio_hang')
            ->where('MA_KH', $maKh)
            ->where('MASP', $maSp)
            ->delete();

        if ($deleted) {
            return response()->json([
                'message' => 'Product removed from cart successfully',
            ]);
        } else {
            return response()->json([
                'message' => 'Product not found in cart',
            ], 404);
        }
    }

    public function thanhToanCart(Request $request)
    {
        // Lấy dữ liệu đầu vào
        $maKh = $request->input('MA_KH');
        $diaChiShip = $request->input('DIA_CHI_SHIP');
        $sdtLienHe = $request->input('SDT_LIEN_HE_KH');
        $ghiChuHoaDon = $request->input('GHI_CHU_HOA_DON');

        // Lấy dữ liệu giỏ hàng của người dùng
        $cartItems = DB::table('gio_hang')
            ->join('sanpham', 'gio_hang.MASP', '=', 'sanpham.MASP')
            ->where('gio_hang.MA_KH', $maKh)
            ->select('gio_hang.MASP', 'gio_hang.SO_LUONG_SP', 'sanpham.DON_GIA')
            ->get();

        // Kiểm tra nếu giỏ hàng rỗng
        if ($cartItems->isEmpty()) {
            return response()->json([
                'message' => 'No items in the cart to checkout.',
                'info' => $maKh,
            ], 400);
        }

        // Tạo hóa đơn mới
        $maHd = DB::table('hoadon')->insertGetId([
            'MA_KH' => $maKh,
            'DIA_CHI_SHIP' => $diaChiShip,
            'SDT_LIEN_HE_KH' => $sdtLienHe,
            'GHI_CHU_HOA_DON' => $ghiChuHoaDon,

        ]);

        // Thêm chi tiết hóa đơn
        foreach ($cartItems as $item) {
            DB::table('chi_tiet_hoa__on')->insert([
                'MAHD' => $maHd,
                'MASP' => $item->MASP,
                'SO_LUONG' => $item->SO_LUONG_SP,
                'GIAM_GIA' => 0, // Mặc định không giảm giá
                'GHI_CHU_CTHD' => null,

            ]);
        }

        // Xóa tất cả sản phẩm trong giỏ hàng của người dùng
        DB::table('gio_hang')->where('MA_KH', $maKh)->delete();

        return response()->json([
            'message' => 'Checkout completed successfully.',
            'MAHD' => $maHd,
        ]);
    }

}