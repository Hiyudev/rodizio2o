// /api/rodizio?cep=...?num=...
import Cors from "cors";
import initMiddleware from "../../../lib/middleware";
import { getRodizio } from "../../../lib/rodizio";

const cors = initMiddleware(
	Cors({
		methods: ["GET"],
	})
);

// https://nextjs.org/docs/api-routes/response-helpers
export default async function rodizioHandler(req, res) {
	await cors(req, res);

	const cep = req.query.cep;
	const num = req.query.num;

	const apires = await getRodizio(cep, num);

	res.status(200).json(apires);
}
