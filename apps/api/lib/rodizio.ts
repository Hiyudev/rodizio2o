import { TimeAdd, TimeIn, Timeleft, TimeSub } from "../utils/date";
import { getAddress, getSuggestions, findAddress, getCodope, getByCodope } from "./api";
import { isObjectEmpty, isObjectSame } from "./object";


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
}

interface IRodizioData {
	attributes: {
		OBJECTID: number;
		RETOMADA: number;
		NORMALIZACAO: number;
		LOCALIDADE: null;
		PERIODO: string;
		OBSERVACAO: string;
		INICIO: number;
		CODOPE: string;
	};
}

function count<T>(array: T[]): { [key: string]: number } {
	return array.reduce(
		(a: any, b: any) => ({
			...a,
			[b]: (a[b] || 0) + 1,
		}),
		{},
	);
}

export async function getRodizioByCep(cep: string, num: string) {
	if (cep.length !== 8 || num.length === 0) {
		throw new TypeError("CEP ou Número da residência colocadas são inválidas")
	} else {
		const address = await getAddress(cep, num);

		try {
			const data = await getRodizio(address)
			return data
		} catch (err) {
			throw new TypeError(err.message)
		}
	}
}

export async function getRodizio(
	address: string,
): Promise<IRodizioAPI> {
	const suggestions = await getSuggestions(address);

	if (suggestions.length === 0) {
		throw new TypeError('Endereço inválido');
	}

	const candidates = await findAddress(suggestions[0].text);
	const location = candidates.candidates[0].location;
	location.spatialReference = {
		wkid: 102100,
	};

	const codope = await getCodope(location);
	const data = await getByCodope(codope);

	const now = new Date();
	const filteredData: IRodizioData[] = data.features.filter(
		(entry: IRodizioData) => {
			const rodizioDate = new Date(entry.attributes.NORMALIZACAO);
			const past = TimeSub(now, { month: 1 });
			return past < rodizioDate;
		},
	);

	filteredData.sort(function (a: IRodizioData, b: IRodizioData) {
		return b.attributes.INICIO > a.attributes.INICIO ? 1 : -1;
	});

	let observations: string[] = [];
	const datas: IRodizio[] = filteredData.map(v => {
		const { INICIO, RETOMADA, NORMALIZACAO, OBSERVACAO } = v.attributes;

		observations.push(OBSERVACAO);

		return {
			INICIO: INICIO,
			RETOMADA: RETOMADA,
			NORMALIZACAO: NORMALIZACAO,
		};
	});

	let hasCurrent = datas.filter(v => {
		const start = new Date(v.INICIO);
		const end = new Date(v.NORMALIZACAO);
		return TimeIn(start, end, now);
	})

	let hasNext = datas.filter(v => {
		return v.INICIO > new Date().getTime()
	})

	let currentRodizio = hasCurrent[0] ?? null;
	let currentObservation = observations[0];
	let nextRestrictions: IRodizio[] = [...hasNext];

	let fullAddress: string = suggestions[0].text.split(',')[0];

	const lastRestrictions = datas.slice(1, 6);
	const predictRestriction = analyseRodizio(lastRestrictions);

	let ref: IRodizio[];

	if (nextRestrictions.length > 0) {
		ref = nextRestrictions
	} else if (hasCurrent.length > 0) {
		ref = hasCurrent
	} else {
		ref = lastRestrictions
	}
	let nextRodizios: IRodizio[] = predictRodizio(ref, predictRestriction, currentRodizio)


	return {
		current: currentRodizio,
		next: nextRodizios,
		observation: currentObservation,
		location: fullAddress
	}
}

function analyseRodizio(lastRodizio: IRodizio[]): number {
	const days: number[] = [];

	lastRodizio.forEach((obj, i) => {
		if (i === 0) return;

		const prev = lastRodizio[i - 1];
		const curr = obj;
		const prevDate = TimeAdd(new Date(prev.RETOMADA), { seconds: 1 });
		const currDate = curr.RETOMADA;

		const results = Timeleft(new Date(currDate), prevDate);

		days.push(results.days ?? 0);
	});

	const counter = count<number>(days);
	const predictor = Object.keys(counter).reduce((a, b) =>
		counter[a] > counter[b] ? a : b,
	);
	return Number(predictor);
}

function predictRodizio(list: IRodizio[], distance: number, current: IRodizio): IRodizio[] {
	const now = new Date().getTime();
	let refs: IRodizio[] = [...list];
	let nextRestrictions: IRodizio[] = [];
	let initialRef = refs[refs.length - 1];
	let anchorRef = [];

	let ignored = false;
	let needIgnore = current !== null && !isObjectEmpty(current) && isObjectSame(initialRef, current)

	while (nextRestrictions.length <= 3) {
		let ref: IRodizio;
		if (nextRestrictions.length > 0) {
			ref = nextRestrictions[nextRestrictions.length - 1]
		} else if (anchorRef.length > 0) {
			ref = anchorRef[anchorRef.length - 1];
		} else {
			ref = initialRef;
		}
		const { INICIO, RETOMADA, NORMALIZACAO } = ref;

		const nextInicio = TimeAdd(new Date(INICIO), { days: distance }).getTime()
		const nextRetomada = TimeAdd(new Date(RETOMADA), { days: distance }).getTime()
		const nextNormalizacao = TimeAdd(new Date(NORMALIZACAO), {
			days: distance,
		}).getTime()

		if (nextInicio < now) {
			anchorRef.push({
				INICIO: nextInicio,
				RETOMADA: nextRetomada,
				NORMALIZACAO: nextNormalizacao,
			})
			continue;
		};


		if (!ignored && needIgnore) {
			ignored = true;
			nextRestrictions.shift()
		}

		nextRestrictions.push({
			INICIO: nextInicio,
			RETOMADA: nextRetomada,
			NORMALIZACAO: nextNormalizacao,
		});
	}

	return nextRestrictions;
}
