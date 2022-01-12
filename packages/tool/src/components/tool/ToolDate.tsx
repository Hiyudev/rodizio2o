import { capitalizeFirstLetter } from "../../lib/String";

const MonthConvert = (month: number): string => {
	const monthNames = [
		"Janeiro",
		"Fevereiro",
		"Março",
		"Abril",
		"Maio",
		"Junho",
		"Julho",
		"Agosto",
		"Setembro",
		"Outubro",
		"Novembro",
		"Dezembro",
	];
	return monthNames[month];
};

interface IToolDateProps {
	eventName: string;
	eventDate: Date;
	disabled?: boolean;
	active?: boolean;
}
const ToolDate: React.FC<IToolDateProps> = ({
	eventName,
	eventDate,
	disabled,
	active,
}) => {
	const hr = eventDate.getHours();
	const minutes = eventDate.getMinutes();
	const min = (minutes < 10 ? "0" : "") + minutes;
	const time = `${hr}:${min}`;

	const month = eventDate.getMonth();
	const monthName = MonthConvert(month).slice(0, 3);

	const day = eventDate.getDate();
	const name = capitalizeFirstLetter(eventName);

	return (
		<li
			className={`flex flex-row snap-start rounded-2xl w-full ${
				active ? "bg-blue-400/50 dark:bg-blue-600/50" : ""
			} ${disabled ? "text-gray-600" : ""}`}
		>
			<div className="flex flex-col flex-shrink-0 justify-center items-center border-gray-600 dark:border-gray-300 border-r-2 px-4 py-2 w-16 h-16">
				<div className="font-medium text-2xl">{day}</div>
				<div className="text-gray-600 dark:text-gray-400 text-sm">
					{monthName}
				</div>
			</div>

			<div className="px-4 py-2 flex-shrink rounded-2xl w-full md:w-32">
				<span>{name}</span>
				<br />
				<span className="text-gray-600 dark:text-gray-400">{time}</span>
			</div>
		</li>
	);
};

export const ToolDateSkeleton = () => {
	return (
		<li className={"flex flex-row snap-start rounded-2xl w-full"}>
			<div className="flex flex-col flex-shrink-0 justify-center items-center border-gray-600 dark:border-gray-300 border-r-2 px-4 py-2 w-16 h-16">
				<div className="h-4 w-full bg-black dark:bg-white rounded-full animate-pulse"></div>
				<div className="h-3 w-full mt-3 bg-gray-600 dark:bg-gray-400 rounded-full animate-pulse"></div>
			</div>

			<div className="flex flex-col justify-center px-4 py-2 flex-shrink rounded-2xl w-full md:w-32">
				<div className="h-4 w-16 bg-black dark:bg-white rounded-full animate-pulse"></div>
				<div className="h-3 mt-3 w-12 bg-gray-600 dark:bg-gray-400 rounded-full animate-pulse"></div>
			</div>
		</li>
	);
};

export default ToolDate;
