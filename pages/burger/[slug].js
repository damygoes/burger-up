import { MongoClient } from "mongodb";
import { useRouter } from "next/router";
import Image from "next/image";
import { addToCart } from "../../features/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { HiOutlineArrowLeft } from "react-icons/hi";

import styles from "./Burgerdetails.module.css";

const BurgerDetails = ({ burger }) => {
	const dispatch = useDispatch();
	// const cart = useSelector((state) => state.cart);
	const router = useRouter();

	const handleAddToCart = (burger) => {
		dispatch(addToCart(burger));
	};

	// console.log(burger.nutrition);
	const { fat, saturates, sugar, salt, calories } = burger.nutrition;

	return (
		<div className={styles.container}>
			<div
				className={styles.backnav}
				onClick={() => {
					router.push("/burger");
				}}
			>
				<HiOutlineArrowLeft /> back
			</div>
			<div className={styles.content}>
				<div className={styles.imageContainer}>
					<Image src={burger.image} alt={burger.title} layout="fill" />
				</div>
				<div className={styles.wrapper}>
					<div className={styles.innerWrapper}>
						<div>
							<h3> {burger.name} </h3>
							<p> {burger.description} </p>
						</div>
						<div className={styles.details}>
							<div>
								{" "}
								Fat: <span> {fat}g </span>{" "}
							</div>
							<div>
								{" "}
								Saturates: <span> {saturates}g </span>{" "}
							</div>
							{/* <div>
								{" "}
								Sugar: <span> {sugar}g </span>{" "}
							</div> */}
							<div>
								{" "}
								Salt: <span> {salt}g </span>{" "}
							</div>
							<div>
								{" "}
								Calories: <span> {calories}g </span>{" "}
							</div>
						</div>
					</div>

					<div className={styles.actions}>
						<p> ${burger.price} </p>
						<button onClick={() => handleAddToCart(burger)}>buy now</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export async function getStaticProps(context) {
	const pathSlug = context.params.slug;
	const client = await MongoClient.connect(
		`mongodb+srv://vercel-admin-user:KwoRI4n9DZHMzRkz@cluster0.nf34c.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
		// `mongodb+srv://damygoes:${process.env.DB_PASSWORD}@cluster0.nf34c.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
	);
	const db = client.db();
	const burgerCollection = db.collection("burger");
	const burger = await burgerCollection.findOne({
		slug: pathSlug,
	});
	client.close();

	return {
		props: {
			burger: {
				name: burger.name,
				slug: burger.slug,
				description: burger.description,
				type: burger.type,
				image: burger.image,
				price: burger.price,
				isSpecial: burger.isSpecial,
				nutrition: burger.nutrition,
			},
		},
	};
}

export async function getStaticPaths() {
	const client = await MongoClient.connect(
		`mongodb+srv://vercel-admin-user:KwoRI4n9DZHMzRkz@cluster0.nf34c.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
		// `mongodb+srv://damygoes:${process.env.DB_PASSWORD}@cluster0.nf34c.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
	);
	const db = client.db();
	const burgerCollection = db.collection("burger");
	const burgers = await burgerCollection.find({}, { slug: 1 }).toArray();
	client.close();

	return {
		fallback: false,
		paths: burgers.map((burger) => ({
			params: {
				slug: burger.slug,
			},
		})),
	};
}

export default BurgerDetails;
