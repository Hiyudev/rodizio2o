type Group<T> = [T, T, T]

export function constructGroups<T>(n: number, data: T[]): Group<T>[] {
	let result = [];
	for (let i = 0; i < data.length; i += n) result.push(data.slice(i, i + n));
	return result;
};
