<?php

namespace App\Http\Controllers;

use App\OrderDetail;
use Illuminate\Http\Request;

class OrderDetailController extends Controller
{
    // private $order_detail;

    // public function __construct(OrderDetail $order_detail)
    // {
    //     $this->order_detail = $order_detail;
    // }

    public function createOrderDeatail(Request $request)
    {
        $data = json_decode($request->getContent(), true);

        for ($x = 0; $x < count($data); $x++) {
            $order_detail = new OrderDetail;
            $order_detail->order_id = $data[$x]['order_id'];
            $order_detail->product_id = $data[$x]['product_id'];
            $order_detail->unit_of_product = $data[$x]['unit_of_product'];

            $order_detail->save();
        }

        return response()->json([
            'message' => 'Successfully'
        ]);
    }

}
