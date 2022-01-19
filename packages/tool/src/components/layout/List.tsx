import { useRodizio } from "../../hooks/useRodizio";
import ToolDate from "../tool/ToolDate";

function ToolListPage() {
	const { futureEvents } = useRodizio();

	return (
		<ul className="flex flex-col">
			{futureEvents?.length > 0 ? (
				futureEvents
					.filter((v) => !v.disabled)
					.map((v, i) => {
						return (
							<ToolDate
								key={i}
								active={v.active}
								eventDate={new Date(v.data)}
								eventName={v.name}
							/>
						);
					})
			) : (
				<li>
					Não foi encontrado nenhuma previsão dos próximos rodízio. Veja se você
					configurou o endereço corretamente.
				</li>
			)}
		</ul>
	);
}

export default ToolListPage;
