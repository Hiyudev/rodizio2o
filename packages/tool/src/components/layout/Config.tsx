import { useEffect } from "react";
import { useRodizio } from "../../hooks/useRodizio";
import ErrorIcon from "../../icons/Error";
import LoadingIcon from "../../icons/Loading";
import MapPinIcon from "../../icons/MapIcon";
import ToolAddressBar from "../tool/ToolAddressBar";

function ToolConfigPage() {
	const { rodizio, loaded, rodizioError } = useRodizio();

	const AddressLocation = () => {
		const err = rodizioError;
		if (loaded) {
			if (err) {
				return (
					<div className="flex flex-row space-x-4 w-full text-red-400 dark:text-red-600">
						<ErrorIcon />
						<span>{rodizioError}</span>
					</div>
				);
			} else {
				return (
					<div className="flex flex-row space-x-4 w-full">
						<MapPinIcon />
						<span>{rodizio.location}</span>
					</div>
				);
			}
		} else {
			return (
				<div className="flex flex-row space-x-4 w-full">
					<div className="animate-spin">
						<LoadingIcon />
					</div>
					<div className="h-6 w-full rounded-full animate-pulse bg-black dark:bg-white"></div>
				</div>
			);
		}
	};
	return (
		<div className="space-y-8">
			<ToolAddressBar loaded={loaded} />

			<div className="flex flex-row space-x-2">
				<AddressLocation />
			</div>
		</div>
	);
}

export default ToolConfigPage;
