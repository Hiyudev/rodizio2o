import s from "./section.module.css";

interface ISection {
	image: React.ReactNode;
	children: React.ReactNode[];
}
const Section = ({ image, children }: ISection) => {
	return (
		<div className={s.page}>
			<div className={s.image}>{image}</div>
			<div className={s.content}>{children}</div>
		</div>
	);
};

export default Section;
