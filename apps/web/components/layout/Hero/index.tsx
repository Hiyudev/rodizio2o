import Layout from '../Layout';
import s from './hero.module.css';

const Hero = ({ title }) => {
	return (
		<Layout>
			<div className={s.hero}>
				<h1 className={s.title}>{title}</h1>
			</div>
		</Layout>
	);
};

export default Hero;
