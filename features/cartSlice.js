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
				toast(`${action.payload.name} is already added to cart`, {
					position: "top-center",
					type: "warning",
				});
			} else {
				const tempBurger = { ...action.payload, cartQuantity: 1 };
				state.cartItems.push(tempBurger);
				toast(`${action.payload.name} added to cart`, {
					position: "top-center",
					type: "success",
				});
				localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
			}

			if (typeof window !== "undefined") {
				const item = localStorage.getItem("cartItems")
					? JSON.parse(localStorage.getItem("cartItems"))
					: [];
				state.cartItems = item;
			} // localStorage (aka window.localStorage) is not defined on the server side. That is, window & document are not available on the server. When NextJS server renders components, it tries to access localStorage but can't find it. You'll have to wait until the browser renders it in order to use localStorage. That's why here I use if(typeof window !== "undefined"). The alternative would be to define all localstorage functionality in the useEffect hook so that localstorage can be available once the app and component mounts and then NextJS server can have access to it
		},
		removeFromCart(state, action) {
			const newCartItems = state.cartItems.filter(
				(cartItem) => cartItem.slug !== action.payload.slug
			);
			state.cartItems = newCartItems;
			toast(`${action.payload.name} removed from cart`, {
				position: "top-center",
				type: "error",
			});
			localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
		},
		decreaseCartQuantity(state, action) {
			const burgerIndex = state.cartItems.findIndex(
				(burger) => burger.slug === action.payload.slug
			);

			if (state.cartItems[burgerIndex].cartQuantity > 1) {
				state.cartItems[burgerIndex].cartQuantity -= 1;
				toast(`${action.payload.name}'s quantity decreased`, {
					position: "top-center",
					type: "info",
				});
			} else if (state.cartItems[burgerIndex].cartQuantity === 1) {
				const newCartItems = state.cartItems.filter(
					(cartItem) => cartItem.slug !== action.payload.slug
				);
				state.cartItems = newCartItems;
				toast(`${action.payload.name} removed from cart`, {
					position: "top-center",
					type: "error",
				});
			}
			localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
		},
		increaseCartQuantity(state, action) {
			const burgerIndex = state.cartItems.findIndex(
				(burger) => burger.slug === action.payload.slug
			);

			if (state.cartItems[burgerIndex].cartQuantity >= 1) {
				state.cartItems[burgerIndex].cartQuantity += 1;
				toast(`${action.payload.name}'s quantity increased`, {
					position: "top-center",
					type: "info",
				});
			}
			localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
		},
		clearCart(state, action) {
			state.cartItems = [];
			toast(`cart cleared`, {
				position: "top-center",
				type: "error",
			});
			localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
		},
		getTotals(state, action) {
			let { total, quantity } = state.cartItems.reduce(
				(cartTotal, cartItem) => {
					const { price, cartQuantity } = cartItem;
					const itemTotal = price * cartQuantity;

					cartTotal.total += itemTotal;
					cartTotal.quantity += cartQuantity;

					return cartTotal;
				},
				{
					total: 0,
					quantity: 0,
				}
			);

			state.cartTotalQuantity = quantity;
			state.cartTotalAmount = total;
		},
	},
});

export const {
	addToCart,
	removeFromCart,
	decreaseCartQuantity,
	increaseCartQuantity,
	clearCart,
	getTotals,
} = cartSlice.actions;

export default cartSlice.reducer;
