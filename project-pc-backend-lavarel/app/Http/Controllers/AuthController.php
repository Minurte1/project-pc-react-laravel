<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use \Firebase\JWT\JWT;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'TEN_KHACH_HANG' => 'required|string|max:255',
            'DIA_CHI' => 'nullable|string|max:255',
            'GHI_CHU_KH' => 'nullable|string',
            'TEN_DANG_NHAP' => 'required|string|unique:tai_khoan,TEN_DANG_NHAP|max:255',
            'MAT_KHAU' => 'required|string',
            'MA_PHAN_QUYEN' => 'required|integer',
            'SDT_KH' => 'nullable|string|max:20|regex:/^[0-9]{10,20}$/',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        DB::beginTransaction();

        try {
            $MA_KH = DB::table('khachhang')->insertGetId([
                'TEN_KHACH_HANG' => $request->TEN_KHACH_HANG,
                'DIA_CHI' => $request->DIA_CHI,
                'GHI_CHU_KH' => $request->GHI_CHU_KH,
                'SDT_KH' => $request->SDT_KH,
            ]);

            DB::table('tai_khoan')->insert([
                'MA_PHAN_QUYEN' => $request->MA_PHAN_QUYEN,
                'MA_KH' => $MA_KH,
                'TEN_DANG_NHAP' => $request->TEN_DANG_NHAP,
                'MAT_KHAU' => Hash::make($request->MAT_KHAU),
            ]);

            DB::commit();

            return response()->json(['message' => 'Đăng ký thành công'], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Đã xảy ra lỗi trong quá trình đăng ký'], 500);
        }
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = DB::table('tai_khoan')->where('TEN_DANG_NHAP', $request->email)->first();

        // Kiểm tra thông tin tài khoản và mật khẩu
        if (!$user || !Hash::check($request->password, $user->MAT_KHAU)) {
            return response()->json(['error' => 'Thông tin đăng nhập không đúng'], 401);
        }

        $userDetails = DB::table('tai_khoan')
            ->join('phan_quyen', 'tai_khoan.MA_PHAN_QUYEN', '=', 'phan_quyen.MA_PHAN_QUYEN')
            ->join('khachhang', 'tai_khoan.MA_KH', '=', 'khachhang.MA_KH')
            ->where('tai_khoan.MA_TK', $user->MA_TK)
            ->select(
                'tai_khoan.MA_TK',
                'tai_khoan.TEN_DANG_NHAP',
                'phan_quyen.TEN_PHAN_QUYEN',
                'khachhang.TEN_KHACH_HANG',
                'khachhang.SDT_KH',
                'khachhang.DIA_CHI'
            )
            ->first();

        // Kiểm tra nếu không có thông tin người dùng
        if (!$userDetails) {
            return response()->json(['error' => 'Không tìm thấy thông tin người dùng'], 404);
        }

        $tokenPayload = [
            'MA_TK' => $userDetails->MA_TK,
            'TEN_DANG_NHAP' => $userDetails->TEN_DANG_NHAP,
            'TEN_PHAN_QUYEN' => $userDetails->TEN_PHAN_QUYEN,
            'TEN_KHACH_HANG' => $userDetails->TEN_KHACH_HANG,
            'SDT_KH' => $userDetails->SDT_KH,
            'DIA_CHI' => $userDetails->DIA_CHI,
            'iat' => time(),
            'exp' => time() + env('JWT_EXPIRATION', 36000), // Lấy từ biến môi trường, mặc định 10 giờ
        ];

        $key = env('JWT_SECRET', 'BaoVipPro');

        $jwt = JWT::encode($tokenPayload, $key, 'HS256');

        return response()->json(['token' => $jwt], 200);
    }

    public function loginGoogle(Request $request)
    {
        $email = $request->email;

        // Kiểm tra xem email đã có trong hệ thống chưa
        $user = DB::table('tai_khoan')->where('TEN_DANG_NHAP', $email)->first();

        // Nếu chưa có tài khoản, tạo mới khách hàng và tài khoản
        if (!$user) {
            DB::beginTransaction();
            try {
                // Tạo mới khách hàng
                $khachHangId = DB::table('khachhang')->insertGetId([
                    'SDT_KH' => null, // Bạn có thể thêm thông tin từ Google nếu cần
                    'TEN_KHACH_HANG' => $email,
                    'DIA_CHI' => null, // Cũng có thể thêm từ Google nếu cần
                    'GHI_CHU_KH' => 'Khách hàng đăng nhập qua Google',
                ]);

                // Tạo mới tài khoản
                $taiKhoanId = DB::table('tai_khoan')->insertGetId([
                    'MA_PHAN_QUYEN' => 2, // Quyền mặc định là 2 cho khách hàng
                    'MA_KH' => $khachHangId,
                    'TEN_DANG_NHAP' => $email,
                    'MAT_KHAU' => Hash::make($email), // Tạo mật khẩu tạm
                ]);

                DB::commit();
            } catch (\Exception $e) {
                DB::rollBack();
                return response()->json([
                    'error' => 'Đã xảy ra lỗi khi tạo tài khoản!',
                    'message' => $e->getMessage(),
                ], 500);
            }
        } else {
            // Nếu tài khoản đã tồn tại, lấy thông tin người dùng
            $user = DB::table('tai_khoan')
                ->join('phan_quyen', 'tai_khoan.MA_PHAN_QUYEN', '=', 'phan_quyen.MA_PHAN_QUYEN')
                ->join('khachhang', 'tai_khoan.MA_KH', '=', 'khachhang.MA_KH')
                ->where('tai_khoan.TEN_DANG_NHAP', $email)
                ->select(
                    'tai_khoan.MA_TK',
                    'tai_khoan.TEN_DANG_NHAP',
                    'phan_quyen.TEN_PHAN_QUYEN',
                    'khachhang.TEN_KHACH_HANG',
                    'khachhang.SDT_KH',
                    'khachhang.DIA_CHI'
                )
                ->first();
        }

        // Tạo JWT token
        $tokenPayload = [
            'MA_TK' => $user->MA_TK,
            'TEN_DANG_NHAP' => $user->TEN_DANG_NHAP,
            'TEN_PHAN_QUYEN' => $user->TEN_PHAN_QUYEN,
            'TEN_KHACH_HANG' => $user->TEN_KHACH_HANG,
            'SDT_KH' => $user->SDT_KH,
            'DIA_CHI' => $user->DIA_CHI,
            'iat' => time(),
            'exp' => time() + env('JWT_EXPIRATION', 36000), // Lấy từ biến môi trường, mặc định 10 giờ
        ];

        $key = env('JWT_SECRET', 'BaoVipPro');
        $jwt = JWT::encode($tokenPayload, $key, 'HS256');

        return response()->json(['token' => $jwt], 200);
    }






}