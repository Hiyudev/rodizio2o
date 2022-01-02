import s from "./tool.module.css";
import WaveLayout from "../WaveLayout";
import AddresBar from "../../tool/AddressBar";
import RodizioDate from "../../tool/RodizioDate";

const Tool = () => {
	return (
		<WaveLayout>
			<main className={s.tool}>
				<AddresBar />

				<div className={s.display}>
					<div></div>
					<div className={s["display-info"]}>Água normaliza em</div>
					<h1>4h</h1>
					<p className={s["display-date"]}>Acaba às 31/11 - 16:00</p>
				</div>

				<ul className={s.cycle}>
					<RodizioDate />
					<RodizioDate />
					<RodizioDate />
				</ul>
			</main>
		</WaveLayout>
	);
};

export default Tool;
