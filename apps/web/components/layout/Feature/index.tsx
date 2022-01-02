import Clock from "../../icons/Clock";
import Database from "../../icons/Database";
import Droplet from "../../icons/Droplet";
import Reflesh from "../../icons/Reflesh";
import s from "./feature.module.css";

const Feature = () => {
	return (
		<div className={s.page}>
			<h2>Ferramenta que facilita a sua vida</h2>

			<ul className={s.list}>
				<li className={s.item}>
					<Droplet />
					<span>Previsões dos próximos rodízios</span>
				</li>
				<li className={s.item}>
					<Reflesh />
					<span>Atualização diária para o máximo de precisão</span>
				</li>
				<li className={s.item}>
					<Clock />
					<span>Calculo da quantidade de tempo</span>
				</li>
				<li className={s.item}>
					<Database />
					<span>Dados eficientemente guardados localmente</span>
				</li>
			</ul>
		</div>
	);
};

export default Feature;
