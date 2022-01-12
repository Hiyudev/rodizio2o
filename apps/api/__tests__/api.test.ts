import { getSuggestions, getAddress } from "../lib/api";
import { getRodizioByCep, getRodizio } from "../lib/rodizio";

describe("Test rodizio API", () => {
	it('is going to get the correct suggestion', async () => {
		const suggestion = await getSuggestions("Alameda Presidente Taunay 1720 Mercês");

		expect(suggestion[0].text).toMatch(/Alameda Presidente Taunay 1720, Mercês/)
	})

	it("is going to get the correct address", async () => {
		const address = await getAddress("80430-042", "1720");

		expect(address).toMatch(/Alameda Presidente Taunay 1720/);
	})

	it("[With CEP] is going to throw error with invalid cep", () => {
		expect(() => {
			expect.assertions(2);

			const invalidCeps = ["80525140", "82140"]
			for (const cep of invalidCeps) {
				try {
					getRodizioByCep(cep, "")
				} catch (error) {
					expect(error).toBeInstanceOf(TypeError);
				}
			}
		})
	})

	it("[With CEP] is going to receive the correct data", async () => {
		const res = await getRodizioByCep("80430042", "1720");
		const now = new Date();

		if (res.current) {
			const start = new Date(res.current.INICIO);
			const end = new Date(res.current.RETOMADA);
			expect(now).toBeBetween(start, end);
		} else {
			expect(res.current).toBeNull()
		}

		expect(res.next).toHaveLength(4);

		res.next.map(v => {
			expect(v.INICIO).toBeAfter(now);
		})

		expect(res.observation).toBeDefined();
		expect(res.location).toMatch(/Alameda Presidente Taunay 1720/)
	})

	it("[With Address] is going to receive the correct data", async () => {
		const res = await getRodizio("Alameda Presidente Taunay 1720, Mercês");

		const now = new Date();

		if (res.current) {
			const start = new Date(res.current.INICIO);
			const end = new Date(res.current.RETOMADA);
			expect(now).toBeBetween(start, end);
		} else {
			expect(res.current).toBeNull()
		}

		expect(res.next).toHaveLength(4);

		res.next.map(v => {
			expect(v.INICIO).toBeAfter(now);
		})

		expect(res.observation).toBeDefined();
		expect(res.location).toMatch(/Alameda Presidente Taunay 1720/)
	})

	it("[With Address] is going to throw error with invalid address", async () => {
		try {
			await getRodizio("Rua Sweet home alabama");
		} catch (err) {
			expect(err).toBeInstanceOf(TypeError);
		}
	})
})
