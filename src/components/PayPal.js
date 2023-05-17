import React, { useEffect, useRef } from "react";
import { deleteOrder } from "../graphql/mutations";
import { API, Auth, graphqlOperation } from "aws-amplify";
import { listOrders } from "../graphql/queries";

export default function PayPal({
  value,
  description,
  setAlbumsInCart,
  setCartCount,
  setPurchased,
}) {
  async function deleteOrdersForUser() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const userId = user.attributes.sub;
      const result = await API.graphql(
        graphqlOperation(listOrders, {
          filter: {
            userId: { eq: userId },
          },
        })
      );
      const orderIds = result.data.listOrders.items.map((item) => item.id);
      await Promise.all(
        orderIds.map((orderId) =>
          API.graphql(graphqlOperation(deleteOrder, { input: { id: orderId } }))
        )
      );
    } catch (error) {
      console.log("Error deleting orders:", error);
    }
  }

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
            await actions.order.capture();
            setCartCount(0);
            setAlbumsInCart([]);
            setPurchased(true);
            deleteOrdersForUser();
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
