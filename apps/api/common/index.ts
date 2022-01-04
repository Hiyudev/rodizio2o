export interface IRodizio {
	[key: string]: Date;
	INICIO: Date;
	RETOMADA: Date;
	NORMALIZACAO: Date;
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
