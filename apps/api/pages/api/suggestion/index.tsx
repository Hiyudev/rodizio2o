// /api/suggestion?search=...
import Cors from "cors";
import initMiddleware from "../../../lib/middleware";
import { getSuggestions } from "../../../lib/api";

const cors = initMiddleware(
	Cors({
		methods: ["GET"],
	})
);

export default async function suggestionHandler(req, res) {
	await cors(req, res);

	const search = req.query.search;

	const suggestion = await getSuggestions(search);

	res.status(200).send(suggestion[0].text);
}
