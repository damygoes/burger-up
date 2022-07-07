import Image from "next/image";
import Link from "next/link";

import { FiShoppingCart } from "react-icons/fi";

import styles from "./Specialcard.module.css";

const Specialcard = ({ data }) => {
	return (
		<>
			{data.map((burger) => {
				return (
					burger.isSpecial && (
						<Link href={`burger/${burger.slug}`} key={burger.slug}>
							<div className={styles.container} key={burger.slug}>
								<div className={styles.detail}>
									<h4> {burger.name} </h4>
									<div>
										{" "}
										<p> type: {burger.type} </p>
										<p> $ {burger.price} </p>
									</div>

									<div className={styles.order}> buy now </div>
								</div>

								<div className={styles.avatar}>
									<Image
										src={burger.image}
										alt={burger.name}
										width={300}
										height={300}
									/>
								</div>
								<div className={styles.basket}>
									<FiShoppingCart />
								</div>
							</div>
						</Link>
					)
				);
			})}
		</>
	);
};

export default Specialcard;
