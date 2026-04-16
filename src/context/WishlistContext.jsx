"use client";

import { createContext, useContext, useReducer, useEffect } from "react";

const WishlistContext = createContext();

const WISHLIST_STORAGE_KEY = "sashaa-wishlist";

const initialState = {
  items: [],
};

function wishlistReducer(state, action) {
  switch (action.type) {
    case "LOAD_WISHLIST":
      return { ...state, items: action.payload };

    case "ADD_ITEM": {
      const exists = state.items.find((item) => item.id === action.payload.id);
      if (exists) return state;
      return { ...state, items: [...state.items, action.payload] };
    }

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case "CLEAR_WISHLIST":
      return { ...state, items: [] };

    default:
      return state;
  }
}

export function WishlistProvider({ children }) {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (saved) {
        dispatch({ type: "LOAD_WISHLIST", payload: JSON.parse(saved) });
      }
    } catch (e) {
      console.error("Error loading wishlist:", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(state.items));
    } catch (e) {
      console.error("Error saving wishlist:", e);
    }
  }, [state.items]);

  const addItem = (product) => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.images[0],
        category: product.category,
      },
    });
  };

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const clearWishlist = () => {
    dispatch({ type: "CLEAR_WISHLIST" });
  };

  const isInWishlist = (id) => {
    return state.items.some((item) => item.id === id);
  };

  return (
    <WishlistContext.Provider
      value={{
        items: state.items,
        addItem,
        removeItem,
        clearWishlist,
        isInWishlist,
        wishlistCount: state.items.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
