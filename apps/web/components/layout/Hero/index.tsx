import Layout from "../Layout";
import s from "./hero.module.css";

const Hero = ({ children }) => {
	return (
		<Layout>
			<div className={s.hero}>{children}</div>
		</Layout>
	);
};

export default Hero;
