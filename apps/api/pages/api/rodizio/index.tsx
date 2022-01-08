// /api/rodizio?cep=...?num=...
import Cors from "cors";
import { getAddress } from "../../../lib/api";
import initMiddleware from "../../../lib/middleware";
import { getRodizio, getRodizioByCep } from "../../../lib/rodizio";

const cors = initMiddleware(
	Cors({
		methods: ["GET"],
	})
);

export default async function rodizioHandler(req, res) {
	await cors(req, res);

	const cep = req.query.cep?.replaceAll("-", "");
	const num = req.query.num;
	let address = req.query.address;

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
