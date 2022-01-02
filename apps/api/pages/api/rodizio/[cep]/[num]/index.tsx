// /api/rodizio/[cep]/[num]
import Cors from "cors";
import initMiddleware from "../../../../../lib/middleware";
import { getRodizio } from "../../../../../lib/rodizio";

const cors = initMiddleware(
	Cors({
		methods: ["GET"],
	})
);

// https://nextjs.org/docs/api-routes/response-helpers
export default async function staticRodiziohandler(req, res) {
	await cors(req, res);

	const {
		query: { cep, num },
	} = req;

	const apires = await getRodizio(cep, num);

	res.json(apires);
}
