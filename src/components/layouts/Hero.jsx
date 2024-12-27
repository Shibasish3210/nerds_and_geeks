import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Electronics from "../../assets/images/electronics.png";
import Sale from "../../assets/images/sale.png";
import Gifts from "../../assets/images/gifts.jpg";
import Welcome from "../../assets/images/welcome.png";
import DropdownIcon from "../../assets/icons/dropdown.svg";

const slides = [
	{
		title: "✨ Welcome to Geeks Store",
		subHeader: "Your one-stop shop for premium gadgets, fashion, and more!",
		image: "",
		background: Welcome,
		buttonText: "Shop Now",
		buttonLink: "/products",
	},
	{
		title: "🎅 Perfect Gifts for Your Loved Ones!",
		subHeader: "Shop thoughtful gifts and spread joy this holiday season.",
		image: "",
		background: Gifts,
		buttonText: "Explore Now",
		buttonLink: "/products",
	},
	{
		title: "🎄Christmas Sale is Live!🎁",
		subHeader:
			"Get up to 50% OFF on your favorite products. Offer ends 31st December.",
		image: Sale,
		buttonText: "Shop Now",
		buttonLink: "/products",
	},
	{
		title: "🎉 Special Discounts on Electronics!",
		subHeader: "Get the best deals on top electronics brands.",
		image: Electronics,
		buttonText: "Save Big",
		buttonLink: "/products",
	},
];

const HeroSection = () => {
	const [currentSlide, setCurrentSlide] = useState(0);

	const nextSlide = () => {
		setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
	};

	const prevSlide = () => {
		setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
	};

	useEffect(() => {
		// const interval = setInterval(nextSlide, 4000);
		// return () => clearInterval(interval);
	}, []);

	return (
		<section
			style={
				slides[currentSlide].background
					? {
							background: `url(${slides[currentSlide].background}) center center/cover`,
					  }
					: {}
			}
			className={`bg-gradient-to-r from-slate-200 to-teal-800 text-white py-16 h-[80vh] mt-[10vh]`}
		>
			<div className="container mx-auto flex flex-col items-center h-full justify-between text-center gap-6">
				<div className="flex flex-col md:flex-row md:mt-4 items-center">
					<div className="flex flex-col justify-center space-y-4 ">
						<motion.h1
							style={{
								textShadow: "rgb(0 0 0 / 81%) 4px 5px 8px",
							}}
							className="text-xl md:text-6xl font-bold tracking-wide"
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
						>
							{slides[currentSlide].title}
						</motion.h1>
						<motion.h2
							style={{
								textShadow: "rgb(0 0 0 / 81%) 4px 5px 8px",
							}}
							className="text-lg md:text-2xl font-medium"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, ease: "linear" }}
						>
							{slides[currentSlide].subHeader}
						</motion.h2>
					</div>
					{slides[currentSlide].image && (
						<div className="h-[30vh]">
							<img
								src={slides[currentSlide].image}
								alt="Slides"
								className="h-full w-auto object-cover"
							/>
						</div>
					)}
				</div>

				<div
					className={`flex flex-col items-center ${
						slides[currentSlide].image && "mb-4"
					}`}
				>
					<motion.button
						className={`bg-slate-800 text-rose-500 font-semibold w-[10rem] px-4 md:px-6 py-3 rounded-lg shadow-md hover:scale-105 transition-transform ${
							!slides[currentSlide].image ? "mt-20" : ""
						}`}
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{ delay: 0.3, duration: 0.6 }}
					>
						<Link
							className="text-sm md:text-base"
							to={slides[currentSlide].buttonLink}
						>
							{slides[currentSlide].buttonText}
						</Link>
					</motion.button>
					<div className="flex space-x-4 mt-6">
						<button
							onClick={prevSlide}
							className="bg-slate-800 text-rose-500 px-4 py-2 rounded "
						>
							<img
								src={DropdownIcon}
								className="rotate-90 rose-filter"
								alt="Previous"
							/>
						</button>
						<div className="flex space-x-2 mt-4">
							{slides.map((_, index) => (
								<button
									key={index}
									onClick={() => setCurrentSlide(index)}
									className={`w-3 h-3 rounded-full ${
										index === currentSlide
											? "bg-rose-500"
											: "bg-white"
									}`}
								></button>
							))}
						</div>
						<button
							onClick={nextSlide}
							className="bg-slate-800 text-rose-500 px-4 py-2 rounded"
						>
							<img
								src={DropdownIcon}
								className="-rotate-90 rose-filter"
								alt="Next"
							/>
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
