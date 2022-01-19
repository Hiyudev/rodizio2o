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

	const { search } = req.query;

	let suggestions = await getSuggestions(search);
	let resBody = [];
	for (const suggestion of suggestions) {
		resBody.push(suggestion["text"]);
	}

	res.status(200).send(resBody);
}
