// import { MongoClient } from "mongodb";
import Image from "next/image";
import { useState } from "react";
import connectToMongoDB from "../../utils/mongodbconnect";

import styles from "./Getburger.module.css";

const getBurger = () => {
	const [searchInput, setSearchInput] = useState("");
	const [returnedData, setReturnedData] = useState([]);
	// let returnedData = [];

	async function getBurger(e) {
		e.preventDefault();
		await fetch(`/api/getburger/${searchInput}`)
			.then((response) => {
				return response.json();
			})
			.then((response) => {
				if (response.data.length < 1) {
					alert("No burger found");
				}
				setReturnedData((returnedData = response.data));

				// setReturnedData([response.data]);
			})
			.catch((err) => {});
		// const res = await fetch(`/api/getburger/${searchInput}`);
		// const result = res.json();
		//
		//
		// console.log(returnedData);
		// console.log(result);
	}
	// console.log(returnedData);

	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<h2> Update Burger Info</h2>
				<form onSubmit={getBurger}>
					<label htmlFor="name"> Burger Name </label>
					<input
						type="text"
						id="name"
						name="name"
						placeholder="Enter Burger Name"
						value={searchInput}
						required
						onChange={(e) => {
							setSearchInput(e.target.value);
						}}
					/>
					<button type="submit"> Search </button>
				</form>
				{/* <h1> {returnedData[0].name} </h1> */}
			</div>
			{returnedData.map((burger, index) => (
				<div className={styles.card} key={index}>
					<div className={styles.burgerCard}>
						<div className={styles.imageContainer}>
							<Image src={burger.image} alt={burger.name} layout="fill" />
						</div>

						<div className={styles.content}>
							<h3> {burger.name} </h3>

							<div className={styles.cta}>
								<p> ${burger.price} </p>
							</div>
						</div>
					</div>
				</div>
			))}

			{/* {same && (
				
			)} */}
			{/* {burger.name === searchInput && (
				<div className={styles.card}>
					<div className={styles.burgerCard} key={burger.slug}>
						<div className={styles.imageContainer}>
							<Image src={burger.image} alt={burger.name} layout="fill" />
						</div>

						<div className={styles.content}>
							<h3> {burger.name} </h3>

							<div className={styles.cta}>
								<p> ${burger.price} </p>
							</div>
						</div>
					</div>
				</div>
			)} */}
		</div>
	);
};

// export async function getStaticProps() {
// 	// connecting to MongoDB to fetch all burger collection
// 	const client = await MongoClient.connect(
// 		`mongodb+srv://damygoes:${process.env.DB_PASSWORD}@cluster0.nf34c.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
// 	);
// 	const db = client.db();
// 	const burgerCollection = db.collection("burger");
// 	const result = await burgerCollection.findOne({}, { name: 1 });
// 	console.log(result);
// 	client.close();
// 	// res.status(200).json({ message: "Burger Found!" });

// 	return {
// 		props: {
// 			burger: {
// 				name: burger.name,
// 				slug: burger.slug,
// 				description: burger.description,
// 				image: burger.image,
// 				type: burger.type,
// 				isSpecial: burger.isSpecial,
// 				price: burger.price,
// 			},
// 		},
// 	};
// }

export default getBurger;
