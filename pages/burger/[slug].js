import { MongoClient } from "mongodb";
import { useRouter } from "next/router";
import Image from "next/image";
import { HiOutlineArrowLeft, HiMinus, HiPlus } from "react-icons/hi";

import styles from "./Burgerdetails.module.css";

import React, { useState } from "react";

const BurgerDetails = ({ burger }) => {
	const [count, setCount] = useState(0);

	function increaseCountHandler() {
		let newCount = count++;
		setCount(newCount);
	}
	function decreaseCountHandler() {
		let newCount = count--;
		setCount(newCount);
	}

	const router = useRouter();

	return (
		<div
			className={styles.container}
			onClick={() => {
				router.push("/burger");
			}}
		>
			<div className={styles.backnav}>
				<HiOutlineArrowLeft /> back
			</div>
			<div className={styles.content}>
				<div className={styles.imageContainer}>
					<Image
						src={burger.image}
						alt={burger.title}
						layout="fill"
						// width={1300}
						// height={1300}
					/>
				</div>
				<div className={styles.wrapper}>
					<div className={styles.innerWrapper}>
						<div>
							<h3> {burger.name} </h3>
							<p> type: {burger.type} </p>
						</div>
						<p> ${burger.price} </p>
					</div>
					<div className={styles.details}>
						<div> Vegan </div>
						<div> Calories </div>
						<div> Natural </div>
					</div>
					<div className={styles.actions}>
						<div>
							<HiMinus onClick={decreaseCountHandler} />
							<p> {count} </p>
							<HiPlus onClick={increaseCountHandler} />
						</div>
						<button>buy now</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export async function getStaticProps(context) {
	const pathSlug = context.params.slug;
	const client = await MongoClient.connect(
		`mongodb+srv://damygoes:${process.env.DB_PASSWORD}@cluster0.nf34c.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
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
			},
		},
	};
}

export async function getStaticPaths() {
	const client = await MongoClient.connect(
		`mongodb+srv://damygoes:${process.env.DB_PASSWORD}@cluster0.nf34c.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
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
