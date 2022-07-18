import { MongoClient, ObjectId } from "mongodb";

export default async function handler(req, res) {
	if (req.method === "PUT") {
		const replacementData = req.body;
		const { burgerId } = req.query;
		const client = await MongoClient.connect(
			`mongodb+srv://vercel-admin-user:KwoRI4n9DZHMzRkz@cluster0.nf34c.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
			// `mongodb+srv://damygoes:${process.env.DB_PASSWORD}@cluster0.nf34c.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
		);
		const db = client.db();
		const burgerCollection = db.collection("burger");
		const result = burgerCollection.updateOne(
			{
				_id: ObjectId(burgerId),
			},
			{ $set: { name: "Chicken Burger" } }
		);
		// const burgerCollection = await db.collection("burger");
		// const result = await burgerCollection.updateOne(
		// 	{ _id: burgerId },
		// 	replacementData
		// );
		// const result = await burgerCollection.find({});
		res.status(200).json({ data: result, burgerId, replacementData });
		client.close();
	}
}
