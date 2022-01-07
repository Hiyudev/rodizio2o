import { useRodizio } from "../../hooks/useRodizio";
import ToolCycle from "../tool/ToolCycle";
import ToolDisplay from "../tool/ToolDisplay";

function ToolHomePage() {
	const { nextEvent, futureEvents, loaded, rodizioStatus } = useRodizio();

	return (
		<div className="space-y-8">
			<ToolDisplay loaded={loaded} event={nextEvent} status={rodizioStatus} />

			<ToolCycle loaded={loaded} list={futureEvents} />
		</div>
	);
}

export default ToolHomePage;
