import { useEffect } from "react";
import useAddress from "../../hooks/useAddress";
import useLocalStorage from "../../hooks/useLocalStorage";
import useMode from "../../hooks/useMode";
import { useRodizio } from "../../hooks/useRodizio";
import { isObjectSame } from "../../lib/Object";
import { TimeAdd } from "../../lib/Time";
import { IAddress, Modes, UpdaterState } from "../../shared";
import ToolAlert from "./ToolAlert";

interface IToolContainer {
	children: React.ReactNode;
	className?: string;
}

function ToolContainer({ children, className }: IToolContainer) {
	const { updateRodizio, renderRodizio, systemStatus, rodizio } = useRodizio();
	const [address] = useAddress();

	const [lastUpdate, setLastUpdate] = useLocalStorage<Date>(
		"@lastupdate",
		new Date()
	);
	const [lastAddress, setLastAddress] = useLocalStorage<IAddress>(
		"@lastaddress",
		{
			cep: "",
			num: "",
			street: "",
		}
	);
	const [mode] = useMode();

	useEffect(() => {
		if (systemStatus === UpdaterState.UPDATING) return;

		const now = new Date();
		const selfUpdate = TimeAdd(now, { hours: 3 });
		if (lastUpdate < now || !isObjectSame(lastAddress, address)) {
			if (mode === Modes.CEPNUM) {
				const data = { ...address, ["street"]: "" };
				updateRodizio(data);
			} else {
				const data = { ...address, ["cep"]: "", ["num"]: "" };
				updateRodizio(data);
			}
			setLastUpdate(selfUpdate);
			setLastAddress(address);
		} else {
			renderRodizio();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [address]);

	return (
		<div
			className={`flex flex-col w-full h-full bg-gray-100 dark:bg-gray-900 overflow-y-auto ${className}`}
		>
			{children}
			{rodizio.observation && <ToolAlert message={rodizio.observation} />}
		</div>
	);
}

export default ToolContainer;
