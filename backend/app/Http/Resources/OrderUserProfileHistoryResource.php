<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OrderUserProfileHistoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'order_id' => $this->order_id,
            'receiver_firstname' => $this->receiver_firstname,
            'receiver_lastname' => $this->receiver_lastname,
            'receiver_location' => $this->receiver_location,
            'receiver_latitude' => $this->receiver_latitude,
            'receiver_longitude' => $this->receiver_longitude,
            'order_date' => $this->order_date,
            'order_total_price' => $this->telephone_number,
            'service_charge' => $this->telephone_number,
            'total' => $this->telephone_number,
            'seller' => $this->seller,
            'buyer' => $this->buyer,
            'shipper' => $this->shipper,
            'order_details' => OrderDetail::getOrderDetailsByOrderId($this->order_id)
        ];
    }
}
