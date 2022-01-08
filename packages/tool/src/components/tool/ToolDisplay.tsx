import { useMemo } from "react";
import DropletEmptyIcon from "../../icons/DropletEmpty";
import DropletFillIcon from "../../icons/DropletFill";
import DropletHalfIcon from "../../icons/DropletHalf";
import DropletNotFoundIcon from "../../icons/DropletNotFound";
import { Timeleft } from "../../lib/Time";
import { IEvent, RodizioState } from "../../shared";

interface IToolDisplay {
	loaded: boolean;
	event: IEvent;
	status: RodizioState;
}

function ToolDisplay({ loaded, event, status }: IToolDisplay) {
	const now = new Date();
	const nextDate = loaded && new Date(event?.data);
	const nextLeftObj = loaded && Timeleft(now, nextDate);
	const nextLeft = nextLeftObj.days * 24 + nextLeftObj.hours;

	const message = useMemo(() => {
		switch (status) {
			case RodizioState.SUSPENDED:
				return {
					title:
						"Rodizio suspenso sem previsão de retomada. Aproveite a água disponível.",
					desc: "",
				};
			case RodizioState.AVAILABLE:
			case RodizioState.SOON:
				return {
					title: "Água dispónivel por",
					desc: "Acaba às",
				};
			case RodizioState.NOT_AVAILABLE:
				return {
					title: "Água retoma em",
					desc: "Retoma às",
				};
			case RodizioState.RESUMING:
				return {
					title: "Água normaliza em",
					desc: "Volta às",
				};
			case RodizioState.NOTFOUND:
			default:
				return {
					title: "",
					desc: "",
					icon: <DropletNotFoundIcon />,
				};
		}
	}, [status]);

	const Icon = useMemo(() => {
		switch (status) {
			case RodizioState.SUSPENDED:
			case RodizioState.NOTFOUND:
				return <DropletNotFoundIcon />;
			case RodizioState.AVAILABLE:
				return <DropletFillIcon />;
			case RodizioState.SOON:
			case RodizioState.RESUMING:
				return <DropletHalfIcon />;
			case RodizioState.NOT_AVAILABLE:
				return <DropletEmptyIcon />;
		}
	}, [status]);

	return (
		<div>
			{loaded ? (
				<div className="text-center">
					<div className="flex justify-center text-blue-400 mb-4">{Icon}</div>
					<p>{message.title}</p>
					<h1 className="text-blue-400">{nextLeft}h</h1>
					<small>
						{message.desc} {nextDate.getDate()}/{nextDate.getMonth() + 1} -{" "}
						{nextDate.getHours()}:
						{(nextDate.getMinutes() < 10 ? "0" : "") + nextDate.getMinutes()}
					</small>
				</div>
			) : (
				<div>
					<div className="h-3 mt-3 w-32 bg-black dark:bg-white rounded-full animate-pulse"></div>
					<div className="h-10 mt-3 w-24 bg-black dark:bg-white rounded-2xl animate-pulse"></div>
					<div className="h-2 mt-3 w-28 bg-black dark:bg-white rounded-full animate-pulse"></div>
				</div>
			)}
		</div>
	);
}

export default ToolDisplay;
