import { useMemo, useReducer } from "react";
import PropTypes from "prop-types";
import { UserContext } from "../contexts";
import { userActions } from "../actions";

const InitialState = {
	cartProducts: [],
	totalAmount: 0,
	cartProductsQuantity: [],
	selectedProduct: null,
};

const UserReducer = (state, action) => {
	switch (action.type) {
		case userActions.ADD_TO_CART: {
			const newCartProducts = [...state.cartProducts, action.payload];
			return {
				...state,
				cartProducts: newCartProducts,
				totalAmount: newCartProducts.reduce(
					(acc, product) => acc + product.price,
					0,
				),
				cartProductsQuantity: [...state.cartProductsQuantity, 1],
			};
		}
		case userActions.ADD_SELECTED_PRODUCT_TO_CART: {
			const newCartProducts = [...state.cartProducts, action.payload];
			state.selectedProduct.isInCart = true;
			return {
				cartProducts: newCartProducts,
				totalAmount: newCartProducts.reduce(
					(acc, product) => acc + product.price,
					0,
				),
				cartProductsQuantity: [...state.cartProductsQuantity, 1],
				selectedProduct: state.selectedProduct,
			};
		}
		case userActions.REMOVE_FROM_CART: {
			return {
				...state,
				cartProducts: state.cartProducts.filter(
					(product) => product.id !== action.payload.id,
				),
				totalAmount: state.totalAmount - action.payload.price,
				cartProductsQuantity: state.cartProductsQuantity.filter(
					(product) => product.id !== action.payload.id,
				),
			};
		}
		case userActions.INCREMENT_QUANTITY: {
			return {
				...state,
				totalAmount: state.totalAmount + action.payload.price,
				cartProductsQuantity: state.cartProductsQuantity.map(
					(quantity, index) =>
						index === action.payload.index
							? quantity + 1
							: quantity,
				),
			};
		}
		case userActions.DECREMENT_QUANTITY: {
			return {
				...state,
				totalAmount: state.totalAmount - action.payload.price,
				cartProductsQuantity: state.cartProductsQuantity.map(
					(quantity, index) =>
						index === action.payload.index
							? quantity - 1
							: quantity,
				),
			};
		}
		case userActions.CLEAR_CART: {
			return InitialState;
		}
		case userActions.SELECT_PRODUCT: {
			return {
				...state,
				selectedProduct: action.payload,
			};
		}
		default:
			return state;
	}
};

const UserContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(UserReducer, InitialState);

	const contextValue = useMemo(
		() => ({ state, dispatch }),
		[state, dispatch],
	);
	return (
		<UserContext.Provider value={contextValue}>
			{children}
		</UserContext.Provider>
	);
};
UserContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export default UserContextProvider;
