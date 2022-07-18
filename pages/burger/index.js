import { MongoClient } from "mongodb";

import Burgercard from "../../components/burgerCard/Burgercard";

import styles from "./Burger.module.css";

const AllBurgers = ({ burgers }) => {
	return (
		<div className={styles.container}>
			<h2> Our Collection </h2>
			<div className={styles.burgers}>
				<Burgercard data={burgers} />
			</div>
		</div>
	);
};

export async function getStaticProps() {
	// connecting to MongoDB to fetch all burger collection

	const client = await MongoClient.connect(
		// `mongodb+srv://vercel-admin-user:KwoRI4n9DZHMzRkz@cluster0.nf34c.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
		`mongodb+srv://damygoes:${process.env.DB_PASSWORD}@cluster0.nf34c.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
	);
	const db = client.db();
	const burgerCollection = db.collection("burger");
	const burgers = await burgerCollection.find({}).toArray();
	// res.status(200).json({ message: "Burger Collection Found" });
	client.close();

	return {
		props: {
			burgers: burgers.map((burger) => ({
				name: burger.name,
				slug: burger.slug,
				description: burger.description,
				image: burger.image,
				type: burger.type,
				isSpecial: burger.isSpecial,
				price: burger.price,
			})),
		},
	};
}
export default AllBurgers;
