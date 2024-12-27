import { useMemo, useReducer } from "react";
import PropTypes from "prop-types";
import { products } from "../../utils/dummyData";
import { productActions } from "../actions";
import { ProductContext } from "../contexts";

const InitialState = {
	products: [],
	currentPage: 0,
	allProducts: [],
	totalLength: 0,
	isSearchResult: false,
	isSortResult: false,
	isFilterResult: false,
};
const itemsPerPage = 12;
let rawProducts = products;

const ReturnInitialProducts = (state, rawProducts, isSorting = true) => {
	return {
		...state,
		products:
			state.products.length !== itemsPerPage || isSorting
				? rawProducts.slice(0, itemsPerPage)
				: state.products,
		allProducts: rawProducts.slice(0, itemsPerPage),
		totalLength: rawProducts.length,
		currentPage: 1,
		isSearchResult: false,
		isSortResult: isSorting,
		isFilterResult: false,
	};
};

const ProductReducer = (state, action) => {
	switch (action.type) {
		case productActions.FETCH_INITIAL_PRODUCTS:
			return ReturnInitialProducts(state, rawProducts, false);

		case productActions.FETCH_REMAINING_PRODUCTS: {
			return state.allProducts.length === state.totalLength
				? {
						...state,
						products: rawProducts.slice(
							(action.payload - 1) * itemsPerPage,
							action.payload * itemsPerPage,
						),
						currentPage: action.payload,
				  }
				: {
						...state,
						products: rawProducts.slice(
							(action.payload - 1) * itemsPerPage,
							action.payload * itemsPerPage,
						),
						allProducts: state.allProducts.concat(
							rawProducts.slice(
								(action.payload - 1) * itemsPerPage,
								action.payload * itemsPerPage,
							),
						),
						currentPage: action.payload,
				  };
		}
		case productActions.SORT_NAME_ASC: {
			rawProducts = rawProducts.sort((a, b) =>
				a.name.localeCompare(b.name),
			);
			return ReturnInitialProducts(state, rawProducts);
		}
		case productActions.SORT_NAME_DESC: {
			rawProducts = rawProducts.sort((a, b) =>
				b.name.localeCompare(a.name),
			);
			return ReturnInitialProducts(state, rawProducts);
		}
		case productActions.SORT_ORDER_VALUE_ASC: {
			console.log("here");
			rawProducts = rawProducts.sort((a, b) => a.price - b.price);
			return ReturnInitialProducts(state, rawProducts);
		}
		case productActions.SORT_ORDER_VALUE_DESC: {
			rawProducts = rawProducts.sort((a, b) => b.price - a.price);
			return ReturnInitialProducts(state, rawProducts);
		}
		case productActions.GET_SEARCHED_PRODUCTS: {
			const searchResults = products.filter((product) =>
				product.name
					.toLowerCase()
					.includes(action.payload.toLowerCase()),
			);
			return {
				products: searchResults,
				currentPage: 1,
				allProducts: products,
				totalLength: searchResults.length,
				isFilterResult: false,
				isSortResult: false,
				isSearchResult: true,
			};
		}
		case productActions.FILTER_PRODUCTS: {
			if (action.payload === "All")
				return ReturnInitialProducts(state, rawProducts);
			const filteredResults = products.filter(
				(product) => product.category === action.payload,
			);
			return {
				products: filteredResults,
				currentPage: 1,
				allProducts: products,
				totalLength: filteredResults.length,
				isFilterResult: true,
				isSortResult: false,
				isSearchResult: false,
			};
		}
		case productActions.ADD_TO_CART: {
			rawProducts = rawProducts.map((product) =>
				product.id === action.payload
					? { ...product, isInCart: true }
					: product,
			);
			return {
				...state,
				products: state.products.map((product) =>
					product.id === action.payload
						? { ...product, isInCart: true }
						: product,
				),
			};
		}
		case productActions.REMOVE_FROM_CART: {
			rawProducts = rawProducts.map((product) =>
				product.id === action.payload
					? { ...product, isInCart: false }
					: product,
			);
			return {
				...state,
				products: state.products.map((product) =>
					product.id === action.payload
						? { ...product, isInCart: false }
						: product,
				),
			};
		}
		case productActions.CLEAR_CART: {
			rawProducts = rawProducts.map((product) => ({
				...product,
				isInCart: false,
			}));
			return {
				...state,
				products: state.products.map((product) => ({
					...product,
					isInCart: false,
				})),
			};
		}
		default:
			return state;
	}
};

const ProductContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(ProductReducer, InitialState);

	const contextValue = useMemo(
		() => ({ state, dispatch }),
		[state, dispatch],
	);
	return (
		<ProductContext.Provider value={contextValue}>
			{children}
		</ProductContext.Provider>
	);
};
ProductContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export default ProductContextProvider;
