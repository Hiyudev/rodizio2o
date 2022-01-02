import { RodizioDate } from "../utils/date";

export interface IRodizio {
	[key: string]: RodizioDate;
	INICIO: RodizioDate;
	RETOMADA: RodizioDate;
	NORMALIZACAO: RodizioDate;
}

export interface IRodizioAPI {
	current: IRodizio;
	next: IRodizio[];
	location: string;
	observation: string | undefined;
}

export enum RodizioState {
	AVAILABLE,
	SOON,
	NOT_AVAILABLE,
	RESUMING,
	SUSPENDED,
	NOTFOUND,
}

export enum SystemState {
	DONE,
	UPDATING,
	INITIALIZING,
	ERROR,
}

export interface IRodizioSectionContext {
	next: IRodizio[];
	current: IRodizio;
	message: {
		title: string;
		info: string;
	};
	status: RodizioState;
	left: Date;
}

export interface IRodizioContext {
	error: string;
	state: SystemState;
	rodizio: IRodizioSectionContext;
	location: string;
	observation: string | undefined;
}

export interface IRodizioConversor {
	time: number;
	date: Date;
}

export interface IRodizioDateStorage {
	INICIO: number;
	RETOMADA: number;
	NORMALIZACAO: number;
}

export interface IRodizioDataStorage {
	nextupdate: number;
	next: IRodizioDateStorage[];
	current: IRodizioDateStorage;
	cep: string;
	num: string;
	location: string;
	observation?: string;
}

export interface IRodizioHookStorage {
	nextupdate: Date;
	next: IRodizio[];
	current: IRodizio;
	cep: string;
	num: string;
	location: string;
	observation?: string;
}

export interface IHookInformation {
	status: RodizioState;
	nextDate?: Date;
}
