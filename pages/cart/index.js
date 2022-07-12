import Image from "next/image";
import { useSelector } from "react-redux";

import { HiOutlineArrowLeft, HiMinus, HiPlus } from "react-icons/hi";

import styles from "./Cart.module.css";

const Cart = () => {
	const cart = useSelector((state) => state.cart);
	return (
		<div>
			{cart.cartItems.length === 0 ? (
				<div className={styles.cartEmpty}>
					<p> your cart is currently empty</p>
					<div className={styles.startShopping}>
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
										<HiMinus />
										<p> {cartItem.cartQuantity} </p>
										<HiPlus />
									</div>
									<button type="button" className={styles.cartItemDelete}>
										{" "}
										delete
									</button>
									<p className={styles.unitPrice}>
										{" "}
										Price: <span> ${cartItem.price} </span>{" "}
									</p>
								</div>
							</div>
							<div className={styles.orderPrice}>
								{" "}
								${cartItem.cartQuantity * cartItem.price}{" "}
							</div>
						</div>
					))}

					<div className={styles.subTotal}>
						<div className={styles.subTotalPrice}>
							<p>subtotal</p>
							<p> ${cart.cartTotalAmount} </p>
						</div>
						<div className={styles.shipping}>
							<p>shipping</p>
							<p> 3.99 </p>
						</div>
					</div>
					<div className={styles.finalPrice}>
						<p> total </p>
						<p> $93.98 </p>
					</div>
					<div className={styles.cartActions}>
						<div className={styles.continueShopping}>
							{" "}
							<HiOutlineArrowLeft /> continue shopping{" "}
						</div>
						<div className={styles.cartActionsButtons}>
							<button type="button" className={styles.clearCart}>
								{" "}
								clear cart{" "}
							</button>
							<button type="button" className={styles.placeOrder}>
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
