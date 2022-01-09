import { Dispatch, SetStateAction } from "react";
import HomeIcon from "../../icons/Home";
import ListIcon from "../../icons/List";
import SettingsIcon from "../../icons/Settings";
import { RodizioPages } from "../../shared";
import ThemeSwitcher from "../ui/ThemeSwitcher";

interface INav {
	hasThemeSwitcher: boolean;
	currentPage: RodizioPages;
	changePage: Dispatch<SetStateAction<RodizioPages>>;
}

function Navbar({ hasThemeSwitcher, currentPage, changePage }: INav) {
	const switchPage = (page: RodizioPages) => {
		if (currentPage === page) {
			changePage(RodizioPages.Home);
		} else {
			changePage(page);
		}
	};

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

			<button
				className={`flex justify-center hover:text-blue-500 items-center w-[2.5rem] h-[2.5rem] transition-colors ${
					currentPage === RodizioPages.List ? activeClass : ""
				}`}
				onClick={() => switchPage(RodizioPages.List)}
			>
				<ListIcon />
			</button>

			<button
				className={`flex justify-center hover:text-blue-500 items-center w-[2.5rem] h-[2.5rem] transition-colors ${
					currentPage === RodizioPages.Config ? activeClass : ""
				}`}
				onClick={() => switchPage(RodizioPages.Config)}
			>
				<SettingsIcon />
			</button>

			{hasThemeSwitcher && <ThemeSwitcher />}
		</nav>
	);
}

export default Navbar;
