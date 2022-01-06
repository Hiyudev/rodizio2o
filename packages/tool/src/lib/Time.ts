import { DateTime, DurationLike, DurationObjectUnits } from 'luxon';

export const Timeleft = (now: Date, future: Date): DurationObjectUnits => {
	const nowTime = DateTime.fromJSDate(now);
	const futureTime = DateTime.fromJSDate(future);

	const result = futureTime
		.diff(nowTime, ['day', 'hour', 'minutes', 'seconds'])
		.toObject();
	return result;
};

export const TimeAdd = (data: Date, change: DurationLike): Date => {
	const newdata = DateTime.fromJSDate(data).plus(change);
	return newdata.toJSDate();
};

export const TimeSub = (data: Date, change: DurationLike): Date => {
	const newdata = DateTime.fromJSDate(data).minus(change);
	return newdata.toJSDate();
};

export const MonthConvert = (month: number): string => {
	const monthNames = [
		'Janeiro',
		'Fevereiro',
		'Março',
		'Abril',
		'Maio',
		'Junho',
		'Julho',
		'Agosto',
		'Setembro',
		'Outubro',
		'Novembro',
		'Dezembro',
	];
	return monthNames[month];
};

export const TimeIn = (start: Date, end: Date, comparasion: Date): boolean => {
	return comparasion > start && comparasion < end;
};
