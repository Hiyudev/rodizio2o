import { useState } from "react";
import { RodizioWrapper } from "../../hooks/useRodizio";
import { RodizioPages } from "../../shared";
import ToolConfigPage from "../layout/Config";
import ToolHomePage from "../layout/Home";
import ToolListPage from "../layout/List";
import Navbar from "../layout/Nav";
import ToolAlert from "./ToolAlert";

interface IToolContainer {
	className?: string;
	hasThemeSwitcher?: boolean;
}

function ToolContainer({ className, hasThemeSwitcher }: IToolContainer) {
	const [page, setPage] = useState(RodizioPages.Home);

	const Container = () => {
		switch (page) {
			case RodizioPages.Home:
				return <ToolHomePage />;
			case RodizioPages.Config:
				return <ToolConfigPage />;
			case RodizioPages.List:
				return <ToolListPage />;
		}
	};

	return (
		<div
			className={`relative flex flex-col w-full h-full bg-gray-100 dark:bg-gray-900 overflow-y-auto ${className}`}
		>
			<Navbar
				hasThemeSwitcher={hasThemeSwitcher}
				currentPage={page}
				changePage={setPage}
			/>
			<RodizioWrapper>
				<main className="p-4">
					<Container />
				</main>
				<ToolAlert />
			</RodizioWrapper>
		</div>
	);
}

export default ToolContainer;
