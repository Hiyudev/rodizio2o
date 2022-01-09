import Clock from "../../icons/Clock";
import Database from "../../icons/Database";
import Droplet from "../../icons/Droplet";
import Reflesh from "../../icons/Reflesh";
import { GradientText } from "../../ui/Text";
import s from "./feature.module.css";

const Feature = () => {
	return (
		<div className={s.page}>
			<h2>
				Ferramenta que <GradientText>facilita</GradientText> a sua vida
			</h2>

			<ul className={s.list}>
				<li className={s.item}>
					<dt>
						<div className={s.item_icon}>
							<Droplet />
						</div>
						<p className={s.item_title}>Previsão dos próximos rodízios</p>
					</dt>
					<dd className={s.item_description}>
						O sistema do Sanepar apenas mostra o rodízio atual e algumas vezes,
						o próximo. Neste sistema, ele providencia um sistema para prever
						quais são os próximos quatro rodízios.
					</dd>
				</li>
				<li className={s.item}>
					<dt>
						<div className={s.item_icon}>
							<Reflesh />
						</div>

						<p className={s.item_title}>Atualização diária</p>
					</dt>
					<dd className={s.item_description}>
						São analisadas a cada três horas se há algum imprevisto como obras
						ou suspensões.
					</dd>
				</li>
				<li className={s.item}>
					<dt>
						<div className={s.item_icon}>
							<Clock />
						</div>

						<p className={s.item_title}>Calculo da quantidade de tempo</p>
					</dt>
					<dd className={s.item_description}>
						Planeje com mais facilidade o que fazer com a disponibilidade da
						água.
					</dd>
				</li>
				<li className={s.item}>
					<dt>
						<div className={s.item_icon}>
							<Database />
						</div>

						<p className={s.item_title}>Para internet até de escadinhas</p>
					</dt>
					<dd className={s.item_description}>
						Todos os dados são colocados localmente salvados, o que ajuda as
						pessoas que não possuem internet de melhor qualdiade.
					</dd>
				</li>
			</ul>
		</div>
	);
};

export default Feature;
