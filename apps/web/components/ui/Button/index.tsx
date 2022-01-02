import s from "./button.module.css"

const Button = ({ children }) => {
	return (
		<button className={s.button}>
			{children}
		</button>
	)
}

export default Button;
