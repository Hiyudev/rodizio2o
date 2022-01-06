import { useRodizio } from "../../hooks/useRodizio";
import ToolCycle from "../tool/ToolCycle";
import ToolDate from "../tool/ToolDate";

function ToolHomePage() {
	const { futureEvents, loaded } = useRodizio();

	return (
		<div>
			<div>
				<p>Água normaliza em</p>
				<h2>4h</h2>
				<small>Acaba às 31/11 - 16:00</small>
			</div>

			<ToolCycle loaded={loaded} list={futureEvents} />
		</div>
	);
}

export default ToolHomePage;
