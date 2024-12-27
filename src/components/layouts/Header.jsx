import { Link, NavLink } from "react-router-dom";
import CartButton from "./CartButton";
import Home from "../../assets/icons/home.svg";
import Products from "../../assets/icons/order-multiple.svg";
import { motion } from "framer-motion";

const Header = () => {
	return (
		<header className="fixed top-0 left-0 w-full z-10 h-[10vh] py-2 px-6 bg-slate-800 text-white text-center flex items-center justify-between">
			<motion.h1
				initial={{ opacity: 0, rotateY: "360deg" }}
				animate={{ opacity: 1, rotateY: "0deg" }}
				transition={{ ease: "easeOut", duration: 1 }}
				className="text-xl sm:text-2xl md:text-3xl font-medium font-sans"
			>
				<Link to="/">Geeks Store</Link>
			</motion.h1>

			<div className="flex gap-2 sm:gap-6 md:gap-8">
				<NavLink
					className="nav_link px-4 py-3 hover:bg-white group
					 hover:text-slate-800 rounded-md flex items-center justify-center gap-2 h-8  md:w-32"
					to="/"
				>
					<img src={Home} alt="home" className="w-3 md:w-5 invert" />
					<p className="hidden sm:block">Home</p>
				</NavLink>
				<NavLink
					className="nav_link px-4 py-3 hover:bg-white group
					 hover:text-slate-800 rounded-md flex items-center justify-center gap-2 h-8  md:w-32"
					to="/products"
				>
					<img
						src={Products}
						alt="products"
						className="w-4 md:w-6 invert"
					/>
					<p className="hidden sm:block">Products</p>
				</NavLink>
			</div>
			<CartButton />
		</header>
	);
};

export default Header;
