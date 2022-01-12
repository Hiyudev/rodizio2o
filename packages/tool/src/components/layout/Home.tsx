import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useRodizio } from "../../hooks/useRodizio";
import { RodizioState, UpdaterState } from "../../shared";
const ToolCycle = dynamic(() => import("../tool/ToolCycle"));
import ToolDisplay from "../tool/ToolDisplay";

function ToolHomePage() {
	const { nextEvent, futureEvents, loaded, rodizioStatus, syncRodizio } =
		useRodizio();

	useEffect(() => {
		syncRodizio();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="space-y-4">
			<ToolDisplay loaded={loaded} event={nextEvent} status={rodizioStatus} />

			{rodizioStatus !== RodizioState.NOTFOUND && (
				<ToolCycle loaded={loaded} list={futureEvents} />
			)}
		</div>
	);
}

export default ToolHomePage;
