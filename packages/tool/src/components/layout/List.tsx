import { useRodizio } from "../../hooks/useRodizio";
import ToolDate from "../tool/ToolDate";

function ToolListPage() {
	const { futureEvents } = useRodizio();

	return (
		<ul className="flex flex-col">
			{futureEvents
				.filter((v) => !v.disabled)
				.map((v, i) => {
					return (
						<ToolDate
							key={i}
							active={v.active}
							eventDate={new Date(v.data)}
							eventName={v.name}
						/>
					);
				})}
		</ul>
	);
}

export default ToolListPage;
