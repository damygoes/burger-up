import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import { GiHamburgerMenu } from "react-icons/gi";
import { IoBag } from "react-icons/io5";
import { AiFillCloseSquare } from "react-icons/ai";

import Logo from "../../assets/logo.svg";

import styles from "./Navbar.module.css";

const Navbar = () => {
	const cart = useSelector((state) => state.cart);
	// Router helps access the url path and params
	const router = useRouter();
	const currentRoute = router.pathname;
	// console.log(currentRoute);

	// State to monitor hamburger menu change
	const [toggleMenu, setToggleMenu] = useState(false);

	// Setting up nav items
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
					className={currentRoute == "/contact" ? "active" : ""}
				>
					{" "}
					<Link href="/contact">Contact</Link>
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
					className={currentRoute == "/getburger" ? "active" : ""}
				>
					{" "}
					<Link href="/getburger">Update Burger</Link>
				</li>
			</ul>
		</>
	);

	// **************************************************** //
	// Changing Navbar Background on Scroll
	const [scrollPosition, setScrollPosition] = useState(0);
	const handleScroll = () => {
		const position = window.pageYOffset;
		setScrollPosition(position);
		console.log(scrollPosition);
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	// function to monitor scroll behaviour on the window element

	// window.addEventListener("scroll", changeBackgroud);

	return (
		<section>
			<header className={styles.header}>
				<Link href="/">
					<div
						className={styles.logo}
						onClick={() => {
							setToggleMenu(false);
						}}
					>
						{" "}
						<Image
							src={Logo}
							alt="logo"
							onClick={() => {
								setToggleMenu(false);
							}}
						/>{" "}
					</div>
				</Link>
				<nav>
					<Menu />
				</nav>

				<div className={styles.iconContainer}>
					<Link href="/cart">
						<div className={styles.cartnumber}>
							{" "}
							<IoBag />{" "}
							{cart.cartItems.length >= 1 && (
								<div>
									<p> {cart.cartItems.length} </p>
								</div>
							)}
						</div>
					</Link>

					<p> log in </p>
					<button> sign up </button>
				</div>

				<div className={styles.mobileContainer}>
					{toggleMenu ? (
						<AiFillCloseSquare size={37} onClick={() => setToggleMenu(false)} />
					) : (
						<GiHamburgerMenu size={37} onClick={() => setToggleMenu(true)} />
					)}
					{toggleMenu && (
						<div className={styles.mobileLinks + " " + styles.slideLeft}>
							<div>
								<Menu />
								<div className={styles.iconContainer}>
									<p> log in </p>
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
