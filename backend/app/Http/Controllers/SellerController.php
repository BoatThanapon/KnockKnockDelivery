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

    public function getSellerBySellerId($seller_id)
    {
        if($seller_id < 0)
        {
            return response()->json('Bad Request', 400);
        }

        $seller = Seller::with('shop_type')->where('seller_id', $seller_id)->get();
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

    public function updateSeller($seller_id ,Request $request)
    {
        if($seller->isEmpty())
        {
            return Seller::abort('400', 'Error');
        }

        $seller = Seller::findOrFail($seller_id);
        if($seller->isEmpty())
        {
            return Seller::abort('404', 'Seller not found');
        }

        $seller->update($request->all());

        return response()->json(
            [
                'message' => 'Successfully',
                'result' => $seller
            ]
        );
    }

}
