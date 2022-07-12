import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { useEffect } from "react";

const initialState = {
	cartItems: [],
	cartTotalQuantity: 0,
	cartTotalAmount: 0,
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart(state, action) {
			const burgerIndex = state.cartItems.findIndex(
				(burger) => burger.slug === action.payload.slug
			);
			if (burgerIndex >= 0) {
				state.cartItems[burgerIndex].cartQuantity += 1;
				toast(`${action.payload.name}'s quantity increased`, {
					position: "top-center",
					type: "info",
				});
			} else {
				const tempBurger = { ...action.payload, cartQuantity: 1 };
				state.cartItems.push(tempBurger);
				toast(`${action.payload.name} added to cart`, {
					position: "top-center",
					type: "success",
				});
			}

			localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

			const item = localStorage.getItem("cartItems")
				? JSON.parse(localStorage.getItem("cartItems"))
				: [];

			if (typeof window !== "undefined") {
				state.cartItems = item;
			} // localStorage (aka window.localStorage) is not defined on the server side. That is, window & document are not available on the server. When NextJS server renders components, it tries to access localStorage but can't find it. You'll have to wait until the browser renders it in order to use localStorage. That's why here I use if(typeof window !== "undefined"). The alternative would be to define all localstorage functionality in the useEffect hook so that localstorage can be available once the app and component mounts and then NextJS server can have access to it
		},
	},
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
