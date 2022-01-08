export async function getSuggestions(street: string): Promise<string[]> {
	const url = `http://localhost:3001/api/suggestions?search=${street}`;

	try {
		const res = await fetch(url)
		const data: string[] = await res.json()
		return data;
	} catch (err) {
		throw new Error(err.message)
	}
}
