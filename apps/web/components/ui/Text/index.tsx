import s from "./text.module.css";

export const GradientText = ({ children }) => {
	return <span className={s.textgradient}>{children}</span>;
};
