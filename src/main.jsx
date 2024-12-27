import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ProductContextProvider from "./contexts/providers/ProductContextProvider.jsx";
import UserContextProvider from "./contexts/providers/UserContext.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<BrowserRouter>
			<ProductContextProvider>
				<UserContextProvider>
					<App />
				</UserContextProvider>
			</ProductContextProvider>
		</BrowserRouter>
	</StrictMode>,
);