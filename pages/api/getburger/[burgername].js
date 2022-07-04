// import connectToMongoDB from "../../../utils/mongodbconnect";
import { MongoClient } from "mongodb";

export default async function handler(req, res) {
	const { burgername } = req.query;
	const client = await MongoClient.connect(
		`mongodb+srv://damygoes:${process.env.DB_PASSWORD}@cluster0.nf34c.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
	);
	const db = client.db();
	const burgerCollection = db.collection("burger");
	const result = await burgerCollection.findOne({
		name: { $regex: burgername, $options: "i" },
	});
	if (result !== null) {
		res.json({ data: [result] });
	} else {
		res.json({ data: [] });
	}
	client.close();
}
