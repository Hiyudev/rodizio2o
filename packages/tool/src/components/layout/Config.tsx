import { Fragment as div, useEffect, useState } from "react";
import { useRodizio } from "../../hooks/useRodizio";
import ErrorIcon from "../../icons/Error";
import LoadingIcon from "../../icons/Loading";
import MapPinIcon from "../../icons/MapIcon";
import ToolAddressBar from "../tool/ToolAddressBar";

function ToolConfigPage() {
	const { rodizio, loaded, systemStatus, rodizioError } = useRodizio();
	const [configError, setConfigError] = useState("");

	const handleConfigError = (message: string) => {
		setConfigError(message);
	};

	useEffect(() => {
		setConfigError("");
	}, [systemStatus]);

	return (
		<div className="space-y-8">
			<ToolAddressBar
				systemLoaded={loaded}
				error={configError}
				setError={handleConfigError}
			/>

			<div className="flex flex-row space-x-2">
				{loaded ? (
					configError.length > 0 || rodizioError.message.length > 0 ? (
						<div className="flex flex-row space-x-4 w-full text-red-400 dark:text-red-600">
							<ErrorIcon />
							<span>{rodizioError.message ?? configError}</span>
						</div>
					) : (
						<div className="flex flex-row space-x-4 w-full">
							<MapPinIcon />
							<span>{rodizio.location}</span>
						</div>
					)
				) : (
					<div className="flex flex-row space-x-4 w-full">
						<div className="animate-spin">
							<LoadingIcon />
						</div>
						<div className="h-6 w-full rounded-full animate-pulse bg-black dark:bg-white"></div>
					</div>
				)}
			</div>
		</div>
	);
}

export default ToolConfigPage;
