import { createContext, useContext, useMemo, useState } from "react";
import { isObjectEmpty, isObjectSame } from "../lib/Object";
import { TimeAdd, TimeIn, TimeSub } from "../lib/Time";
import {
	IAddress,
	IEvent,
	Modes,
	RodizioErrorTypes,
	RodizioState,
	UpdaterState,
} from "../shared";
import useAddress from "./useAddress";
import useLocalStorage from "./useLocalStorage";
import useMode from "./useMode";

export interface IRodizio {
	[key: string]: number;
	INICIO: number;
	RETOMADA: number;
	NORMALIZACAO: number;
}

export interface IRodizioAPI {
	current: null | IRodizio;
	next: IRodizio[];
	location: string;
	observation: null | string;
	error?: string;
}

interface IUpdateRodizio {
	cep?: string;
	num?: string;
	street?: string;
}

interface IRodizioContext {
	rodizio: IRodizioAPI;
	rodizioStatus: RodizioState;
	rodizioError: null | string;
	updateRodizio: ({ cep, num, street }: IUpdateRodizio) => void;
	renderRodizio: () => void;
	syncRodizio: () => void;
	systemStatus: UpdaterState;
	nextEvent: IEvent;
	futureEvents: IEvent[];
	loaded: boolean;
}

const RodizioContext = createContext({} as IRodizioContext);

export const RodizioWrapper: React.FC = ({ children }) => {
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
	// Rodizio
	const initialValue = {} as IRodizioAPI;

	const [rodizio, setRodizio] = useLocalStorage<IRodizioAPI>(
		"@rodizio",
		initialValue
	);

	const [rodizioError, setRodizioError] = useState<string>(null);

	const resetRodizioError = () => {
		setRodizioError(null);
	};

	const [systemStatus, setSystemStatus] = useState<UpdaterState>(
		UpdaterState.INITIALIZING
	);

	const loaded = useMemo(
		() =>
			systemStatus === UpdaterState.DONE || systemStatus === UpdaterState.ERROR,
		[systemStatus]
	);

	const syncRodizio = () => {
		if (systemStatus === UpdaterState.UPDATING) return;

		const now = new Date();
		const selfUpdate = TimeAdd(now, { hours: 3 });

		let { cep, num, street } = address;
		if (
			mode === Modes.CEPNUM &&
			(!cep || cep?.length == 0) &&
			(!num || num?.length == 0)
		) {
			setSystemStatus(UpdaterState.ERROR);
			return setRodizioError("Nenhum endereço foi encontrado");
		} else if (mode === Modes.STREET && (!street || street?.length == 0)) {
			setSystemStatus(UpdaterState.ERROR);
			return setRodizioError("Nenhum endereço foi encontrado");
		}

		cep = cep.trim().replaceAll("-", "");
		num = num.trim();

		if (mode === Modes.CEPNUM && cep.length !== 8) {
			setSystemStatus(UpdaterState.ERROR);
			return setRodizioError("CEP inserido não possui 8 digitos");
		} else if (mode === Modes.CEPNUM && num.length == 0) {
			setSystemStatus(UpdaterState.ERROR);
			return setRodizioError(
				"Número da residência inserido deve pelo menos possuir 1 digito"
			);
		} else if (mode === Modes.STREET && street.length <= 5) {
			setSystemStatus(UpdaterState.ERROR);
			return setRodizioError(
				"Endereço da residência inserida deve haver no mínimo 5 caracteres"
			);
		}

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
	};

	const updateRodizio = ({ cep, num, street }: IUpdateRodizio) => {
		setSystemStatus(UpdaterState.UPDATING);
		resetRodizioError();

		let url: string;

		if (cep || street) {
			if (cep) {
				cep = cep.trim().replaceAll("-", "");
				num = num.trim();

				url = `http://localhost:3001/api/rodizio/${cep}/${num}`;
			} else {
				url = `http://localhost:3001/api/rodizio?address=${street}`;
			}

			try {
				fetch(url).then(async (res) => {
					const data: IRodizioAPI = await res.json();
					if (data.error) {
						setRodizioError(data.error);
						setSystemStatus(UpdaterState.ERROR);
					} else {
						setRodizio(data);
						setSystemStatus(UpdaterState.DONE);
					}
				});
			} catch (err) {
				setRodizioError(err.message);
			}
		}
	};

	const renderRodizio = () => setSystemStatus(UpdaterState.DONE);

	const nextEvent: IEvent | null = useMemo(() => {
		if (isObjectEmpty(rodizio)) return null;
		const now = new Date().getTime();

		let eventName = "";
		let eventDate: number;

		const closestCurrentArr =
			rodizio?.current &&
			Object.entries(rodizio.current).filter((d) => !(d[1] < now));

		const closestNextArr = rodizio?.next?.[0].INICIO;

		let date = closestCurrentArr?.[0]?.[1] ?? closestNextArr;
		eventDate = new Date(date).getTime();
		eventName = closestCurrentArr?.[0]?.[0] ?? "INICIO";

		return {
			data: eventDate,
			name: eventName,
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [rodizio]);

	const futureEvents: IEvent[] | null = useMemo(() => {
		if (isObjectEmpty(rodizio)) return null;

		const { current, next } = rodizio;
		const curr = [current];
		const arr = [...curr, ...next];

		let result: IEvent[] = [];
		let hasActivated = false;

		arr.map((v, i) => {
			Object.entries(v).map((v, i) => {
				let perm = new Date(v[1]) > new Date();
				let active = false;
				if (perm && !hasActivated) {
					hasActivated = true;
					active = true;
				}

				result.push({
					name: v[0],
					data: v[1],
					disabled: new Date(v[1]) < new Date(),
					active: active,
				});
			});
		});

		return result;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [rodizio]);

	const isSuspended: boolean | null = useMemo(() => {
		if (!rodizio) return null;

		const message = rodizio.observation;
		if (message) {
			return message.includes("suspenso");
		} else {
			return false;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [rodizio.observation]);

	const rodizioStatus = useMemo(() => {
		if (isObjectEmpty(rodizio)) return RodizioState.NOTFOUND;
		if (isSuspended) return RodizioState.SUSPENDED;

		const now = new Date();

		switch (nextEvent.name) {
			case "INICIO":
				const compareDate = TimeSub(new Date(nextEvent.data), { hours: 6 });
				const inRange = TimeIn(compareDate, new Date(nextEvent.data), now);
				if (inRange) return RodizioState.SOON;
				else return RodizioState.AVAILABLE;
			case "RETOMADA":
				return RodizioState.NOT_AVAILABLE;
			case "NORMALIZACAO":
				return RodizioState.RESUMING;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [rodizio, isSuspended, nextEvent]);

	const contextProps = {
		rodizio,
		rodizioStatus,
		rodizioError,
		updateRodizio,
		syncRodizio,
		renderRodizio,
		systemStatus,
		nextEvent,
		futureEvents,
		loaded,
	};

	return (
		<RodizioContext.Provider value={contextProps}>
			{children}
		</RodizioContext.Provider>
	);
};

export function useRodizio() {
	return useContext(RodizioContext);
}
