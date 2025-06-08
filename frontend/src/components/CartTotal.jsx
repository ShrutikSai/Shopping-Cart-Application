import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

const CartTotal = ({ cartItems, totalAmount, discount, delivery_fee, applyCoupon, removeCoupon, couponCode }) => {
  const [couponInput, setCouponInput] = useState("");

  const { currency, backendUrl } = useContext(ShopContext); 

  const total = totalAmount + delivery_fee - discount;

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md">
      <div className="text-2xl font-bold text-gray-800">
        <Title text1={"CART "} text2={"TOTAL"} />
      </div>

      <div className="flex flex-col gap-3 mt-3 text-sm text-gray-600">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>{currency}{totalAmount.toFixed(2)}</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Delivery Fee</p>
          <p>{currency}{delivery_fee.toFixed(2)}</p>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-500">
            <p>Discount</p>
            <p>-{currency}{discount.toFixed(2)}</p>
          </div>
        )}
        <div className="flex justify-between font-semibold text-lg text-gray-800">
          <b>Total</b>
          <b>{currency}{total.toFixed(2)}</b>
        </div>

        {couponCode && (
          <div className="flex justify-between mt-4 text-green-500">
            <p>Applied Coupon</p>
            <div className="flex items-center">
              <p>{couponCode}</p>
              <button
                className="ml-2 text-red-500 hover:text-red-700"
                onClick={removeCoupon} 
              >
                Remove
              </button>
            </div>
          </div>
        )}

        {!couponCode && (
          <div className="flex justify-between items-center mt-4">
            <input
              className="border px-3 py-2 w-2/3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Enter coupon code"
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
            />
            <button
              className="ml-3 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
              onClick={() => applyCoupon(couponInput)} 
            >
              Apply
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartTotal;
