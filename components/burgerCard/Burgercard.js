import Image from "next/image";
import Link from "next/link";

import { FiShoppingCart } from "react-icons/fi";

import styles from "./Burgercard.module.css";

const Burgercard = ({ data }) => {
	return (
		<>
			{data.map((burger) => {
				return (
					<div className={styles.burgerCard} key={burger.slug}>
						<div className={styles.imageContainer}>
							<Link href={`burger/${burger.slug}`}>
								<Image src={burger.image} alt={burger.name} layout="fill" />
							</Link>
						</div>

						<div className={styles.content}>
							<h3> {burger.name} </h3>

							<div className={styles.cta}>
								<p> ${burger.price} </p>
								<button>
									buy now <FiShoppingCart />{" "}
								</button>
							</div>
						</div>
					</div>
				);
			})}
		</>
	);
};

export default Burgercard;
