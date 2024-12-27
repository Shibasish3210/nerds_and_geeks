import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import ProductDetails from "./pages/ProductDetails";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Cart from "./pages/Cart";

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/cart" element={<Cart />} />
				<Route path="/products" element={<HomePage />} />
				<Route path="/products/:id" element={<ProductDetails />} />
			</Routes>
			<Footer />
		</>
	);
}

export default App;
