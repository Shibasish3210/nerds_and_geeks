import ProductFilter from "../components/layouts/ProductFilter";
import Sorting from "../components/layouts/Sorting";
import SearchBar from "../components/layouts/SearchBar";
import ProductShowcase from "../features/ProductShowCase";
import { products } from "../utils/dummyData";

const HomePage = () => {
	return (
		<div className="h-screen w-[96vw] mx-auto overflow-y-scroll mt-[10vh] no-scrollbar">
			<div className="flex flex-col no-scrollbar  w-[90vw] mx-auto">
				<ProductFilter />
				<div className="flex flex-wrap justify-between items-center gap-4 px-6 py-2 w-full">
					<Sorting />
					<SearchBar />
				</div>
				<ProductShowcase />
			</div>
		</div>
	);
};

export default HomePage;
