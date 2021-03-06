import { useRouter } from "next/router";
import { useState } from "react";

import Image from "next/image";
import ContactBurger from "../../assets/contact.jpg";

import styles from "./Contact.module.css";

const Contact = () => {
	const router = useRouter();

	const [fullName, setFullName] = useState("");

	function handleFormReset() {
		setFullName("");
		setEmail("");
		setMessage("");
	}

	function handleFormSubmit() {
		alert(
			`Thank you for contacting us. We will get back to you shortly, ${fullName}`
		);
		setTimeout(() => {
			router.push("/");
		}, 100);
	}

	return (
		<div className={styles.contact}>
			<section className={styles.head}>
				<h2>contact us</h2>
			</section>
			<section className={styles.content}>
				<section className={styles.left}>
					<p>we&apos;d love to hear from you</p>
					<form className={styles.cardform}>
						<div className={styles.input}>
							<input
								type="text"
								placeholder="Alexander Parkinson"
								required
								onChange={(e) => {
									setFullName(e.target.value);
								}}
							/>
							<label className={styles.inputlabel}>Full name</label>
						</div>
						<div className={styles.input}>
							<input type="email" placeholder="vlockn@gmail.com" required />
							<label className={styles.inputlabel}>Email</label>
						</div>
						<div className="input">
							{/* <label className={styles.inputlabel}>Message</label> */}
							<textarea
								name="message"
								id="message"
								cols="30"
								rows="10"
								placeholder="Message"
								required
							/>
						</div>
						<div className={styles.buttoncontainer}>
							<button
								type="button"
								onClick={() => {
									handleFormSubmit();
								}}
							>
								send
							</button>
						</div>
					</form>
					<div className={styles.forminfo}>
						prefer email?{" "}
						<a href="mailto: badadamilola@gmail.com ">contact@burgerup.com</a>
					</div>
				</section>
				<section className={styles.right}>
					<Image src={ContactBurger} alt="burger" layout="fill" />
					<div className={styles.locationgroup}>
						<h5>Our locations</h5>
						<div className={styles.location}>
							<div>
								<h6>Melbourne</h6>
								<p>100 Flinders Street</p>
								<p>Melbourne VIC 3000 AU</p>
							</div>
							<div>
								<h6>London</h6>
								<p>100 Oxford Street</p>
								<p>London W1D 1LL UK</p>
							</div>
							<div>
								<h6>Sweden</h6>
								<p>Drottninggatan 100</p>
								<p>111 60 Stockholm SE</p>
							</div>
						</div>
					</div>
				</section>
			</section>
		</div>
	);
};

export default Contact;
