<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class CustomerController extends Controller
{
    public function updateCustomerInfo(Request $request, $maKh)
    {
        // Lấy dữ liệu đầu vào
        $fieldsToUpdate = $request->only(['TEN_KHACH_HANG', 'SDT_KH', 'DIA_CHI']);

        // Loại bỏ các giá trị null hoặc rỗng
        $fieldsToUpdate = array_filter($fieldsToUpdate, fn($value) => !is_null($value) && $value !== '');

        // Kiểm tra nếu không có trường nào để cập nhật
        if (empty($fieldsToUpdate)) {
            return response()->json([
                'message' => 'No valid fields provided for update.',
            ], 400);
        }

        // Kiểm tra khách hàng có tồn tại hay không
        $customerExists = DB::table('khachhang')->where('MA_KH', $maKh)->exists();

        if (!$customerExists) {
            return response()->json([
                'message' => 'Customer not found.',
            ], 404);
        }

        // Thực hiện cập nhật dữ liệu
        $updated = DB::table('khachhang')
            ->where('MA_KH', $maKh)
            ->update($fieldsToUpdate);

        if ($updated) {
            return response()->json([
                'message' => 'Cập nhật thông tin người dùng thành công.',
                'updatedFields' => $fieldsToUpdate, // Trả về các trường đã được cập nhật
            ]);
        }

        return response()->json([
            'message' => 'Failed to update customer information.',
        ], 500);
    }  
    
    
    public function changePassword(Request $request, $maTk)
    {
        // Lấy dữ liệu từ yêu cầu
        $data = $request->only(['old_password', 'new_password', 'confirm_password']);
    
        // Kiểm tra dữ liệu đầu vào
        if (empty($data['old_password']) || empty($data['new_password']) || empty($data['confirm_password'])) {
            return response()->json([
                'message' => 'Vui lòng điền đầy đủ thông tin.',
            ], 400);
        }
    
        if ($data['new_password'] !== $data['confirm_password']) {
            return response()->json([
                'message' => 'Mật khẩu mới và mật khẩu xác nhận không khớp.',
            ], 400);
        }
    
        // Kiểm tra tài khoản có tồn tại không
        $account = DB::table('tai_khoan')->where('MA_TK', $maTk)->first();
    
        if (!$account) {
            return response()->json([
                'message' => 'Không tìm thấy tài khoản.',
            ], 404);
        }
    
        // Kiểm tra mật khẩu cũ
        if (!Hash::check($data['old_password'], $account->MAT_KHAU)) {
            return response()->json([
                'message' => 'Mật khẩu cũ không chính xác.',
            ], 400);
        }
        
        // Hash mật khẩu mới
        $hashedNewPassword = Hash::make($data['new_password']);
    
        // Cập nhật mật khẩu trong cơ sở dữ liệu
        $updated = DB::table('tai_khoan')
            ->where('MA_TK', $maTk)
            ->update(['MAT_KHAU' => $hashedNewPassword]);
    
        if ($updated) {
            return response()->json([
                'message' => 'Cập nhật mật khẩu thành công.',
            ]);
        }
    
        return response()->json([
            'message' => 'Cập nhật mật khẩu thất bại.',
        ], 500);
    }
    
}
