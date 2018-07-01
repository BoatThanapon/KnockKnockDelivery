<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Initialmigrate extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('user_id');
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });

        Schema::create('password_resets', function (Blueprint $table) {
            $table->string('email')->index();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('roles', function (Blueprint $table) {
            $table->increments('role_id');
            $table->string('role_name');
        });

        Schema::create('profile_statuses', function (Blueprint $table) {
            $table->increments('profile_status_id');
            $table->string('profile_status_name');
        });

        Schema::create('shop_types', function (Blueprint $table) {
            $table->increments('shop_type_id');
            $table->string('shop_type_name');
        });

        Schema::create('categories', function (Blueprint $table) {
            $table->increments('category_id');
            $table->string('category_name');
        });

        Schema::create('product_statuses', function (Blueprint $table) {
            $table->increments('product_status_id');
            $table->string('product_status_name');
        });

        Schema::create('order_statuses', function (Blueprint $table){
            $table->increments('order_status_id');
            $table->string('order_status_name');
        });

        Schema::create('profiles', function (Blueprint $table) {
            $table->increments('profile_id');
            $table->unsignedInteger('user_id');
            $table->unsignedInteger('role_id');

            $table->foreign('user_id')->references('user_id')->on('users');
            $table->foreign('role_id')->references('role_id')->on('roles');
        });

        Schema::create('sellers', function (Blueprint $table) {
            $table->increments('seller_id');
            $table->string('seller_name');
            $table->string('shop_name');
            $table->string('shop_telephone_number');
            $table->string('shop_address');
            $table->string('shop_logo_image');
            $table->float('shop_latitude');
            $table->float('shop_longitude');
            $table->unsignedInteger('shop_type_id');
            $table->unsignedInteger('profile_status_id');
            $table->unsignedInteger('profile_id');

            $table->foreign('shop_type_id')->references('shop_type_id')->on('shop_types');
            $table->foreign('profile_status_id')->references('profile_status_id')->on('profile_statuses');
            $table->foreign('profile_id')->references('profile_id')->on('profiles');
        });

        Schema::create('buyers', function (Blueprint $table) {
            $table->increments('buyer_id');
            $table->string('buyer_name');
            $table->string('buyer_address');
            $table->string('buyer_telephone_number');
            $table->unsignedInteger('profile_status_id');
            $table->unsignedInteger('profile_id');

            $table->foreign('profile_status_id')->references('profile_status_id')->on('profile_statuses');
            $table->foreign('profile_id')->references('profile_id')->on('profiles');
        });

        Schema::create('delivers', function (Blueprint $table) {
            $table->increments('deliver_id');
            $table->string('deliver_name');
            $table->string('deliver_address');
            $table->string('deliver_telephone_number');
            $table->string('deliver_bank_account');
            $table->string('deliver_transfer_slip');
            $table->unsignedInteger('profile_status_id');
            $table->unsignedInteger('profile_id');

            $table->foreign('profile_status_id')->references('profile_status_id')->on('profile_statuses');
            $table->foreign('profile_id')->references('profile_id')->on('profiles');
        });

        Schema::create('admins', function (Blueprint $table) {
            $table->increments('admin_id');
            $table->string('admin_name');
            $table->string('admin_telephone_number');

            $table->unsignedInteger('profile_id');
            $table->foreign('profile_id')->references('profile_id')->on('profiles');
        });

        Schema::create('products', function (Blueprint $table) {
            $table->increments('product_id');
            $table->string('product_name');
            $table->string('product_description');
            $table->string('product_price');
            $table->integer('unit_in_stock');
            $table->string('product_image_1');
            $table->string('product_image_2');
            $table->string('product_image_3');
            $table->unsignedInteger('product_status_id');
            $table->unsignedInteger('product_category_id');
            $table->unsignedInteger('seller_id');
            $table->timestamps();

            $table->foreign('product_status_id')->references('product_status_id')->on('product_statuses');
            $table->foreign('product_category_id')->references('category_id')->on('categories');
            $table->foreign('seller_id')->references('seller_id')->on('sellers');
        });




    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
