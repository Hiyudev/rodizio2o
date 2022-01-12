import rodizioHandler from "../pages/api/rodizio";
import { createMocks } from 'node-mocks-http';
import staticRodiziohandler from "../pages/api/rodizio/[cep]/[num]";
import suggestionHandler from "../pages/api/suggestions";

const testRodizioResponse = (res) => {
	const now = new Date();
	const data = JSON.parse(res._getData());
	expect(res._getStatusCode()).toBe(200);
	expect(data).toContainAllKeys(['current', 'location', 'next', 'observation']);

	if (data.current) {
		const start = new Date(data.current.INICIO);
		const end = new Date(data.current.RETOMADA);
		expect(now).toBeBetween(start, end);
	} else {
		expect(data.current).toBeNull();
	}

	expect(data.next).toHaveLength(4);

	data.next.map(v => {
		expect(v.INICIO).toBeAfter(now);
	})

	expect(data.observation).toBeDefined();
	expect(data.location).toMatch(/Alameda Presidente Taunay 1720/)
}

describe("Test API Routes", () => {
	it("is API Route [?cep=...?num=...] for rodizio data working", async () => {
		const { req, res } = createMocks({
			method: 'GET',
			query: {
				cep: "80430-042",
				num: "1720"
			},
		});

		await rodizioHandler(req, res);

		testRodizioResponse(res);
	})

	it("is API Route [?address=...] for rodizio data working", async () => {
		const { req, res } = createMocks({
			method: 'GET',
			query: {
				address: "Alameda Presidente Taunay 1720, Mercês",
			},
		});

		await rodizioHandler(req, res);

		testRodizioResponse(res);
	})

	it("is API Route [/[cep]/[num]] for rodizio data working", async () => {
		const { req, res } = createMocks({
			method: 'GET',
			query: {
				cep: "80430-042",
				num: "1720"
			},
		});

		await staticRodiziohandler(req, res);

		testRodizioResponse(res);
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
		const data = res._getData();

		expect(data.length).toBe(1);
		expect(data[0]).toMatch(/Alameda Presidente Taunay 1720/)
	})
})
