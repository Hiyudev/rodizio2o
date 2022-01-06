import { useState } from "react";
import { RodizioPages } from "../../shared";
import ToolContainer from "../tool/ToolContainer";
import ToolConfigPage from "./Config";
import ToolHomePage from "./Home";
import ToolListPage from "./List";

export const App = () => {
	const [page, setPage] = useState(RodizioPages.Home);

	const container = () => {
		switch (page) {
			case RodizioPages.Home:
				return <ToolHomePage />;
			case RodizioPages.Config:
				return <ToolConfigPage />;
			case RodizioPages.List:
				return <ToolListPage />;
		}
	};

	return <ToolContainer>{container}</ToolContainer>;
};
