import { store } from "../app/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import Layout from "../components/layout/Layout";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<Layout>
				<ToastContainer />
				<Component {...pageProps} />{" "}
			</Layout>
		</Provider>
	);
}

export default MyApp;
