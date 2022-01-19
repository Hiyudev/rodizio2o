// /api/rodizio/[cep]/[num]
import Cors from "cors";
import initMiddleware from "../../../../../lib/middleware";
import { getRodizio, getRodizioByCep } from "../../../../../lib/rodizio";

const cors = initMiddleware(
	Cors({
		methods: ["GET"],
	})
);

export default async function staticRodiziohandler(req, res) {
	await cors(req, res);

	let { cep, num, address } = req.query;
	cep = cep.replaceAll("-", "");

	try {
		let apires;
		if (!address) {
			apires = await getRodizioByCep(cep, num);
		} else {
			apires = await getRodizio(address);
		}
		res.status(200).json(apires);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
}
