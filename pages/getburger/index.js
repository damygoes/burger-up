// import { MongoClient } from "mongodb";
import Image from "next/image";
import { useState } from "react";
import connectToMongoDB from "../../utils/mongodbconnect";

import styles from "./Getburger.module.css";

const getBurger = () => {
	const [searchInput, setSearchInput] = useState("");
	const [returnedData, setReturnedData] = useState([]);
	const [isEdit, setIsEdit] = useState(false);

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
			</div>
			{isEdit && (
				<form className={styles.formModal}>
					<label htmlFor="name"> Burger Name </label>
					<input
						type="text"
						name="name"
						placeholder="Enter burger name"
						required
						onChange={(e) => setBurgerName(e.target.value)}
					/>
					<label htmlFor="slug"> Slug </label>
					<input
						type="text"
						name="slug"
						id="slug"
						placeholder="Enter Slug"
						required
						onChange={(e) => setBurgerSlug(e.target.value)}
					/>
					<label htmlFor="description"> Description </label>
					<input
						type="text"
						name="description"
						id="description"
						placeholder="Describe Burger"
						required
						onChange={(e) => setBurgerDescription(e.target.value)}
					/>
					<label htmlFor="image"> Image </label>
					<input
						type="url"
						name="image"
						id="image"
						placeholder="Enter Image URL"
						required
						onChange={(e) => setBurgerImage(e.target.value)}
					/>
					<div className={styles.fieldcontainer}>
						<div className={styles.fieldgroup}>
							<div className={styles.price}>
								<label htmlFor="price"> Price</label>
								<input
									type="number"
									name="price"
									id="price"
									placeholder="price"
									step="0.01"
									required
									onChange={(e) => setBurgerPrice(e.target.value)}
								/>
							</div>
							<fieldset>
								<legend>Special</legend>
								<div>
									<input
										type="checkbox"
										id="special"
										name="special"
										onClick={() => setIsBurgerSpecial(true)}
									/>
									<label htmlFor="yes">Yes</label>
								</div>
							</fieldset>
							<fieldset>
								<legend>Type</legend>
								<div>
									<input
										type="checkbox"
										id="type"
										name="vegetarian"
										onClick={(e) => setBurgerType(e.target.name)}
									/>
									<label htmlFor="vegetarian">Vegetarian</label>
								</div>
								<div>
									<input
										type="checkbox"
										id="type"
										name="vegan"
										onClick={(e) => setBurgerType(e.target.name)}
									/>
									<label htmlFor="vegan">Vegan</label>
								</div>
								<div>
									<input
										type="checkbox"
										id="type"
										name="cheese"
										onClick={(e) => setBurgerType(e.target.name)}
									/>
									<label htmlFor="cheese">Cheese</label>
								</div>
								<div>
									<input
										type="checkbox"
										id="type"
										name="normal"
										onClick={(e) => setBurgerType(e.target.name)}
									/>
									<label htmlFor="normal">Normal</label>
								</div>
							</fieldset>
						</div>
						<button
							type="submit"
							onClick={() => {
								setIsEdit(false);
							}}
						>
							update
						</button>
					</div>
				</form>
			)}
			{returnedData.map((burger, index) => (
				<div className={styles.card} key={index}>
					<div className={styles.burgerCard}>
						<div className={styles.imageContainer}>
							<Image src={burger.image} alt={burger.name} layout="fill" />
						</div>

						<div className={styles.content}>
							<h3> Name: {burger.name} </h3>

							<div className={styles.cta}>
								<p> Price: ${burger.price} </p>
								<p> Type: {burger.type} </p>
							</div>
							<button
								type="button"
								onClick={() => {
									setIsEdit(true);
								}}
							>
								{" "}
								edit{" "}
							</button>
						</div>
					</div>
				</div>
			))}
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
