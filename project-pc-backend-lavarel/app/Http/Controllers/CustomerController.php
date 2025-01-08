<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
}
