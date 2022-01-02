import s from "./RodizioDate.module.css";

const RodizioDate = () => {
	return (
		<div className={s.card}>
			<div className={s.date}>
				<div className={s.day}>02</div>
				<div className={s.month}>Dez</div>
			</div>

			<div className={s.description}>
				Retomada
				<br/>
				16:00
			</div>
		</div>
	)
}

export default RodizioDate;
