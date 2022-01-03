import { getAddress, getSuggestions } from "../lib/api"
import { getRodizio } from "../lib/rodizio";
import rodizioHandler from "../pages/api/rodizio";
import { createMocks } from 'node-mocks-http';
import staticRodiziohandler from "../pages/api/rodizio/[cep]/[num]";
import suggestionHandler from "../pages/api/suggestions";

describe("Test rodizio API", () => {
	it('is going to get the correct suggestion', async () => {
		const suggestion = await getSuggestions("Alameda Presidente Taunay 1720 Mercês");

		expect(suggestion[0].text).toMatch(/Alameda Presidente Taunay 1720, Mercês/)
	})

	it("is going to get the correct address", async () => {
		const address = await getAddress("80430-042", "1720");

		expect(address).toMatch(/Alameda Presidente Taunay 1720/);
	})

	it("is going to throw error with invalid cep", () => {
		expect(() => {
			expect.assertions(2);

			const invalidCeps = ["80525140", "82140"]
			for (const cep of invalidCeps) {
				try {
					getRodizio(cep, "")
				} catch (error) {
					expect(error).toBeInstanceOf(TypeError);
				}
			}
		})
	})

	it("is going to receive the correct data", async () => {
		const res = await getRodizio("80430042", "1720");

		expect(res.current).toBeDefined();
		expect(res.next.length).toBe(4);
		expect(res.observation).toBeDefined();
		expect(res.location).toMatch(/Alameda Presidente Taunay 1720/)
	})
})

describe("Test API Routes", () => {
	it("is API Route for rodizio data working", async () => {
		const { req, res } = createMocks({
			method: 'GET',
			query: {
				cep: "80430-042",
				num: "1720"
			},
		});

		await rodizioHandler(req, res);

		expect(res._getStatusCode()).toBe(200);
		expect(Object.keys(JSON.parse(res._getData()))).toEqual(expect.arrayContaining(['current', 'location', 'next', 'observation']))
	})

	it("is API Route for rodizio data working", async () => {
		const { req, res } = createMocks({
			method: 'GET',
			query: {
				cep: "80430-042",
				num: "1720"
			},
		});

		await staticRodiziohandler(req, res);

		expect(res._getStatusCode()).toBe(200);
		expect(Object.keys(JSON.parse(res._getData()))).toEqual(expect.arrayContaining(['current', 'location', 'next', 'observation']))
	})

	it("is API Route for suggestions working", async () => {
		const { req, res } = createMocks({
			method: 'GET',
			query: {
				search: "Alameda Presidente Taunay 1720 Mercês",
			},
		});

		await suggestionHandler(req, res);

		expect(res._getStatusCode()).toBe(200);
		expect(res._getData().length).toBe(1);
	})
})
