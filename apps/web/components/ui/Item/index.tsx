import s from "./item.module.css";

interface IItem {
	icon: React.ReactNode;
	title: string;
	description: string;
}

function Item({ icon, title, description }: IItem) {
	return (
		<dl className={s.item}>
			<dt>
				<div className={s.item_icon}>{icon}</div>
				<p className={s.item_title}>{title}</p>
			</dt>
			<dd className={s.item_description}>{description}</dd>
		</dl>
	);
}

export default Item;
