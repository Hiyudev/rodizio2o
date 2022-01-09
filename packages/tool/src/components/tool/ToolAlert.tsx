import { useState } from "react";
import ErrorIcon from "../../icons/Error";

interface IToolAlert {
	message: string;
}

function ToolAlert({ message }: IToolAlert) {
	const [isHidden, setHidden] = useState(false);

	return (
		<div
			hidden={isHidden}
			className="fixed bottom-0 w-full p-8 rounded-t-3xl bg-gray-300 dark:bg-gray-800"
		>
			<div className="flex flex-row justify-between">
				<h4>Observação</h4>
				<button onClick={() => setHidden(true)} className="text-red-500">
					<ErrorIcon />
				</button>
			</div>
			<p>{message}</p>
		</div>
	);
}

export default ToolAlert;
