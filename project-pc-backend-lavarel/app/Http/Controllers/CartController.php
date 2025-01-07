<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CartController extends Controller
{
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
            return response()->json(['message' => 'Product not found in cart'], 404);
        }
    
        // Tính toán số lượng mới
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
    public function removeCart($maKh)
    {
        // Xóa tất cả sản phẩm trong giỏ hàng của khách hàng
        DB::table('gio_hang')
            ->where('MA_KH', $maKh)
            ->delete();

        return response()->json([
            'message' => 'Cart removed successfully',
        ]);
    }
}
