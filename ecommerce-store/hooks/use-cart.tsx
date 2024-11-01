// Deprecated




// import { useState } from "react";
// import { Product } from "@/types";

// interface CartItem extends Product {
//   quantity: number;
// }

// const useCart = () => {
//   const [items, setItems] = useState<CartItem[]>([]);

//   const addItem = (product: CartItem) => {
//     setItems((prevItems) => {
//       const existingItem = prevItems.find((item) => item.id === product.id);
//       if (existingItem) {
//         // Update the quantity of the existing item
//         return prevItems.map((item) =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + product.quantity }
//             : item
//         );
//       } else {
//         // Add new item to cart
//         return [...prevItems, product];
//       }
//     });
//   };

//   const removeItem = (productId: string) => {
//     setItems((prevItems) => prevItems.filter((item) => item.id !== productId));
//   };

//   const increaseQuantity = (productId: string) => {
//     setItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === productId
//           ? { ...item, quantity: item.quantity + 1 }
//           : item
//       )
//     );
//   };

//   const decreaseQuantity = (productId: string) => {
//     setItems((prevItems) =>
//       prevItems
//         .map((item) =>
//           item.id === productId
//             ? { ...item, quantity: item.quantity - 1 }
//             : item
//         )
//         .filter((item) => item.quantity > 0)
//     );
//   };

//   const removeAll = () => {
//     setItems([]);
//   };

//   return {
//     items,
//     addItem,
//     removeItem,
//     increaseQuantity,
//     decreaseQuantity,
//     removeAll, // Include removeAll in the returned object
//   };
// };

// export default useCart;
