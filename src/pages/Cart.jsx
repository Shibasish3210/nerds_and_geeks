import React, { useContext, useState } from "react";
import { ProductContext, UserContext } from "../contexts/contexts";
import { productActions, userActions } from "../contexts/actions";
import Checkout from "../components/layouts/Checkout";

const Cart = () => {
	const { state, dispatch: userDispatch } = useContext(UserContext);
	const { dispatch: productDispatch } = useContext(ProductContext);
	const { cartProducts, totalAmount, cartProductsQuantity } = state;
	const [isCheckingOut, setIsCheckingOut] = useState(false);

	const handleRemove = (id, price) => {
		userDispatch({
			type: userActions.REMOVE_FROM_CART,
			payload: {
				id: id,
				price: price,
			},
		});

		productDispatch({
			type: productActions.REMOVE_FROM_CART,
			payload: id,
		});
	};

	const handleIncreaseQuantity = (id, price, idx) => {
		userDispatch({
			type: userActions.INCREMENT_QUANTITY,
			payload: {
				price: price,
				index: idx,
			},
		});

		productDispatch({
			type: productActions.INCREMENT_QUANTITY,
			payload: id,
		});
	};

	const handleDecreaseQuantity = (id, price, idx) => {
		if (cartProductsQuantity[idx] === 1) {
			handleRemove(id, price);
			return;
		}
		userDispatch({
			type: userActions.DECREMENT_QUANTITY,
			payload: {
				price: price,
				index: idx,
			},
		});
		productDispatch({
			type: productActions.DECREMENT_QUANTITY,
			payload: id,
		});
	};

	const handleCheckOut = () => {
		setIsCheckingOut(true);
		handleEmptyCart();
	};

	const handleEmptyCart = () => {
		userDispatch({ type: userActions.CLEAR_CART });
		productDispatch({
			type: productActions.CLEAR_CART,
		});
	};

	return (
		<div className="mt-[10vh] h-full w-screen bg-gray-100 ">
			<h1 className="text-2xl font-bold py-4 w-full text-center border-b border-b-[#d4d4d4]">
				Your Cart
			</h1>
			{cartProducts.length === 0 ? (
				<p className="text-gray-500 text-center py-4 mt-[10vh]">
					Your cart is empty.
				</p>
			) : (
				<div className="w-[100vw]">
					<table
						width={"80%"}
						className=" mx-auto mt-4 bg-white shadow-md rounded-lg text-center"
					>
						<thead className="border-b text-xs sm:text-sm md:text-base border-b-[#d4d4d4]">
							<tr>
								<th className="p-2 md:p-4">Item</th>
								<th className="p-2 md:p-4">Quantity</th>
								<th className="p-2 md:p-4">Price</th>
								<th className="p-2 md:p-4">Actions</th>
							</tr>
						</thead>
						<tbody>
							{cartProducts.map((item, idx) => (
								<tr key={item.id} className="text-center">
									<td className="p-2 md:p-4">
										<div className="flex items-center md:gap-4 mx-auto text-[10px] md:text-base">
											<img
												src={item.image}
												alt={item.name}
												className="hidden sm:block h-6 w-6 text-nowrap"
											/>
											<span>{item.name}</span>
										</div>
									</td>
									<td className="p-2 md:p-4 flex items-center justify-center md:gap-4 align-middle mt-2">
										<button
											onClick={() =>
												handleDecreaseQuantity(
													item.id,
													item.price,
													idx,
												)
											}
											className="bg-gray-300 text-black h-4 md:h-6 w-4 md:w-6 rounded-full hover:bg-gray-400 text-[10px] md:text-base"
										>
											-
										</button>
										<span className="mx-2 text-[10px] md:text-base">
											{cartProductsQuantity[idx]}
										</span>
										<button
											onClick={() =>
												handleIncreaseQuantity(
													item.id,
													item.price,
													idx,
												)
											}
											className="bg-gray-300 text-black  h-4 md:h-6 w-4 md:w-6 rounded-full hover:bg-gray-400 text-[10px] md:text-base"
										>
											+
										</button>
									</td>
									<td className="p-2 md:p-4 text-[10px] md:text-base">
										$
										{(
											item.price *
											cartProductsQuantity[idx]
										).toFixed(2)}
									</td>
									<td className="p-2 md:p-4">
										<button
											onClick={() =>
												handleRemove(
													item.id,
													item.price,
												)
											}
											className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 text-xs md:text-sm lg:text-base"
										>
											Remove
										</button>
									</td>
								</tr>
							))}
						</tbody>
						<tfoot className="border-y border-y-[#d4d4d4]">
							<tr>
								<th className="text-sm sm:text-base md:text-xl font-bold h-12 py-2 md:py-5">
									Total:
								</th>
								<td></td>
								<td className="font-bold text-xs sm:text-sm md:text-base">
									${totalAmount.toFixed(2)}
								</td>
							</tr>
						</tfoot>
					</table>

					<div className=" w-[80%] mx-auto flex justify-between mt-4">
						<button
							onClick={handleEmptyCart}
							className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 text-sm sm:text-base md:text-xl"
						>
							Empty Cart
						</button>
						<button
							onClick={handleCheckOut}
							className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 text-sm sm:text-base md:text-xl"
						>
							Checkout
						</button>
					</div>
				</div>
			)}

			{isCheckingOut && <Checkout />}
		</div>
	);
};

export default Cart;
