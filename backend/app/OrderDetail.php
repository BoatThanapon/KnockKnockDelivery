<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrderDetail extends Model
{
    public $primaryKey = 'order_detail_id';

    protected $fillable = [
        'product_id',
        'unit_of_product',
        'order_id',
    ];

    public $timestamps = false;

    public static function getOrderDetailsByOrderId($order_id)
    {
        $order_details = OrderDetail::where('order_id', $order_id)->get();
        return $order_details;
    }
}
