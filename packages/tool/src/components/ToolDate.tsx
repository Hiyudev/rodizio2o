import { useState } from "react";

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

	return (
		<div
			className={`flex flex-row snap-start rounded-2xl w-full ${
				active ? "bg-blue-400/50 dark:bg-blue-600/50" : ""
			} ${disabled ? "text-gray-600" : ""}`}
		>
			<div className="flex flex-col flex-shrink-0 justify-center items-center border-gray-600 dark:border-gray-300 border-r-2 p-4 w-20 h-20">
				<div className="font-medium text-3xl">{day}</div>
				<div className="text-gray-600 dark:text-gray-400">{monthName}</div>
			</div>

			<div className="p-4 flex-shrink rounded-2xl w-full md:w-32">
				<span>{eventName}</span>
				<br />
				<span className="text-gray-600 dark:text-gray-400">{time}</span>
			</div>
		</div>
	);
};

export default ToolDate;
