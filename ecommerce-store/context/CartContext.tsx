// /context/CartContext.tsx

"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "@/types";

// Extend the Product interface to include quantity
export interface CartItem extends Product {
  quantity: number;
}

// Define the shape of the cart context
interface CartContextType {
  items: CartItem[];
  addItem: (product: CartItem) => void;
  removeItem: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  removeAll: () => void;
}

// Create the context with default values
const CartContext = createContext<CartContextType | undefined>(undefined);

// CartProvider component to wrap around parts of the app that need access to the cart
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: CartItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        // Update the quantity of the existing item
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      } else {
        // Add new item to cart
        return [...prevItems, product];
      }
    });
  };

  const removeItem = (productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const increaseQuantity = (productId: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (productId: string) => {
    setItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeAll = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, increaseQuantity, decreaseQuantity, removeAll }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the CartContext
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
