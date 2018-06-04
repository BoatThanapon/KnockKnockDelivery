<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Buyer;
use App\Http\Resources\BuyerResource as BuyerResource;
use App\Http\Resources\BuyerCollection;

class BuyerController extends Controller
{
    public function getBuyers()
    {
        $buyers = Buyer::all();

        return BuyerResource::collection($buyers);
    }

    public function createBuyer(Request $request)
    {
        $buyerExist = Buyer::where('profile_id', $request->profile_id)->count();
        if($buyerExist > 1)
        {
            return response()->json('Buyer already exist', 500);
        }

        $buyer = Buyer::create($request->all());
        if(!$buyer){
            return response()->json('Error', 500);
        }

        return response()->json(
            [
                'message' => 'Successfully',
                'result' => $buyer
            ], 
            201
        );
    }

    public function updateBuyer($buyer_id ,Request $request)
    {
        if($buyer_id < 0)
        {
            return response()->json('Error', 400);
        }

        $buyer = Buyer::where('buyer_id',$buyer_id)->first();

        if(!$buyer)
        {
            return response()->json('Buyer not found', 404);
        }

        $buyer->buyer_firstname = $request->input('buyer_firstname');
        $buyer->buyer_lastname = $request->input('buyer_lastname');
        $buyer->telephone_number = $request->input('telephone_number');
        $buyer->status_id = $request->input('status_id');
        $buyer->save();

        return response()->json(
            [
                'message' => 'Successfully',
                'result' => $buyer
            ]
        );
    }
}


