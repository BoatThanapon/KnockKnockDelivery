<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Order;
use App\Http\Resources\OrderUserProfileHistoryResource as OrderUserProfileHistoryResource;


class OrderHistoryController extends Controller
{
    private $order;

    public function __construct(Order $order)
    {
        $this->order = $order;
    }

    public function getOrderHistorySellerBySellerId($seller_id)
    {
        $seller_order_histories = $this->order
                        ->where('seller_id', $seller_id)
                        ->where('order_status_id', 8)
                        ->get();
        return OrderUserProfileHistoryResource::collection($seller_orders_history);
    }

    public function getOrderHistoryBuyerByBuyerId($buyer_id)
    {
        $buyer_order_histories = $this->order
                        ->where('buyer_id', $buyer_id)
                        ->where('order_status_id', 8)
                        ->get();
        return OrderUserProfileHistoryResource::collection($buyer_orders_history);
    }

    public function getOrderHistoryDeliverByShipperId($shipper_id)
    {
        $shipper_order_histories = $this->order
                        ->where('shipper_id', $shipper_id)
                        ->where('order_status_id', 8)
                        ->get();
        return OrderUserProfileHistoryResource::collection($shipper_order_histories);
    }
}
