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

export const TimeIn = (start: Date, end: Date, comparasion: Date): boolean => {
	return comparasion > start && comparasion < end;
};

export class RodizioDate {
	private _date: number;

	constructor(data: number) {
		this._date = data;
	}

	get getJSDate() {
		return new Date(this._date);
	}

	get date(): number {
		return this._date;
	}

	set date(data: number | Date) {
		let num;
		if (data instanceof Date) {
			num = data.getTime();
		} else {
			num = data;
		}
		this._date = num;
	}

	changeTime(changeQuantity: DurationLike) {
		this.date = TimeAdd(this.getJSDate, changeQuantity);
		return this;
	}
}
