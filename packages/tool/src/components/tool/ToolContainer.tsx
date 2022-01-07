import { useEffect } from "react";
import useAddress from "../../hooks/useAddress";
import { useRodizio } from "../../hooks/useRodizio";

function ToolContainer({ children }) {
	const { updateRodizio } = useRodizio();
	const [address] = useAddress();

	useEffect(() => {
		updateRodizio(address);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [address]);

	return (
		<div className="w-full bg-gray-200 dark:bg-gray-800 min-h-[400px]">
			{children}
		</div>
	);
}

export default ToolContainer;
