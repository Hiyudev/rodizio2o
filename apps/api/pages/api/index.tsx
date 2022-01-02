// /api/rodizio?cep=...?num=...
import Cors from "cors";
import initMiddleware from "../../lib/middleware";
const cors = initMiddleware(
	Cors({
		methods: ["GET"],
	})
);

export default async function suggestionHandler(req, res) {
	await cors(req, res);
	res.status(404);
}
