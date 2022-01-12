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

	const leftDays = nextLeftObj.days ? nextLeftObj.days + "d" : "";
	const nextLeft = leftDays + `${nextLeftObj.hours}h`;

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
				return {
					title: "Não foi encontrado nenhum dado",
					desc: "Confira seus dados inseridos se não há nenhum erro",
					icon: <DropletNotFoundIcon />,
				};
		}
	}, [status]);

	const Icon = () => {
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
	};

	const Detail = () => {
		if (status === RodizioState.NOTFOUND) {
			return <small>{message.desc}</small>;
		} else {
			return (
				<small>
					{message.desc} {nextDate.getDate()}/{nextDate.getMonth() + 1} -{" "}
					{nextDate.getHours()}:
					{(nextDate.getMinutes() < 10 ? "0" : "") + nextDate.getMinutes()}
				</small>
			);
		}
	};

	return (
		<div>
			{loaded ? (
				<div className="text-center">
					<div className="flex justify-center text-blue-600 mx-auto mb-4">
						<Icon />
					</div>
					<p>{message.title}</p>
					{status !== RodizioState.NOTFOUND && (
						<h1 className="text-blue-600">{nextLeft}</h1>
					)}
					<Detail />
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
