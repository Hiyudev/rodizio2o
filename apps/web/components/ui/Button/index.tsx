import { HTMLProps } from "react";
import s from "./button.module.css";

const Button: React.FC<HTMLProps<HTMLButtonElement>> = ({ children }) => {
	return <button className={s.button}>{children}</button>;
};

export default Button;
