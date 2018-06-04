<?php

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('login', 'AuthController@login');
    Route::post('signup', 'AuthController@signup');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
});

Route::group([
    // 'middleware' => 'jwt.auth',
], function ($router) {
    Route::get('user/{user_id}/profiles', 'ProfileController@getProfilesByUserId');
    Route::post('profile', 'ProfileController@createProfile');    
});

Route::group([
    // 'middleware' => 'jwt.auth',
], function ($router) {
    Route::get('sellers', 'SellerController@getSellers');
    Route::get('seller/profile/{profile_id}', 'SellerController@getSellerBySellerId');
    Route::post('seller', 'SellerController@createSeller');
    Route::put('seller/{seller_id}', 'SellerController@updateSeller');
});

Route::group([
    // 'middleware' => 'jwt.auth',
], function ($router) {
    Route::get('buyers', 'BuyerController@getBuyers');
    Route::post('buyer', 'BuyerController@createBuyer');
    Route::put('buyer/{buyer_id}', 'BuyerController@updateBuyer');
});
