<?php

Route::group([
    'middleware' => ['api','CORS'],
    'prefix' => 'auth'
], function ($router) {
    Route::post('login', 'AuthController@login');
    Route::post('signup', 'AuthController@signup');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::put('user/{user_id}','AuthController@editUser');
    Route::post('me', 'AuthController@me');

});

Route::post('auth/sendPasswordResetLink', 'ResetPasswordController@sendEmail');
Route::post('auth/resetPassword', 'ChangePasswordController@process');

Route::group([
    'middleware' => ['auth:api','CORS'],
], function ($router) {
    Route::get('masterData', 'MasterDataController@getMasterDate');
});

Route::group([
    'middleware' => ['auth:api','CORS'],
], function ($router) {
    Route::get('user/{user_id}/profiles', 'ProfileController@getProfilesByUserId');
});

Route::group([
    'middleware' => ['auth:api','CORS'],
], function ($router) {
    Route::get('sellers', 'SellerController@getSellers');
    Route::get('seller/profile/{profile_id}', 'SellerController@getSellerByProfileId');
    Route::post('seller', 'SellerController@createSeller');
    Route::post('seller/{seller_id}', 'SellerController@updateSeller');

    Route::get('seller/{seller_id}/products', 'ProductController@getProductsBySellerId');
    Route::post('seller/{seller_id}/product', 'ProductController@createProduct');
    Route::post('seller/{seller_id}/product/{product_id}', 'ProductController@updateProduct');
    Route::delete('seller/product/{product_id}', 'ProductController@deleteProduct');
});

Route::group([
    'middleware' => ['auth:api','CORS'],
], function ($router) {
    Route::get('buyer/profile/{profile_id}', 'BuyerController@getBuyerByProfileId');
    Route::post('buyer', 'BuyerController@createBuyer');
    Route::put('buyer/{buyer_id}', 'BuyerController@updateBuyer');
});

Route::group([
    'middleware' => ['auth:api','CORS'],
], function ($router) {
    Route::get('shipper/profile/{profile_id}', 'ShipperController@getShipperByProfileId');
    Route::post('shipper', 'ShipperController@createShipper');
    Route::post('shipper/{shipper_id}', 'ShipperController@updateShipper');
});

Route::group([
    'middleware' => ['auth:api','CORS'],
], function ($router) {
    Route::get('admin/{user_id}', 'AdminController@getAdminByUserId');
    Route::post('search/users', 'AdminController@searchUsers');
    // Route::put('admin/{admin_id}', 'AdminController@updateAdmin');
    Route::post('admin/updatestatus', 'AdminController@adminUpdateStatusUser');
});


Route::group([
    'middleware' => ['auth:api','CORS'],
], function ($router) {
    Route::get('products', 'ProductController@getProducts');
    Route::get('product/{product_id}', 'ProductController@getProductByProductId');
});

// order
Route::group([
    'middleware' => ['auth:api','CORS'],
], function ($router) {
    Route::get('orders', 'OrderController@getListOrdersOfShipper');
    Route::put('order', 'OrderController@updateOrder');
    Route::post('order', 'OrderController@createOrder');
});
