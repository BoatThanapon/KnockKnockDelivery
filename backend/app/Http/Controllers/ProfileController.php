<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\ProfileResource;
use App\Http\Resources\ProfileCollection;
use App\Http\Requests\CreateProfileRequest;
use App\Profile;
use App\User;
use App\Seller;
use App\Buyer;
use App\Shipper;

class ProfileController extends Controller
{
    private $profile;
    private $user;
    private $seller;
    private $buyer;
    private $shipper;

    public function __construct(Profile $profile, User $user, Seller $seller, Buyer $buyer, Shipper $shipper )
    {
        $this->profile = $profile;
        $this->user = $user;
        $this->seller = $seller;
        $this->buyer = $buyer;
        $this->shipper = $shipper;
    }

    public function getProfilesByUserId($user_id)
    {
        if($user_id <= 0)
        {
            return response()->json(['message' =>'Bad Request'], 400);
        }

        $user = $this->user->find($user_id);

        if (!$user)
        {
            return response()->json(['message' => 'User not found'], 404);
        }

        $profiles = $this->profile->with('role')->where('user_id', $user_id)->get();
        $seller = new Seller();
        $buyer = new Buyer();
        $shipper = new Shipper();
        foreach($profiles as $item)
        {
            if($item->role->role_id == 2)
                $seller = $this->seller->where('profile_id', $item->profile_id)->where('profile_status_id', 2)->first();
            if($item->role->role_id == 3)
                $buyer = $this->buyer->where('profile_id', $item->profile_id)->where('profile_status_id', 2)->first();
            if($item->role->role_id == 4)
                $shipper = $this->shipper->where('profile_id', $item->profile_id)->where('profile_status_id', 2)->first();
        }

        return response()->json([
            'message' => 'Successfully',
            'data' => array(
                'seller' => $seller,
                'buyer' => $buyer,
                'shipper' => $shipper
            )
        ]);
    }

    public function deleteProfile(Request $request ,$profile_id)
    {
        if($profile_id <= 0)
        {
            return response()->json(['message' => 'Bad request'], 400 );
        }

        $role_id = $request->role_id;

        if($role_id === 2)
        {
            $seller = $this->seller->find($profile_id);

            if($seller === null)
            {
                return response()->json(['message' => 'Seller not found'], 404 );
            }

            $profile = $this->profile->find($profile_id);
            if($profile === null)
            {
                return response()->json(['message' => 'Profile not found'], 404 );
            }

            $seller->delete();
            $profile->delete();

            return response()->json(['message' => 'Successfully']);
        }
        else if ($role_id === 3)
        {
            $buyer = $this->buyer->find($profile_id);

            if($buyer === null)
            {
                return response()->json(['message' => 'Buyer not found'], 404 );
            }

            $profile = $this->profile->find($profile_id);
            if($profile === null)
            {
                return response()->json(['message' => 'Profile not found'], 404 );
            }

            $buyer->delete();
            $profile->delete();

            return response()->json(['message' => 'Successfully']);
        }
        else if($role_id === 4)
        {
            $shipper = $this->shipper->find($profile_id);

            if($deliver === null)
            {
                return response()->json(['message' => 'Deliver not found'], 404 );
            }

            $profile = $this->profile->find($profile_id);
            if($profile === null)
            {
                return response()->json(['message' => 'Profile not found'], 404 );
            }

            $shipper->delete();
            $profile->delete();

            return response()->json(['message' => 'Successfully']);
        }
        else
        {
            return response()->json(['message' => 'Role not found']);
        }

    }

}
