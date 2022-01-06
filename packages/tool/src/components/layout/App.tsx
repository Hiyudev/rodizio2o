import { useState } from "react";
import { RodizioWrapper } from "../../hooks/useRodizio";
import { RodizioPages } from "../../shared";
import ToolContainer from "../tool/ToolContainer";
import ToolConfigPage from "./Config";
import ToolHomePage from "./Home";
import ToolListPage from "./List";
import Navbar from "./Nav";

export const App = () => {
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
		<RodizioWrapper>
			<ToolContainer>
				<Navbar currentPage={page} changePage={setPage} />
				<main className="p-4">
					<Container />
				</main>
			</ToolContainer>
		</RodizioWrapper>
	);
};
