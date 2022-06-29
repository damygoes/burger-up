import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

import styles from "./Layout.module.css";

const Layout = (props) => {
	return (
		<section className={styles.section}>
			<Navbar />
			<main className={styles.main}> {props.children} </main>
			<Footer />
		</section>
	);
};

export default Layout;
