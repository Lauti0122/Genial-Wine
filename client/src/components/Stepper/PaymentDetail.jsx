import React from 'react'
import { useSelector } from 'react-redux'

export default function PaymentDetail() {

    const checkout = useSelector(state => state.checkout);
    const cart = useSelector(state => state.cart);
    const payment_info = useSelector(state => state.payment_info)


  return (
    <div>
        <h4>Cart:</h4>
        {cart.map(wine=>(
            <>
                <div>{wine.name} x {wine.quantity} ${wine.price} ${parseFloat(wine.price * wine.quantity).toFixed(2)}  </div> 
            </>
                
        ))}
        
        <div>
            <h4>Shipping Address:</h4>
            <p>{payment_info.shipping.address}</p>
            <p>{payment_info.shipping.city}, {payment_info.shipping.country}, {payment_info.shipping.cp}</p>
        </div>

        <div>
            <h4>Payment Method:</h4>
            <p>{payment_info.payment_method}</p>
        </div>
        <button type="button" target="_blank" onClick={() => window.location.href = checkout?.init_point}>Buy</button>
    </div>
  )
}
