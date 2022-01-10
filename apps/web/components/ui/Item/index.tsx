import s from "./item.module.css";

interface IItem {
	icon: React.ReactNode;
	title: string;
	description: string;
}

function Item({ icon, title, description }: IItem) {
	return (
		<li className={s.item}>
			<dt>
				<div className={s.item_icon}>{icon}</div>
				<p className={s.item_title}>{title}</p>
			</dt>
			<dd className={s.item_description}>{description}</dd>
		</li>
	);
}

export default Item;
