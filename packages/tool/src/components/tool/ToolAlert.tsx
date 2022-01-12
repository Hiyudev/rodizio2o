import { Fragment, useState } from "react";
import { useRodizio } from "../../hooks/useRodizio";
import ErrorIcon from "../../icons/Error";

function ToolAlert() {
	const [isHidden, setHidden] = useState(false);
	const { rodizio } = useRodizio();

	return (
		<Fragment>
			{rodizio.observation && (
				<div
					hidden={isHidden}
					className="absolute bottom-0 w-full p-8 rounded-t-3xl bg-gray-300 dark:bg-gray-800"
				>
					<div className="flex flex-row justify-between">
						<h4>Observação</h4>
						<button onClick={() => setHidden(true)} className="text-red-500">
							<ErrorIcon />
						</button>
					</div>
					<p>{rodizio.observation}</p>
				</div>
			)}
		</Fragment>
	);
}

export default ToolAlert;
