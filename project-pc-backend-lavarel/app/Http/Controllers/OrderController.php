<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{

    //Đang chờ thanh toán
    public function getPendingOrders($maTk)
    {
        // Truy vấn các đơn hàng có GHI_CHU_HOA_DON là "Đang chờ thanh toán"
        $orders = DB::table('hoadon')
            ->join('chi_tiet_hoa__on', 'hoadon.MAHD', '=', 'chi_tiet_hoa__on.MAHD')
            ->join('sanpham', 'chi_tiet_hoa__on.MASP', '=', 'sanpham.MASP')
            ->join('khachhang', 'hoadon.MA_KH', '=', 'khachhang.MA_KH')
            ->join('tai_khoan', 'khachhang.MA_KH', '=', 'tai_khoan.MA_KH')
            ->join('phan_quyen', 'tai_khoan.MA_PHAN_QUYEN', '=', 'phan_quyen.MA_PHAN_QUYEN')
            ->join('theloai', 'sanpham.MATL', '=', 'theloai.MATL')
            ->select(
                'hoadon.MAHD',
                'hoadon.MA_KH',
                'hoadon.DIA_CHI_SHIP',
                'hoadon.SDT_LIEN_HE_KH',
                'hoadon.GHI_CHU_HOA_DON',
                'chi_tiet_hoa__on.MASP',
                'sanpham.TENSP',
                'sanpham.DON_GIA',
                'sanpham.ANHSP',
                'sanpham.GHI_CHU_SP',
                'chi_tiet_hoa__on.SO_LUONG',
                'chi_tiet_hoa__on.GIAM_GIA',
                'chi_tiet_hoa__on.GHI_CHU_CTHD',
                // Thông tin khách hàng
                'khachhang.MA_KH',
                'khachhang.SDT_KH',
                'khachhang.TEN_KHACH_HANG',
                'khachhang.DIA_CHI',
                'khachhang.GHI_CHU_KH',
                // Thông tin phân quyền
                'phan_quyen.MA_PHAN_QUYEN',
                'phan_quyen.TEN_PHAN_QUYEN',
                'phan_quyen.GHI_CHU_PHAN_QUYEN',
                // Thông tin tài khoản
                'tai_khoan.MA_TK',
                'tai_khoan.MA_PHAN_QUYEN',
                'tai_khoan.MA_KH',
                'tai_khoan.TEN_DANG_NHAP',
                'tai_khoan.MAT_KHAU',
                // Thông tin thể loại
                'theloai.MATL',
                'theloai.TENTL',
                'theloai.MO_TA_TL',
                'theloai.GHI_CHU_TL'
            )
            ->where('hoadon.GHI_CHU_HOA_DON', 'Đang chờ thanh toán')
            ->where('tai_khoan.MA_TK', $maTk)
            ->get();
    
        // Kiểm tra nếu không có đơn hàng nào đang chờ thanh toán
        if ($orders->isEmpty()) {
            return response()->json([
                'message' => 'No pending orders found for this account.',
            ], 404);
        }
    
        // Nhóm các sản phẩm theo MAHD (mã đơn hàng)
        $groupedOrders = $orders->groupBy('MAHD');
    
        // Mỗi đơn hàng sẽ là một đối tượng có danh sách sản phẩm kèm theo
        $result = [];
        foreach ($groupedOrders as $orderId => $orderItems) {
            $order = $orderItems->first(); // Lấy thông tin đơn hàng đầu tiên trong nhóm
    
            // Lấy danh sách sản phẩm trong đơn hàng
            $products = $orderItems->map(function ($item) {
                return [
                    'MASP' => $item->MASP,
                    'TENSP' => $item->TENSP,
                    'DON_GIA' => $item->DON_GIA,
                    'ANHSP' => $item->ANHSP,
                    'GHI_CHU_SP' => $item->GHI_CHU_SP,
                    'SO_LUONG' => $item->SO_LUONG,
                    'GIAM_GIA' => $item->GIAM_GIA,
                    'GHI_CHU_CTHD' => $item->GHI_CHU_CTHD,
                ];
            });
    
            // Tạo đối tượng đơn hàng kèm theo danh sách sản phẩm
            $result[] = [
                'MAHD' => $order->MAHD,
                'MA_KH' => $order->MA_KH,
                'DIA_CHI_SHIP' => $order->DIA_CHI_SHIP,
                'SDT_LIEN_HE_KH' => $order->SDT_LIEN_HE_KH,
                'GHI_CHU_HOA_DON' => $order->GHI_CHU_HOA_DON,
                'products' => $products,
                'TEN_KHACH_HANG' => $order->TEN_KHACH_HANG,
                'DIA_CHI' => $order->DIA_CHI,
                'SDT_KH' => $order->SDT_KH,
                'GHI_CHU_KH' => $order->GHI_CHU_KH,
                'TEN_DANG_NHAP' => $order->TEN_DANG_NHAP,
            ];
        }
    
        // Trả về thông tin đơn hàng và các sản phẩm
        return response()->json([
            'message' => 'Pending orders retrieved successfully for the given account.',
            'data' => $result,
        ]);
    }
    
 //Đơn thanh toán thành công
 public function getSuccessOrders($maTk)
 {
     // Truy vấn các đơn hàng có GHI_CHU_HOA_DON là "Đang chờ thanh toán"
     $orders = DB::table('hoadon')
         ->join('chi_tiet_hoa__on', 'hoadon.MAHD', '=', 'chi_tiet_hoa__on.MAHD')
         ->join('sanpham', 'chi_tiet_hoa__on.MASP', '=', 'sanpham.MASP')
         ->join('khachhang', 'hoadon.MA_KH', '=', 'khachhang.MA_KH')
         ->join('tai_khoan', 'khachhang.MA_KH', '=', 'tai_khoan.MA_KH')
         ->join('phan_quyen', 'tai_khoan.MA_PHAN_QUYEN', '=', 'phan_quyen.MA_PHAN_QUYEN')
         ->join('theloai', 'sanpham.MATL', '=', 'theloai.MATL')
         ->select(
             'hoadon.MAHD',
             'hoadon.MA_KH',
             'hoadon.DIA_CHI_SHIP',
             'hoadon.SDT_LIEN_HE_KH',
             'hoadon.GHI_CHU_HOA_DON',
             'chi_tiet_hoa__on.MASP',
             'sanpham.TENSP',
             'sanpham.DON_GIA',
             'sanpham.ANHSP',
             'sanpham.GHI_CHU_SP',
             'chi_tiet_hoa__on.SO_LUONG',
             'chi_tiet_hoa__on.GIAM_GIA',
             'chi_tiet_hoa__on.GHI_CHU_CTHD',
             // Thông tin khách hàng
             'khachhang.MA_KH',
             'khachhang.SDT_KH',
             'khachhang.TEN_KHACH_HANG',
             'khachhang.DIA_CHI',
             'khachhang.GHI_CHU_KH',
             // Thông tin phân quyền
             'phan_quyen.MA_PHAN_QUYEN',
             'phan_quyen.TEN_PHAN_QUYEN',
             'phan_quyen.GHI_CHU_PHAN_QUYEN',
             // Thông tin tài khoản
             'tai_khoan.MA_TK',
             'tai_khoan.MA_PHAN_QUYEN',
             'tai_khoan.MA_KH',
             'tai_khoan.TEN_DANG_NHAP',
             'tai_khoan.MAT_KHAU',
             // Thông tin thể loại
             'theloai.MATL',
             'theloai.TENTL',
             'theloai.MO_TA_TL',
             'theloai.GHI_CHU_TL'
         )
         ->where('hoadon.GHI_CHU_HOA_DON', 'Đơn thanh toán thành công')
         ->where('tai_khoan.MA_TK', $maTk)
         ->get();
 
     // Kiểm tra nếu không có đơn hàng nào đang chờ thanh toán
     if ($orders->isEmpty()) {
         return response()->json([
             'message' => 'No pending orders found for this account.',
         ], 404);
     }
 
     // Nhóm các sản phẩm theo MAHD (mã đơn hàng)
     $groupedOrders = $orders->groupBy('MAHD');
 
     // Mỗi đơn hàng sẽ là một đối tượng có danh sách sản phẩm kèm theo
     $result = [];
     foreach ($groupedOrders as $orderId => $orderItems) {
         $order = $orderItems->first(); // Lấy thông tin đơn hàng đầu tiên trong nhóm
 
         // Lấy danh sách sản phẩm trong đơn hàng
         $products = $orderItems->map(function ($item) {
             return [
                 'MASP' => $item->MASP,
                 'TENSP' => $item->TENSP,
                 'DON_GIA' => $item->DON_GIA,
                 'ANHSP' => $item->ANHSP,
                 'GHI_CHU_SP' => $item->GHI_CHU_SP,
                 'SO_LUONG' => $item->SO_LUONG,
                 'GIAM_GIA' => $item->GIAM_GIA,
                 'GHI_CHU_CTHD' => $item->GHI_CHU_CTHD,
             ];
         });
 
         // Tạo đối tượng đơn hàng kèm theo danh sách sản phẩm
         $result[] = [
             'MAHD' => $order->MAHD,
             'MA_KH' => $order->MA_KH,
             'DIA_CHI_SHIP' => $order->DIA_CHI_SHIP,
             'SDT_LIEN_HE_KH' => $order->SDT_LIEN_HE_KH,
             'GHI_CHU_HOA_DON' => $order->GHI_CHU_HOA_DON,
             'products' => $products,
             'TEN_KHACH_HANG' => $order->TEN_KHACH_HANG,
             'DIA_CHI' => $order->DIA_CHI,
             'SDT_KH' => $order->SDT_KH,
             'GHI_CHU_KH' => $order->GHI_CHU_KH,
             'TEN_DANG_NHAP' => $order->TEN_DANG_NHAP,
         ];
     }
 
     // Trả về thông tin đơn hàng và các sản phẩm
     return response()->json([
         'message' => 'Pending orders retrieved successfully for the given account.',
         'data' => $result,
     ]);
 }


  //Đơn hàng đã hủy
  public function getCancelOrders($maTk)
  {
      // Truy vấn các đơn hàng có GHI_CHU_HOA_DON là "Đang chờ thanh toán"
      $orders = DB::table('hoadon')
          ->join('chi_tiet_hoa__on', 'hoadon.MAHD', '=', 'chi_tiet_hoa__on.MAHD')
          ->join('sanpham', 'chi_tiet_hoa__on.MASP', '=', 'sanpham.MASP')
          ->join('khachhang', 'hoadon.MA_KH', '=', 'khachhang.MA_KH')
          ->join('tai_khoan', 'khachhang.MA_KH', '=', 'tai_khoan.MA_KH')
          ->join('phan_quyen', 'tai_khoan.MA_PHAN_QUYEN', '=', 'phan_quyen.MA_PHAN_QUYEN')
          ->join('theloai', 'sanpham.MATL', '=', 'theloai.MATL')
          ->select(
              'hoadon.MAHD',
              'hoadon.MA_KH',
              'hoadon.DIA_CHI_SHIP',
              'hoadon.SDT_LIEN_HE_KH',
              'hoadon.GHI_CHU_HOA_DON',
              'chi_tiet_hoa__on.MASP',
              'sanpham.TENSP',
              'sanpham.DON_GIA',
              'sanpham.ANHSP',
              'sanpham.GHI_CHU_SP',
              'chi_tiet_hoa__on.SO_LUONG',
              'chi_tiet_hoa__on.GIAM_GIA',
              'chi_tiet_hoa__on.GHI_CHU_CTHD',
              // Thông tin khách hàng
              'khachhang.MA_KH',
              'khachhang.SDT_KH',
              'khachhang.TEN_KHACH_HANG',
              'khachhang.DIA_CHI',
              'khachhang.GHI_CHU_KH',
              // Thông tin phân quyền
              'phan_quyen.MA_PHAN_QUYEN',
              'phan_quyen.TEN_PHAN_QUYEN',
              'phan_quyen.GHI_CHU_PHAN_QUYEN',
              // Thông tin tài khoản
              'tai_khoan.MA_TK',
              'tai_khoan.MA_PHAN_QUYEN',
              'tai_khoan.MA_KH',
              'tai_khoan.TEN_DANG_NHAP',
              'tai_khoan.MAT_KHAU',
              // Thông tin thể loại
              'theloai.MATL',
              'theloai.TENTL',
              'theloai.MO_TA_TL',
              'theloai.GHI_CHU_TL'
          )
          ->where('hoadon.GHI_CHU_HOA_DON', 'Đơn hàng đã hủy')
          ->where('tai_khoan.MA_TK', $maTk)
          ->get();
  
      // Kiểm tra nếu không có đơn hàng nào đang chờ thanh toán
      if ($orders->isEmpty()) {
          return response()->json([
              'message' => 'No pending orders found for this account.',
          ], 404);
      }
  
      // Nhóm các sản phẩm theo MAHD (mã đơn hàng)
      $groupedOrders = $orders->groupBy('MAHD');
  
      // Mỗi đơn hàng sẽ là một đối tượng có danh sách sản phẩm kèm theo
      $result = [];
      foreach ($groupedOrders as $orderId => $orderItems) {
          $order = $orderItems->first(); // Lấy thông tin đơn hàng đầu tiên trong nhóm
  
          // Lấy danh sách sản phẩm trong đơn hàng
          $products = $orderItems->map(function ($item) {
              return [
                  'MASP' => $item->MASP,
                  'TENSP' => $item->TENSP,
                  'DON_GIA' => $item->DON_GIA,
                  'ANHSP' => $item->ANHSP,
                  'GHI_CHU_SP' => $item->GHI_CHU_SP,
                  'SO_LUONG' => $item->SO_LUONG,
                  'GIAM_GIA' => $item->GIAM_GIA,
                  'GHI_CHU_CTHD' => $item->GHI_CHU_CTHD,
              ];
          });
  
          // Tạo đối tượng đơn hàng kèm theo danh sách sản phẩm
          $result[] = [
              'MAHD' => $order->MAHD,
              'MA_KH' => $order->MA_KH,
              'DIA_CHI_SHIP' => $order->DIA_CHI_SHIP,
              'SDT_LIEN_HE_KH' => $order->SDT_LIEN_HE_KH,
              'GHI_CHU_HOA_DON' => $order->GHI_CHU_HOA_DON,
              'products' => $products,
              'TEN_KHACH_HANG' => $order->TEN_KHACH_HANG,
              'DIA_CHI' => $order->DIA_CHI,
              'SDT_KH' => $order->SDT_KH,
              'GHI_CHU_KH' => $order->GHI_CHU_KH,
              'TEN_DANG_NHAP' => $order->TEN_DANG_NHAP,
          ];
      }
  
      // Trả về thông tin đơn hàng và các sản phẩm
      return response()->json([
          'message' => 'Pending orders retrieved successfully for the given account.',
          'data' => $result,
      ]);
  }
  //Lấy tất cả đơn hàng của 1 người dùng
  public function getAllOrders($maTk)
  {
      // Truy vấn các đơn hàng có GHI_CHU_HOA_DON là "Đang chờ thanh toán"
      $orders = DB::table('hoadon')
          ->join('chi_tiet_hoa__on', 'hoadon.MAHD', '=', 'chi_tiet_hoa__on.MAHD')
          ->join('sanpham', 'chi_tiet_hoa__on.MASP', '=', 'sanpham.MASP')
          ->join('khachhang', 'hoadon.MA_KH', '=', 'khachhang.MA_KH')
          ->join('tai_khoan', 'khachhang.MA_KH', '=', 'tai_khoan.MA_KH')
          ->join('phan_quyen', 'tai_khoan.MA_PHAN_QUYEN', '=', 'phan_quyen.MA_PHAN_QUYEN')
          ->join('theloai', 'sanpham.MATL', '=', 'theloai.MATL')
          ->select(
              'hoadon.MAHD',
              'hoadon.MA_KH',
              'hoadon.DIA_CHI_SHIP',
              'hoadon.SDT_LIEN_HE_KH',
              'hoadon.GHI_CHU_HOA_DON',
              'chi_tiet_hoa__on.MASP',
              'sanpham.TENSP',
              'sanpham.DON_GIA',
              'sanpham.ANHSP',
              'sanpham.GHI_CHU_SP',
              'chi_tiet_hoa__on.SO_LUONG',
              'chi_tiet_hoa__on.GIAM_GIA',
              'chi_tiet_hoa__on.GHI_CHU_CTHD',
              // Thông tin khách hàng
              'khachhang.MA_KH',
              'khachhang.SDT_KH',
              'khachhang.TEN_KHACH_HANG',
              'khachhang.DIA_CHI',
              'khachhang.GHI_CHU_KH',
              // Thông tin phân quyền
              'phan_quyen.MA_PHAN_QUYEN',
              'phan_quyen.TEN_PHAN_QUYEN',
              'phan_quyen.GHI_CHU_PHAN_QUYEN',
              // Thông tin tài khoản
              'tai_khoan.MA_TK',
              'tai_khoan.MA_PHAN_QUYEN',
              'tai_khoan.MA_KH',
              'tai_khoan.TEN_DANG_NHAP',
              'tai_khoan.MAT_KHAU',
              // Thông tin thể loại
              'theloai.MATL',
              'theloai.TENTL',
              'theloai.MO_TA_TL',
              'theloai.GHI_CHU_TL'
          )
      
          ->where('tai_khoan.MA_TK', $maTk)
          ->get();
  
      // Kiểm tra nếu không có đơn hàng nào đang chờ thanh toán
      if ($orders->isEmpty()) {
          return response()->json([
              'message' => 'No pending orders found for this account.',
          ], 404);
      }
  
      // Nhóm các sản phẩm theo MAHD (mã đơn hàng)
      $groupedOrders = $orders->groupBy('MAHD');
  
      // Mỗi đơn hàng sẽ là một đối tượng có danh sách sản phẩm kèm theo
      $result = [];
      foreach ($groupedOrders as $orderId => $orderItems) {
          $order = $orderItems->first(); // Lấy thông tin đơn hàng đầu tiên trong nhóm
  
          // Lấy danh sách sản phẩm trong đơn hàng
          $products = $orderItems->map(function ($item) {
              return [
                  'MASP' => $item->MASP,
                  'TENSP' => $item->TENSP,
                  'DON_GIA' => $item->DON_GIA,
                  'ANHSP' => $item->ANHSP,
                  'GHI_CHU_SP' => $item->GHI_CHU_SP,
                  'SO_LUONG' => $item->SO_LUONG,
                  'GIAM_GIA' => $item->GIAM_GIA,
                  'GHI_CHU_CTHD' => $item->GHI_CHU_CTHD,
              ];
          });
  
          // Tạo đối tượng đơn hàng kèm theo danh sách sản phẩm
          $result[] = [
              'MAHD' => $order->MAHD,
              'MA_KH' => $order->MA_KH,
              'DIA_CHI_SHIP' => $order->DIA_CHI_SHIP,
              'SDT_LIEN_HE_KH' => $order->SDT_LIEN_HE_KH,
              'GHI_CHU_HOA_DON' => $order->GHI_CHU_HOA_DON,
              'products' => $products,
              'TEN_KHACH_HANG' => $order->TEN_KHACH_HANG,
              'DIA_CHI' => $order->DIA_CHI,
              'SDT_KH' => $order->SDT_KH,
              'GHI_CHU_KH' => $order->GHI_CHU_KH,
              'TEN_DANG_NHAP' => $order->TEN_DANG_NHAP,
          ];
      }
  
      // Trả về thông tin đơn hàng và các sản phẩm
      return response()->json([
          'message' => 'Pending orders retrieved successfully for the given account.',
          'data' => $result,
      ]);
  }



  
}




