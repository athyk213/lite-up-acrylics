import React, { useEffect, useRef } from "react";
import { deleteOrder } from "../graphql/mutations";
import { API, Auth, graphqlOperation } from "aws-amplify";
import { listOrders } from "../graphql/queries";

export default function PayPal({
  value,
  albumsInCart,
  quantities,
  setAlbumsInCart,
  setCartCount,
  setPurchased,
}) {
  const paypal = useRef();
  const paypalClientId = process.env.REACT_APP_PAYPAL_CLIENT_ID;

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${paypalClientId}&currency=USD`;
    script.onload = () => {
      window.paypal
        .Buttons({
          createOrder: (data, actions, err) => {
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  items: albumsInCart.map((album, i) => ({
                    name:
                      album.album.name +
                      ` by ${album.album.artists
                        .slice(0, 3)
                        .map((artist) => artist.name)
                        .join(", ")} (${album.option})`,
                    quantity: quantities[i],
                    unit_amount: {
                      currency_code: "USD",
                      value: album.price,
                    },
                  })),
                  amount: {
                    currency_code: "USD",
                    value: value[0] + value[1],
                    breakdown: {
                      item_total: {
                        currency_code: "USD",
                        value: value[0],
                      },
                      shipping: {
                        currency_code: "USD",
                        value: value[1],
                      },
                    },
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
          onShippingChange(data, actions) {
            if (data.shipping_address.country_code !== "US") {
              return actions.reject();
            }

            return actions.resolve();
          },
          onError: (err) => {
            console.log(err);
          },
        })
        .render(paypal.current);
    };

    document.head.appendChild(script);

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
            API.graphql(
              graphqlOperation(deleteOrder, { input: { id: orderId } })
            )
          )
        );
      } catch (error) {
        console.log("Error deleting orders:", error);
      }
    }
    return () => {
      document.head.removeChild(script);
    };
  }, [
    value,
    albumsInCart,
    quantities,
    setAlbumsInCart,
    setCartCount,
    setPurchased,
    paypalClientId,
  ]);

  return <div ref={paypal} />;
}
