export enum RodizioErrorTypes {
	InvalidCepNum,
	InvalidStreet,
	Unknown,
	None
}

export enum RodizioPages {
	Home,
	List,
	Config
}

export enum RodizioState {
	AVAILABLE,
	SOON,
	NOT_AVAILABLE,
	RESUMING,
	SUSPENDED,
	NOTFOUND,
}

export enum UpdaterState {
	DONE,
	UPDATING,
	INITIALIZING,
	ERROR,
}

export interface IEvent {
	data: number;
	name: string;
}
