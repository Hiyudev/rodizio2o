import ToolCycle from "./ToolCycle";
import ToolDate from "./ToolDate";

export const Tool = () => {
	const pastDate = new Date("2019-09-27T13:36:00.978Z");
	const randomDate = new Date("2020-05-21T06:56:08.741Z");
	const futureDate = new Date("2022-06-07T06:56:08.741Z");
	return (
		<ToolCycle>
			<ToolDate eventName="Poggers" disabled eventDate={pastDate} />
			<ToolDate eventName="Poggers" disabled eventDate={randomDate} />
			<ToolDate eventName="Poggers" active eventDate={futureDate} />
		</ToolCycle>
	);
};
