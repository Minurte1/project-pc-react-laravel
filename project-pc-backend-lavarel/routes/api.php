<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\OrderController;

// Route cho API /hello
Route::get('/hello', [PostController::class, 'show']);

Route::get('/image/{filename}', [PostController::class, 'getImage']);
Route::get('/sanpham', [PostController::class, 'getAllSanPham']);
Route::get('/khachhang', [PostController::class, 'getKhachHang']);
Route::get('/khachhang/{id}', [PostController::class, 'getUserById']);
Route::get('/sanpham/{id}', [PostController::class, 'getSanPhamById']);
Route::get('/sanpham/slider', [PostController::class, 'getSanPhamSlider']);
Route::get('/sanphamDesktop', [PostController::class, 'getSanPhamDesktop']);
Route::get('/sanphamApple', [PostController::class, 'getSanPhamApple']);
Route::get('/sanphamASUS', [PostController::class, 'getSanPhamASUS']);
Route::post('/create-hoadon', [PostController::class, 'createHoaDon']);
Route::post('/create-user', [PostController::class, 'createNewUser']);
Route::put('/update-sanpham', [PostController::class, 'updateSanPham']);
Route::delete('/delete-user/{id}', [PostController::class, 'deleteUser']);
Route::get('/', [PostController::class, 'getHomePage']);
Route::get('/thong-ke', [PostController::class, 'getThongKe']);
Route::post('/tim', [PostController::class, 'postHomePage']);
Route::get('/them-san-pham', [PostController::class, 'getThemSanPhamPage']);
Route::post('/them-san-pham', [PostController::class, 'themSanPham']);
Route::get('/edit-san-pham/{id}', [PostController::class, 'getEditPage']);
Route::post('/update-san-pham', [PostController::class, 'postUpdateSanPham']);
Route::delete('/delete-san-pham/{id}', [PostController::class, 'deleteSanPham']);

//CartController
Route::post('/cart/checkout', [CartController::class, 'thanhToanCart']);
Route::get('/cart/{maKh}', [CartController::class, 'getCartItemsByUserId']);
Route::post('/cart/update', [CartController::class, 'updateCartItemQuantity']);
Route::post('/cart/create', [CartController::class, 'createCart']);

// Route xóa sản phẩm trong giỏ hàng của người dùng
Route::delete('/cart/{maKh}/remove/{maSp}', [CartController::class, 'removeCart']);

// Route xóa sản phẩm trong giỏ hàng của người dùng

//Roter cho Admin
Route::get('/list-phan-quyen', [AdminController::class, 'getListPhanQuyen']);
Route::get('/list-user', [AdminController::class, 'getListUser']);
Route::get('/list-don-hang', [AdminController::class, 'getDonHang']);
Route::get('/list-san-pham', [AdminController::class, 'getSanPham']);
Route::get('/list-the-loai', [AdminController::class, 'getTheLoai']);

Route::post('/save-san-pham', [AdminController::class, 'createSanPham']);
Route::post('/update-san-pham/{id}', [AdminController::class, 'updateSanPham']);
Route::post('/xoa-san-pham/{id}', [AdminController::class, 'deleteSanPham']);

Route::post('/save-the-loai', [AdminController::class, 'createTheLoai']);
Route::post('/update-the-loai/{id}', [AdminController::class, 'updateTheLoai']);
Route::post('/xoa-the-loai/{id}', [AdminController::class, 'deleteTheLoai']);

Route::post('/save-khach-hang', [AdminController::class, 'createUser']);
Route::post('/update-khach-hang/{id}', [AdminController::class, 'updateUser']);
Route::post('/xoa-khach-hang/{id}', [AdminController::class, 'deleteUser']);

Route::post('/save-don-hang', [AdminController::class, 'createDonHang']);
Route::post('/update-don-hang/{id}', [AdminController::class, 'updateDonHang']);
Route::post('/xoa-don-hang/{id}', [AdminController::class, 'deleteDonHang']);









//AuthController
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

//CustomerController
Route::put('/customers/{maKh}', [CustomerController::class, 'updateCustomerInfo']);
Route::put('/accounts/{maTk}/change-password', [CustomerController::class, 'changePassword']);


//OrderController
Route::get('/orders/pending/{maTk}', [OrderController::class, 'getPendingOrders']);
Route::get('/orders/success/{maTk}', [OrderController::class, 'getSuccessOrders']);
Route::get('/orders/cancel/{maTk}', [OrderController::class, 'getCancelOrders']);

// Route cho API /user với middleware auth:sanctum
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route cho API posts
Route::get('posts', [PostController::class, 'show']);