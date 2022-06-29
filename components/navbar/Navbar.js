import { useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import { GiHamburgerMenu } from "react-icons/gi";
import { IoBag } from "react-icons/io5";
import { AiFillCloseSquare } from "react-icons/ai";

import Logo from "../../assets/logo.svg";

import styles from "./Navbar.module.css";

const Navbar = () => {
	const router = useRouter();
	const currentRoute = router.pathname;
	// console.log(currentRoute);

	const [toggleMenu, setToggleMenu] = useState(false);

	const Menu = () => (
		<>
			<ul
				onClick={() => {
					setToggleMenu(false);
				}}
			>
				<li
					onClick={() => {
						setToggleMenu(false);
					}}
					className={currentRoute == "/burger" ? "active" : ""}
				>
					{" "}
					<Link href="/burger">Burger</Link>
				</li>
				<li
					onClick={() => {
						setToggleMenu(false);
					}}
					className={currentRoute == "/create" ? "active" : ""}
				>
					{" "}
					<Link href="/create">Add New Burger</Link>
				</li>
				<li
					onClick={() => {
						setToggleMenu(false);
					}}
					className={currentRoute == "/contact" ? "active" : ""}
				>
					{" "}
					<Link href="/contact">Contact</Link>
				</li>
			</ul>
		</>
	);

	return (
		<section>
			<header className={styles.header}>
				<Link href="/">
					<div className={styles.logo}>
						{" "}
						<Image src={Logo} alt="logo" />{" "}
					</div>
				</Link>
				<nav>
					<Menu />
				</nav>
				<div className={styles.iconContainer}>
					<div className={styles.cartnumber}>
						{" "}
						<IoBag />
						<div>
							<p>5</p>
						</div>
					</div>

					<p> sign in </p>
					<button> sign up </button>
				</div>
				<div className={styles.mobileContainer}>
					{toggleMenu ? (
						<AiFillCloseSquare size={37} onClick={() => setToggleMenu(false)} />
					) : (
						<GiHamburgerMenu size={37} onClick={() => setToggleMenu(true)} />
					)}
					{toggleMenu && (
						<div className={styles.mobileLinks + " " + styles.scaleUpCenter}>
							<div>
								<Menu />
								<IoBag />
								<div className={styles.buttonContainer}>
									<p> sign in </p>
									<button> sign up </button>
								</div>
							</div>
						</div>
					)}
				</div>
			</header>
		</section>
	);
};

export default Navbar;
