import { useEffect, useState } from "react";
import useAddress from "../../hooks/useAddress";
import useRodizio from "../../hooks/useRodizio";
import { RodizioErrorTypes, RodizioPages } from "../../shared";
import ToolContainer from "../tool/ToolContainer";
import ToolConfigPage from "./Config";
import ToolHomePage from "./Home";
import ToolListPage from "./List";
import Navbar from "./Nav";

export const App = () => {
	const [address, setAddress] = useAddress();
	const { rodizio } = useRodizio();
	const [error, setError] = useState({
		type: RodizioErrorTypes.None,
		message: "",
	});
	const [page, setPage] = useState(RodizioPages.Home);

	// Sync Rodizio Data with the new Address
	useEffect(() => {}, [address]);

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
		<ToolContainer>
			<Navbar currentPage={page} changePage={setPage} />
			<Container />
		</ToolContainer>
	);
};
