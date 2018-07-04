<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ProfileStatus;
use App\ProductCategory;
use App\BankAccount;
use App\OrderStatus;
use App\ProductStatus;
use App\ShopType;

class MasterDataController extends Controller
{
    private $profile_status;
    private $product_category;
    private $bank_account;
    private $order_status;
    private $product_status;
    private $shop_type;

    public function __construct(
        ProfileStatus $profile_status,
        ProductCategory $product_category,
        BankAccount $bank_account,
        OrderStatus $order_status,
        ProductStatus $product_status,
        ShopType $shop_type
    )
    {
        $this->profile_status = $profile_status;
        $this->product_category = $product_category;
        $this->bank_account = $bank_account;
        $this->order_status = $order_status;
        $this->product_status = $product_status;
        $this->shop_type = $shop_type;
    }


    public function getMasterDate()
    {
        $profile_status = $this->profile_status->all()->toArray();
        $shop_type = $this->shop_type->all()->toArray();
        $bank_account = $this->bank_account->all()->toArray();
        $product_category = $this->product_category->all()->toArray();
        $product_status = $this->product_status->all()->toArray();
        $order_status = $this->order_status->all()->toArray();

        return response()->json([
            'message' => 'Successfully',
            'data' => [
                'profile_status' => $profile_status,
                'shop_type' => $shop_type,
                'bank_account' => $bank_account,
                'product_category' => $product_category,
                'product_status' => $product_status,
                'order_status' => $order_status,
            ]
        ]);
    }


}
