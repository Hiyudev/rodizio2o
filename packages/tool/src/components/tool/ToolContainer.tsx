import { useEffect, useState } from "react";
import useAddress from "../../hooks/useAddress";
import useLocalStorage from "../../hooks/useLocalStorage";
import useMode from "../../hooks/useMode";
import { useRodizio } from "../../hooks/useRodizio";
import { isObjectSame } from "../../lib/Object";
import { TimeAdd } from "../../lib/Time";
import { IAddress, Modes, UpdaterState } from "../../shared";

function ToolContainer({ children }) {
	const { updateRodizio, renderRodizio, systemStatus } = useRodizio();
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
		const selfUpdate = TimeAdd(now, { hours: 6 });
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
		<div className="w-full bg-gray-200 dark:bg-gray-800 min-h-[400px]">
			{children}
		</div>
	);
}

export default ToolContainer;
