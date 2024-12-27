export const productActions = Object.freeze({
	FETCH_INITIAL_PRODUCTS: "FETCH_INITIAL_PRODUCTS",
	FETCH_REMAINING_PRODUCTS: "FETCH_REMAINING_PRODUCTS",
	SORT_NAME_ASC: "SORT_NAME_ASC",
	SORT_NAME_DESC: "SORT_NAME_DESC",
	SORT_ORDER_VALUE_ASC: "SORT_ORDER_VALUE_ASC",
	SORT_ORDER_VALUE_DESC: "SORT_ORDER_VALUE_DESC",
	GET_SEARCHED_PRODUCTS: "GET_SEARCHED_PRODUCTS",
	FILTER_PRODUCTS: "FILTER_PRODUCTS",
	ADD_TO_CART: "ADD_TO_CART",
	REMOVE_FROM_CART: "REMOVE_FROM_CART",
	CLEAR_CART: "CLEAR_CART",
});

export const userActions = Object.freeze({
	ADD_TO_CART: "ADD_TO_CART",
	ADD_SELECTED_PRODUCT_TO_CART: "ADD_SELECTED_PRODUCT_TO_CART",
	REMOVE_FROM_CART: "REMOVE_FROM_CART",
	INCREMENT_QUANTITY: "INCREMENT_QUANTITY",
	DECREMENT_QUANTITY: "DECREMENT_QUANTITY",
	CLEAR_CART: "CLEAR_CART",
	SELECT_PRODUCT: "SELECT_PRODUCT",
});
