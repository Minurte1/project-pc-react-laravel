<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    public function getListPhanQuyen()
    {
        // Truy vấn dữ liệu giỏ hàng của 1 người dùng
        $listPhanQuyen = DB::select("
        SELECT * FROM phan_quyen
        ", );

        // Nếu không có sản phẩm nào trong giỏ hàng, trả về mảng rỗng và tổng số tiền = 0
        if (empty($listPhanQuyen)) {
            return response()->json([
                'message' => 'Không tìm thấy phân quyền.',
                'data' => [],
            ]);
        }

        // Trả về dữ liệu giỏ hàng và tổng số tiền
        return response()->json([
            'message' => 'ok',
            'data' => $listPhanQuyen
        ]);
    }

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

    public function createUser(Request $request)
    {
        // Validate dữ liệu đầu vào
        $request->validate([
            'TEN_KHACH_HANG' => 'required|string|max:255',
            'SDT_KH' => 'required|string|max:15',
            'DIA_CHI' => 'nullable|string|max:500',
            'GHI_CHU_KH' => 'nullable|string|max:500',
            'TEN_DANG_NHAP' => 'required|string|max:255|unique:tai_khoan,TEN_DANG_NHAP',
            'MAT_KHAU' => 'required|string|min:6',
            'MA_PHAN_QUYEN' => 'required|integer',
        ]);

        try {
            // Bắt đầu transaction để đảm bảo tính toàn vẹn dữ liệu
            DB::beginTransaction();

            // Thêm mới khách hàng vào bảng khachhang
            $maKhachHang = DB::table('khachhang')->insertGetId([
                'TEN_KHACH_HANG' => $request->TEN_KHACH_HANG,
                'SDT_KH' => $request->SDT_KH,
                'DIA_CHI' => $request->DIA_CHI,
                'GHI_CHU_KH' => $request->GHI_CHU_KH,
            ]);

            // Thêm tài khoản sử dụng mã khách hàng vừa tạo
            $taiKhoan = DB::table('tai_khoan')->insert([
                'TEN_DANG_NHAP' => $request->TEN_DANG_NHAP,
                'MAT_KHAU' => bcrypt($request->MAT_KHAU), // Mã hóa mật khẩu
                'MA_PHAN_QUYEN' => $request->MA_PHAN_QUYEN,
                'MA_KH' => $maKhachHang,
            ]);

            // Commit transaction nếu không có lỗi
            DB::commit();

            return response()->json([
                'message' => 'Thêm khách hàng và tài khoản thành công!',
                'data' => [
                    'khachhang' => [
                        'MA_KH' => $maKhachHang,
                        'TEN_KHACH_HANG' => $request->TEN_KHACH_HANG,
                        'SDT_KH' => $request->SDT_KH,
                        'DIA_CHI' => $request->DIA_CHI,
                        'GHI_CHU_KH' => $request->GHI_CHU_KH,
                    ],
                    'taikhoan' => [
                        'TEN_DANG_NHAP' => $request->TEN_DANG_NHAP,
                        'MA_PHAN_QUYEN' => $request->MA_PHAN_QUYEN,
                    ],
                ],
            ]);
        } catch (\Exception $e) {
            // Rollback transaction nếu có lỗi
            DB::rollBack();

            return response()->json([
                'message' => 'Đã xảy ra lỗi khi thêm khách hàng và tài khoản.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function updateUser(Request $request, $maKhachHang)
    {
        // Validate dữ liệu đầu vào
        $request->validate([
            'TEN_KHACH_HANG' => 'required|string|max:255',
            'SDT_KH' => 'required|string|max:15',
            'DIA_CHI' => 'nullable|string|max:500',
            'GHI_CHU_KH' => 'nullable|string|max:500',
            'TEN_DANG_NHAP' => 'required|string|max:255|unique:tai_khoan,TEN_DANG_NHAP,' . $maKhachHang . ',MA_KH',
            'MAT_KHAU' => 'nullable|string|min:6',
            'MA_PHAN_QUYEN' => 'required|integer',
        ]);

        try {
            // Bắt đầu transaction để đảm bảo tính toàn vẹn dữ liệu
            DB::beginTransaction();

            // Cập nhật thông tin khách hàng trong bảng khachhang
            DB::table('khachhang')->where('MA_KH', $maKhachHang)->update([
                'TEN_KHACH_HANG' => $request->TEN_KHACH_HANG,
                'SDT_KH' => $request->SDT_KH,
                'DIA_CHI' => $request->DIA_CHI,
                'GHI_CHU_KH' => $request->GHI_CHU_KH,
            ]);

            // Chuẩn bị dữ liệu để cập nhật tài khoản
            $taiKhoanData = [
                'TEN_DANG_NHAP' => $request->TEN_DANG_NHAP,
                'MA_PHAN_QUYEN' => $request->MA_PHAN_QUYEN,
            ];

            // Nếu mật khẩu được cung cấp, mã hóa và thêm vào dữ liệu cập nhật
            if (!empty($request->MAT_KHAU)) {
                $taiKhoanData['MAT_KHAU'] = bcrypt($request->MAT_KHAU);
            }

            // Cập nhật thông tin tài khoản trong bảng tai_khoan
            DB::table('tai_khoan')->where('MA_KH', $maKhachHang)->update($taiKhoanData);

            // Commit transaction nếu không có lỗi
            DB::commit();

            return response()->json([
                'message' => 'Cập nhật khách hàng và tài khoản thành công!',
                'data' => [
                    'khachhang' => [
                        'MA_KH' => $maKhachHang,
                        'TEN_KHACH_HANG' => $request->TEN_KHACH_HANG,
                        'SDT_KH' => $request->SDT_KH,
                        'DIA_CHI' => $request->DIA_CHI,
                        'GHI_CHU_KH' => $request->GHI_CHU_KH,
                    ],
                    'taikhoan' => [
                        'TEN_DANG_NHAP' => $request->TEN_DANG_NHAP,
                        'MA_PHAN_QUYEN' => $request->MA_PHAN_QUYEN,
                    ],
                ],
            ]);
        } catch (\Exception $e) {
            // Rollback transaction nếu có lỗi
            DB::rollBack();

            return response()->json([
                'message' => 'Đã xảy ra lỗi khi cập nhật khách hàng và tài khoản.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function deleteUser($maKhachHang)
    {
        try {
            // Kiểm tra xem khách hàng có hóa đơn hay không
            $hoaDon = DB::table('hoadon')->where('MA_KH', $maKhachHang)->exists();

            if ($hoaDon) {
                return response()->json([
                    'message' => 'Không thể xóa khách hàng này vì đã có hóa đơn liên quan.',
                ]);
            }

            // Bắt đầu transaction để đảm bảo tính toàn vẹn dữ liệu
            DB::beginTransaction();

            // Xóa giỏ hàng liên quan đến khách hàng nếu có
            DB::table('gio_hang')->where('MA_KH', $maKhachHang)->delete();

            // Xóa tài khoản liên quan đến khách hàng
            DB::table('tai_khoan')->where('MA_KH', $maKhachHang)->delete();

            // Xóa khách hàng
            DB::table('khachhang')->where('MA_KH', $maKhachHang)->delete();

            // Commit transaction nếu không có lỗi
            DB::commit();

            return response()->json([
                'message' => 'Xóa khách hàng và các dữ liệu liên quan thành công!',
            ]);
        } catch (\Exception $e) {
            // Rollback transaction nếu có lỗi
            DB::rollBack();

            return response()->json([
                'message' => 'Đã xảy ra lỗi khi xóa khách hàng.',
                'error' => $e->getMessage(),
            ], 500); // Trả về lỗi 500 (Internal Server Error)
        }
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

    public function createTheLoai(Request $request)
    {
        // Validate dữ liệu đầu vào
        $request->validate([
            'TENTL' => 'required|string|max:255',
            'MO_TA_TL' => 'nullable|string|max:500',
            'GHI_CHU_TL' => 'nullable|string|max:500',
        ]);

        // Thêm thể loại mới vào bảng 'theloai'
        try {
            $theLoai = DB::table('theloai')->insert([
                'TENTL' => $request->TENTL,
                'MO_TA_TL' => $request->MO_TA_TL,
                'GHI_CHU_TL' => $request->GHI_CHU_TL,
            ]);

            // Trả về thông báo thành công
            return response()->json([
                'message' => 'Thêm thể loại mới thành công!',
                'data' => $theLoai,
            ]);
        } catch (\Exception $e) {
            // Nếu có lỗi, trả về thông báo lỗi
            return response()->json([
                'message' => 'Đã xảy ra lỗi khi thêm thể loại. Vui lòng thử lại.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function updateTheLoai(Request $request, $MATL)
    {
        // Validate dữ liệu đầu vào
        $request->validate([
            'TENTL' => 'required|string|max:255',
            'MO_TA_TL' => 'nullable|string|max:500',
            'GHI_CHU_TL' => 'nullable|string|max:500',
        ]);

        try {
            // Kiểm tra xem thể loại có tồn tại trong cơ sở dữ liệu không
            $theLoai = DB::table('theloai')->where('MATL', $MATL)->first();

            if (!$theLoai) {
                return response()->json([
                    'message' => 'Không tìm thấy thể loại với mã này.',
                ], 404);
            }

            // Cập nhật thể loại trong bảng 'theloai'
            DB::table('theloai')->where('MATL', $MATL)->update([
                'TENTL' => $request->TENTL,
                'MO_TA_TL' => $request->MO_TA_TL,
                'GHI_CHU_TL' => $request->GHI_CHU_TL,
            ]);

            // Trả về thông báo thành công
            return response()->json([
                'message' => 'Cập nhật thể loại thành công!',
            ]);
        } catch (\Exception $e) {
            // Nếu có lỗi, trả về thông báo lỗi
            return response()->json([
                'message' => 'Đã xảy ra lỗi khi cập nhật thể loại. Vui lòng thử lại.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function deleteTheLoai($MATL)
    {
        try {
            // Kiểm tra xem thể loại có tồn tại trong cơ sở dữ liệu không
            $theLoai = DB::table('theloai')->where('MATL', $MATL)->first();

            if (!$theLoai) {
                return response()->json([
                    'message' => 'Không tìm thấy thể loại với mã này.',
                ], 404);
            }

            // Kiểm tra xem có sản phẩm nào tham chiếu đến thể loại này không
            $products = DB::table('sanpham')->where('MATL', $MATL)->exists();

            if ($products) {
                // Nếu có sản phẩm tham chiếu, không cho phép xóa thể loại
                return response()->json([
                    'message' => 'Không thể xóa thể loại vì có sản phẩm tham chiếu đến nó.',
                    'data' => $products,
                ]);
            }

            // Xóa thể loại trong bảng 'theloai'
            DB::table('theloai')->where('MATL', $MATL)->delete();

            // Trả về thông báo thành công
            return response()->json([
                'message' => 'Xóa thể loại thành công!',
            ]);
        } catch (\Exception $e) {
            // Nếu có lỗi, trả về thông báo lỗi
            return response()->json([
                'message' => 'Đã xảy ra lỗi khi xóa thể loại. Vui lòng thử lại.',
                'error' => $e->getMessage(),
            ], 500);
        }
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

    public function updateSanPham(Request $request, $id)
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
                'ANHSP' => 'sometimes|file|image|mimes:jpeg,png,jpg,gif|max:2048',
                'GHI_CHU_SP' => 'nullable|string',
            ]);

            // Tìm sản phẩm
            $sanPham = DB::table('sanpham')->where('MASP', $id)->first();
            if (!$sanPham) {
                return response()->json(['message' => 'Sản phẩm không tồn tại'], 404);
            }

            // Xử lý ảnh mới nếu có
            if ($request->hasFile('ANHSP')) {
                $file = $request->file('ANHSP');
                $fileName = time() . '_' . $file->getClientOriginalName();
                $file->move(public_path('images'), $fileName);

                // Xóa ảnh cũ nếu cần
                if ($sanPham->ANHSP && file_exists(public_path('images/' . $sanPham->ANHSP))) {
                    unlink(public_path('images/' . $sanPham->ANHSP));
                }

                $validatedData['ANHSP'] = $fileName;
            } else {
                $validatedData['ANHSP'] = $sanPham->ANHSP; // Giữ nguyên ảnh cũ nếu không có ảnh mới
            }

            // Cập nhật sản phẩm vào cơ sở dữ liệu
            DB::table('sanpham')
                ->where('MASP', $id)
                ->update([
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
                    'ANHSP' => $validatedData['ANHSP'],
                    'GHI_CHU_SP' => $validatedData['GHI_CHU_SP'],
                ]);

            return response()->json([
                'message' => 'Cập nhật sản phẩm thành công!',
                'data' => $validatedData,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Có lỗi xảy ra: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function deleteSanPham($id)
    {
        try {
            // Tìm sản phẩm
            $sanPham = DB::table('sanpham')->where('MASP', $id)->first();
            if (!$sanPham) {
                return response()->json(['message' => 'Sản phẩm không tồn tại'], 404);
            }

            // Xoá ảnh sản phẩm nếu tồn tại
            if ($sanPham->ANHSP && file_exists(public_path('images/' . $sanPham->ANHSP))) {
                unlink(public_path('images/' . $sanPham->ANHSP));
            }

            // Xoá sản phẩm khỏi cơ sở dữ liệu
            DB::table('sanpham')->where('MASP', $id)->delete();

            return response()->json(['message' => 'Xoá sản phẩm thành công!']);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Có lỗi xảy ra: ' . $e->getMessage(),
            ], 500);
        }
    }

}