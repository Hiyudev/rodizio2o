import s from "./item.module.css";

interface IItem {
	icon: React.ReactNode;
	title: string;
	description: string;
}

function Item({ icon, title, description }: IItem) {
	return (
		<li className={s.item}>
			<div>
				<div className={s.item_icon}>{icon}</div>
				<p className={s.item_title}>{title}</p>
			</div>
			<div className={s.item_description}>{description}</div>
		</li>
	);
}

export default Item;
