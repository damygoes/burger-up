import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { MongoClient } from "mongodb";

import HeaderLogo from "../assets/header.png";
import BurgerPNG from "../assets/burger-wing.png";
import Specialcard from "../components/specialCard/Specialcard";

import styles from "../styles/Home.module.css";

const Home = ({ burgers }) => {
	return (
		<div className={styles.container}>
			<Head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta http-equiv="X-UA-Compatible" content="ie=edge"></meta>
				<meta name="description" content="Burger Shop designed with NextJS" />
				<title>Burger UP | Best Burger Shop in Town</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<header className={styles.head}>
					<div className={styles.left}>
						<h4>Welcome to the burger palace</h4>
						<h1>
							Fresh & Tasty <span>everytime!</span>{" "}
						</h1>
						<p>The best burger place in town. Let's Burger UP!</p>
						<div className={styles.cta}>
							<Link href={"/burger"}>
								<button type="button">order now</button>
							</Link>
							<Link href={"/contact"}>
								<button type="button">make request</button>
							</Link>
						</div>
					</div>
					<div className={styles.right}>
						<Image src={HeaderLogo} al="Logo" />
					</div>
				</header>
				<section className={styles.specials}>
					<Specialcard data={burgers} />
				</section>
			</main>
			<section className={styles.patronize}>
				<h3 data-aos="ease-in">
					{" "}
					why should you <span>buy?</span>{" "}
				</h3>
				<span> because,</span>
				<div className={styles.imageContainer}>
					<Image src={BurgerPNG} layout="fill" alt="Burger" />
				</div>
				<p>fast delivery</p>
				<p>best quality</p>
				<p>natural ingredients</p>
				<p>huge quantity</p>
			</section>
			<blockquote className={styles.quote}>
				At the base level, a burger is a piece of meat and a bun with something on
				it. It's simple but it makes a lot of people happy.
			</blockquote>
		</div>
	);
};

export async function getStaticProps() {
	// connecting to MongoDB to fetch all burger collection

	const client = await MongoClient.connect(
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

export default Home;
