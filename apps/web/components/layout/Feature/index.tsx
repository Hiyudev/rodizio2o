import Clock from "../../icons/Clock";
import Database from "../../icons/Database";
import Droplet from "../../icons/Droplet";
import Reflesh from "../../icons/Reflesh";
import Item from "../../ui/Item";
import { GradientText } from "../../ui/Text";
import s from "./feature.module.css";

const Feature = () => {
	return (
		<div className={s.page}>
			<h2>
				Ferramenta que <GradientText>facilita</GradientText> a sua vida
			</h2>

			<ul className={s.list}>
				<Item
					icon={<Droplet />}
					title="Previsão dos próximos rodízios"
					description="O sistema do Sanepar apenas mostra o rodízio atual e algumas vezes,
					o próximo. Neste sistema, ele providencia um sistema para prever
					quais são os próximos quatro rodízios."
				/>
				<Item
					icon={<Reflesh />}
					title="Atualização diária"
					description="São analisadas a cada três horas se há algum imprevisto como obras
					ou suspensões."
				/>
				<Item
					icon={<Clock />}
					title="Calculo da quantidade de tempo"
					description="Planeje com mais facilidade o que fazer com a disponibilidade da
					água"
				/>
				<Item
					icon={<Database />}
					title="Para internet até de escadinhas"
					description="Todos os dados são colocados localmente salvados, o que ajuda as
					pessoas que não possuem internet de melhor qualdiade."
				/>
			</ul>
		</div>
	);
};

export default Feature;
