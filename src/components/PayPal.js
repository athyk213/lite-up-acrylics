import React, { useEffect, useRef } from "react";

export default function PayPal({
  value,
  description,
  setAlbumsInCart,
  setCartCount,
  setPurchased,
}) {
  const paypal = useRef();
  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: description,
                amount: {
                  currency_code: "USD",
                  value: value,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          try {
            setCartCount(0);
            setAlbumsInCart([]);
            setPurchased(true);
          } catch (err) {
            console.log(err);
          }
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, [value, description, setAlbumsInCart, setCartCount, setPurchased]);

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
}
