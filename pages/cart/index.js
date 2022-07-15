import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { HiOutlineArrowLeft, HiMinus, HiPlus } from "react-icons/hi";

import styles from "./Cart.module.css";
import {
	clearCart,
	decreaseCartQuantity,
	getTotals,
	increaseCartQuantity,
	removeFromCart,
} from "../../features/cartSlice";

const Cart = () => {
	const router = useRouter();
	const dispatch = useDispatch();

	const cart = useSelector((state) => state.cart);

	const handleRemoveFromCart = (cartItem) => {
		dispatch(removeFromCart(cartItem));
	};

	const handleDecreaseCartQuantity = (cartItem) => {
		dispatch(decreaseCartQuantity(cartItem));
	};

	const handleIncreaseCartQuantity = (cartItem) => {
		dispatch(increaseCartQuantity(cartItem));
	};

	const handleClearCart = () => {
		dispatch(clearCart());
	};

	useEffect(() => {
		dispatch(getTotals());
	}, [cart, dispatch]);

	const handlePlaceOrder = () => {
		alert("Thank you! Your order will be delivered within 45mins");
		setTimeout(() => {
			router.push("/");
		}, 200);
	};

	return (
		<div>
			{cart.cartItems.length === 0 ? (
				<div className={styles.cartEmpty}>
					<p> your cart is currently empty</p>
					<div
						className={styles.startShopping}
						onClick={() => {
							router.push("/burger");
						}}
					>
						{" "}
						<HiOutlineArrowLeft /> start shopping{" "}
					</div>
				</div>
			) : (
				<div className={styles.container}>
					{cart.cartItems?.map((cartItem) => (
						<div className={styles.orderContainer} key={cartItem.slug}>
							<div className={styles.avatarContainer}>
								<Image src={cartItem.image} alt={cartItem.name} layout="fill" />
							</div>
							<div className={styles.orderDetails}>
								<h4> {cartItem.name} </h4>
								<div>
									<div className={styles.counter}>
										<HiMinus onClick={() => handleDecreaseCartQuantity(cartItem)} />
										<p> {cartItem.cartQuantity} </p>
										<HiPlus onClick={() => handleIncreaseCartQuantity(cartItem)} />
									</div>
									<button
										type="button"
										className={styles.cartItemDelete}
										onClick={() => handleRemoveFromCart(cartItem)}
									>
										{" "}
										delete
									</button>
									<p className={styles.unitPrice}>
										{" "}
										Unit Price: <span> ${cartItem.price} </span>{" "}
									</p>
								</div>
							</div>
							<div className={styles.orderPrice}>
								${cartItem.cartQuantity * cartItem.price}
							</div>
						</div>
					))}

					<div className={styles.subTotal}>
						<div className={styles.subTotalPrice}>
							<p>subtotal</p>
							<p> ${cart.cartTotalAmount.toFixed(2)} </p>
						</div>
						<div className={styles.shipping}>
							<p>shipping</p>
							<p> ${(cart.cartTotalAmount * 0.02).toFixed(2)} </p>
						</div>
					</div>
					<div className={styles.finalPrice}>
						<p> total </p>
						<p>
							{" "}
							${(cart.cartTotalAmount + cart.cartTotalAmount * 0.02).toFixed(2)}{" "}
						</p>
					</div>
					<div className={styles.cartActions}>
						<div
							className={styles.continueShopping}
							onClick={() => {
								router.push("/burger");
							}}
						>
							{" "}
							<HiOutlineArrowLeft /> continue shopping{" "}
						</div>
						<div className={styles.cartActionsButtons}>
							<button
								type="button"
								className={styles.clearCart}
								onClick={() => handleClearCart()}
							>
								{" "}
								clear cart{" "}
							</button>
							<button
								type="button"
								className={styles.placeOrder}
								onClick={() => {
									handlePlaceOrder();
									handleClearCart();
								}}
							>
								{" "}
								place order{" "}
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Cart;
