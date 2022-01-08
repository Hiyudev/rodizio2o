import { Dispatch, SetStateAction } from "react";
import useScreen from "../../hooks/useScreen";
import useWindowSize from "../../hooks/useWindowSize";
import HomeIcon from "../../icons/Home";
import ListIcon from "../../icons/List";
import SettingsIcon from "../../icons/Settings";
import { RodizioPages } from "../../shared";

interface INav {
	currentPage: RodizioPages;
	changePage: Dispatch<SetStateAction<RodizioPages>>;
}

function Navbar({ currentPage, changePage }: INav) {
	const switchPage = (page: RodizioPages) => {
		if (currentPage === page) {
			changePage(RodizioPages.Home);
		} else {
			changePage(page);
		}
	};

	const { isTablet } = useScreen();

	const activeClass = "dark:text-blue-400 text-blue-600";

	return (
		<nav className="flex flex-row justify-end align-middle p-4">
			<button
				className={`flex justify-center hover:text-blue-500 items-center w-[2.5rem] h-[2.5rem] transition-colors ${
					currentPage === RodizioPages.Home ? activeClass : ""
				}`}
				onClick={() => changePage(RodizioPages.Home)}
			>
				<HomeIcon />
			</button>
			{isTablet && (
				<button
					className={`flex justify-center hover:text-blue-500 items-center w-[2.5rem] h-[2.5rem] transition-colors ${
						currentPage === RodizioPages.List ? activeClass : ""
					}`}
					onClick={() => switchPage(RodizioPages.List)}
				>
					<ListIcon />
				</button>
			)}
			<button
				className={`flex justify-center hover:text-blue-500 items-center w-[2.5rem] h-[2.5rem] transition-colors ${
					currentPage === RodizioPages.Config ? activeClass : ""
				}`}
				onClick={() => switchPage(RodizioPages.Config)}
			>
				<SettingsIcon />
			</button>
		</nav>
	);
}

export default Navbar;
