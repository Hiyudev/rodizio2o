import dynamic from "next/dynamic";
import { Fragment, useEffect } from "react";
import { useRodizio } from "../../hooks/useRodizio";
import MapPinIcon from "../../icons/MapIcon";
import { RodizioState } from "../../shared";
const ToolCycle = dynamic(() => import("../tool/ToolCycle"));
import ToolDisplay from "../tool/ToolDisplay";

function ToolHomePage() {
	const {
		nextEvent,
		futureEvents,
		rodizio,
		loaded,
		rodizioStatus,
		syncRodizio,
	} = useRodizio();

	useEffect(() => {
		syncRodizio();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="space-y-4">
			<ToolDisplay loaded={loaded} event={nextEvent} status={rodizioStatus} />

			{rodizioStatus !== RodizioState.NOTFOUND && (
				<Fragment>
					<ToolCycle loaded={loaded} list={futureEvents} />

					<div className="flex flex-row justify-center space-x-4 w-full">
						<MapPinIcon />
						<span>{rodizio.location}</span>
					</div>
				</Fragment>
			)}
		</div>
	);
}

export default ToolHomePage;
