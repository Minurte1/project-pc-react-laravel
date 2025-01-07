<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartController;

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
Route::get('/cart/{maKh}', [CartController::class, 'getCartItemsByUserId']);
Route::post('/cart/update', [CartController::class, 'updateCartItemQuantity']);
Route::post('/cart/create', [CartController::class, 'createCart']);
// Route xóa sản phẩm trong giỏ hàng của người dùng
Route::delete('/cart/{maKh}/remove/{maSp}', [CartController::class, 'removeCart']);


//AuthController
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Route cho API /user với middleware auth:sanctum
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route cho API posts
Route::get('posts', [PostController::class, 'show']);