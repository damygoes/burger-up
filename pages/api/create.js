// route for adding new burger to mongodb
import { MongoClient } from "mongodb";

async function handler(req, res) {
	try {
		if (req.method === "POST") {
			const data = req.body;

			const client = await MongoClient.connect(
				`mongodb+srv://damygoes:${process.env.DB_PASSWORD}@cluster0.nf34c.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
			);
			const db = client.db();
			const burgerCollection = db.collection("burger");
			const result = await burgerCollection.insertOne(data);
			console.log(result);
			client.close();
			res.status(200).json({ message: "Burger Added Successfully!" });
		}
	} catch {
		(error) => {
			res
				.status(500)
				.json({ message: "Request could not be processed at the moment" });
		};
	}
}

export default handler;
