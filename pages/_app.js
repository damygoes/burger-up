import { store } from "../app/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { ToastContainer } from "react-toastify";
import Layout from "../components/layout/Layout";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { getTotals } from "../features/cartSlice";

let persistor = persistStore(store);

store.dispatch(getTotals());

function MyApp({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<Layout>
				<ToastContainer />
				<PersistGate loading={null} persistor={persistor}>
					<Component {...pageProps} />
				</PersistGate>
			</Layout>
		</Provider>
	);
}

export default MyApp;
