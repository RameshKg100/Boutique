"use client";

import { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext();

const CART_STORAGE_KEY = "sathyas-cart";

const initialState = {
  items: [],
  isOpen: false,
};

function cartReducer(state, action) {
  switch (action.type) {
    case "LOAD_CART":
      return { ...state, items: action.payload };

    case "ADD_ITEM": {
      const existingIndex = state.items.findIndex(
        (item) =>
          item.id === action.payload.id && item.size === action.payload.size
      );

      if (existingIndex > -1) {
        const updatedItems = [...state.items];
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: updatedItems[existingIndex].quantity + 1,
        };
        return { ...state, items: updatedItems };
      }

      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(
          (item) =>
            !(item.id === action.payload.id && item.size === action.payload.size)
        ),
      };

    case "UPDATE_QUANTITY": {
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(
            (item) =>
              !(
                item.id === action.payload.id &&
                item.size === action.payload.size
              )
          ),
        };
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id && item.size === action.payload.size
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    }

    case "CLEAR_CART":
      return { ...state, items: [] };

    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen };

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        dispatch({ type: "LOAD_CART", payload: JSON.parse(savedCart) });
      }
    } catch (e) {
      console.error("Error loading cart:", e);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
    } catch (e) {
      console.error("Error saving cart:", e);
    }
  }, [state.items]);

  const addItem = (product, size) => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.images[0],
        size,
      },
    });
  };

  const removeItem = (id, size) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id, size } });
  };

  const updateQuantity = (id, size, quantity) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, size, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const toggleCart = () => {
    dispatch({ type: "TOGGLE_CART" });
  };

  const cartTotal = state.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const cartCount = state.items.reduce(
    (count, item) => count + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        isOpen: state.isOpen,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        toggleCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
