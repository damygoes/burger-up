import Navbar from "../navbar/Navbar";

import styles from "./Layout.module.css";

const Layout = (props) => {
	return (
		<section className={styles.section}>
			<Navbar />
			<main className={styles.main}> {props.children} </main>
		</section>
	);
};

export default Layout;
