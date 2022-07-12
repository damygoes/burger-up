import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cartSlice";

import { FiShoppingCart } from "react-icons/fi";

import styles from "./Specialcard.module.css";

const Specialcard = ({ data }) => {
	const dispatch = useDispatch();
	const handleAddToCart = (burger) => {
		dispatch(addToCart(burger));
	};
	return (
		<>
			{data.map((burger) => {
				return (
					burger.isSpecial && (
						<div className={styles.container} key={burger.slug}>
							<Link href={`burger/${burger.slug}`} key={burger.slug}>
								<div className={styles.detail}>
									<h4> {burger.name} </h4>
									<div>
										{" "}
										<p> type: {burger.type} </p>
										<p> $ {burger.price} </p>
									</div>

									<div className={styles.order} onClick={() => handleAddToCart(burger)}>
										{" "}
										buy now{" "}
									</div>
								</div>
							</Link>

							<Link href={`burger/${burger.slug}`} key={burger.slug}>
								<div className={styles.avatar}>
									<Image src={burger.image} alt={burger.name} width={300} height={300} />
								</div>
							</Link>
							<div className={styles.basket} onClick={() => handleAddToCart(burger)}>
								<FiShoppingCart />
							</div>
						</div>
					)
				);
			})}
		</>
	);
};

export default Specialcard;
