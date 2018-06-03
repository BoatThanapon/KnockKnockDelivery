<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Seller;
use App\Http\Resources\SellerResource as SellerResource;
use App\Http\Resources\SellerCollection;

class SellerController extends Controller
{
    public function getSellers()
    {
        $sellers = Seller::all();

        return SellerResource::collection($sellers);
    }

    public function getSellerBySellerId($profile_id)
    {
        if($profile_id < 0)
        {
            return response()->json('Bad Request', 400);
        }

        $seller = Seller::with('shoptype','status')->where('profile_id', $profile_id)->get();
        if($seller->isEmpty())
        {
            return response()->json('Seller not found', 404);
        }

        return SellerResource::collection($seller);
    }

    public function createSeller(Request $request)
    {
        $sellerExist = Seller::where('profile_id', $request->profile_id)->count();
        if($sellerExist > 1)
        {
            return response()->json('Seller already exist', 500);
        }

        $seller = Seller::create($request->all());
        if(!$seller){
            return response()->json('Error', 500);
        }

        return response()->json(
            [
                'message' => 'Successfully',
                'result' => $seller
            ], 
            201
        );
    }

    public function updateSeller(Request $request, $seller_id )
    {
        if($seller_id < 0)
        {
            return response()->json('Error', 400);
        }

        $seller = Seller::where('seller_id', $seller_id)->first();
        if($seller->isEmpty())
        {
            return response()->json('Seller not found', 404);
        }

        $seller->seller_name = $request->input('seller_name');
        $seller->shop_name = $request->input('shop_name');
        $seller->shop_location = $request->input('shop_location');
        $seller->shop_type_id = $request->input('shop_type_id');
        $seller->status_id = $request->input('status_id');        
        $seller->status_id = $request->input('status_id');        
        $seller->status_id = $request->input('status_id');        
       
        $seller->save();
        
        return response()->json(
            [
                'message' => 'Successfully',
                'result' => $seller
            ]
        );
    }

}
