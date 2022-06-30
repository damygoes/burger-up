import { useState } from "react";
import { useRouter } from "next/router";

import styles from "./Newburger.module.css";

// const { burgerName, slug, description, image, type, special, price, quantity } =
// 	formData;

const BurgerForm = () => {
	// ####################################
	const [burgerName, setBurgerName] = useState("");
	const [burgerSlug, setBurgerSlug] = useState("");
	const [burgerDescription, setBurgerDescription] = useState("");
	const [burgerImage, setBurgerImage] = useState("");
	const [burgerType, setBurgerType] = useState("");
	const [isBurgerSpecial, setIsBurgerSpecial] = useState(false);
	const [burgerPrice, setBurgerPrice] = useState(0);

	// ************************************

	// ####################################

	async function handleSubmit(e) {
		e.preventDefault();

		const body = {
			name: burgerName,
			slug: burgerSlug,
			description: burgerDescription,
			image: burgerImage,
			type: burgerType,
			isSpecial: isBurgerSpecial,
			price: parseFloat(burgerPrice),
		};

		try {
			const response = await fetch("/api/create", {
				method: "POST",
				body: JSON.stringify(body),
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await response.json();
			console.log("New burger added!", data);
		} catch {
			(error) => {
				console.log(error, "Failed to add new burger!");
			};
		}
	}

	// ####################################
	function reset() {
		setBurgerName("");
		setBurgerSlug("");
		setBurgerDescription("");
		setBurgerImage("");
		setBurgerType("");
		setIsBurgerSpecial(false);
		setBurgerPrice(0);
	}

	// ************************************

	// ************************************

	return (
		<section className={styles.main}>
			<section className={styles.head}>
				<h2>add new burger </h2>
			</section>
			<form onSubmit={handleSubmit}>
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

				<button type="submit" onClick={handleSubmit}>
					add to stock
				</button>
			</form>
		</section>
	);
};

export default BurgerForm;
