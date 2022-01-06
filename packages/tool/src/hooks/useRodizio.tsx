import { useMemo, useState } from "react";
import { isObjectEmpty } from "../lib/Object";
import { TimeIn, TimeSub } from "../lib/Time";
import { RodizioErrorTypes, RodizioState, UpdaterState } from "../shared";
import useLocalStorage from "./useLocalStorage";

export interface IRodizio {
	[key: string]: Date;
	INICIO: Date;
	RETOMADA: Date;
	NORMALIZACAO: Date;
}

export interface IRodizioAPI {
	current: null | IRodizio;
	next: IRodizio[];
	location: string;
	observation: null | string;
}

interface IEvent {
	data: Date;
	name: string;
}

interface IUpdateRodizio {
	cep?: string;
	num?: string;
	street?: string;
}

interface IRodizioError {
	type: RodizioErrorTypes;
	message: string;
}

const useRodizio = (): {
	rodizio: IRodizioAPI;
	rodizioStatus: RodizioState;
	rodizioError: IRodizioError;
	updateRodizio: ({ cep, num, street }: IUpdateRodizio) => void;
	systemStatus: UpdaterState;
	nextEvent: IEvent;
	futureEvents: IEvent[];
} => {
	const initialValue = {} as IRodizioAPI;

	const [rodizio, setRodizio] = useLocalStorage<IRodizioAPI>(
		"@rodizio",
		initialValue
	);

	const [rodizioError, setRodizioError] = useState<IRodizioError>({
		type: RodizioErrorTypes.None,
		message: "",
	});

	const [systemStatus, setSystemStatus] = useState<UpdaterState>(
		UpdaterState.INITIALIZING
	);

	const updateRodizio = ({ cep, num, street }: IUpdateRodizio) => {
		setSystemStatus(UpdaterState.UPDATING);

		let url: string;
		let error: RodizioErrorTypes;

		if (cep || street) {
			if (cep) {
				url = `http://localhost:3001/api/rodizio/${cep}/${num}`;
				error = RodizioErrorTypes.InvalidCepNum;
			} else {
				url = `http://localhost:3001/api/rodizio?address=${street}`;
				error = RodizioErrorTypes.InvalidStreet;
			}

			fetch(url)
				.then(async (res) => {
					const data: IRodizioAPI = await res.json();
					setRodizio(data);
					setSystemStatus(UpdaterState.DONE);
				})
				.catch((rej) => {
					setRodizioError({
						type: error,
						message: rej.message,
					});
					setSystemStatus(UpdaterState.ERROR);
				});
		}
	};

	const nextEvent: IEvent | null = useMemo(() => {
		if (isObjectEmpty(rodizio)) return null;

		let eventName = "";
		let eventDate: Date;

		const closestCurrentArr =
			rodizio?.current &&
			Object.entries(rodizio.current).filter(
				(d) => d[1].getTime() < new Date().getTime()
			);

		const closestNextArr = rodizio?.next[0].INICIO;

		let date = closestCurrentArr?.[0]?.[1] ?? closestNextArr;
		eventDate = new Date(date);
		eventName = closestCurrentArr?.[0]?.[0] ?? "INICIO";

		return {
			data: eventDate,
			name: eventName,
		};
	}, [rodizio]);

	const futureEvents: IEvent[] | null = useMemo(() => {
		if (isObjectEmpty(rodizio)) return null;

		const { next } = rodizio;
		let arr: IEvent[] = [];

		next.map((v, i) => {
			Object.entries(v).map((v, i) => {
				arr.push({
					name: v[0],
					data: v[1],
				});
			});
		});

		return arr;
	}, [rodizio]);

	const isSuspended: boolean | null = useMemo(() => {
		if (!rodizio) return null;

		const message = rodizio.observation;
		if (message) {
			return message.includes("suspenso");
		} else {
			return false;
		}
	}, [rodizio]);

	const rodizioStatus = useMemo(() => {
		if (isObjectEmpty(rodizio) && !nextEvent) return RodizioState.NOTFOUND;
		if (isSuspended) return RodizioState.SUSPENDED;

		const now = new Date();

		switch (nextEvent.name) {
			case "INICIO":
				const compareDate = TimeSub(nextEvent.data, { hours: 6 });
				const inRange = TimeIn(compareDate, nextEvent.data, now);
				if (inRange) return RodizioState.SOON;
				else return RodizioState.AVAILABLE;
			case "RETOMADA":
				return RodizioState.NOT_AVAILABLE;
			case "NORMALIZACAO":
				return RodizioState.RESUMING;
		}
	}, [rodizio, isSuspended, nextEvent]);

	return {
		rodizio,
		rodizioStatus,
		rodizioError,
		updateRodizio,
		systemStatus,
		nextEvent,
		futureEvents,
	};
};

export default useRodizio;
