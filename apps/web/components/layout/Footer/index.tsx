import KeysIcon from '../../icons/KeysLogo';
import Twitter from '../../icons/Twitter';
import Logo from '../../ui/Logo';
import s from './footer.module.css';

const Footer = () => {
	return (
		<footer className={s.footer}>
			<div className={s.logo}>
				<div>
					<Logo />
				</div>
				<h3>Rodizio2O</h3>
			</div>
			<div>
				<p className={s.creator}>
					Criado e feito por{' '}
					<a
						className={s.creatorlink}
						href="https://portfolio-yuki2dev.vercel.app/"
					>
						Yuki
					</a>
				</p>

				<ul className={s.creatorlist}>
					<a href="https://twitter.com/Yuki2dev">
						<Twitter />
					</a>
					<a href="https://portfolio-yuki2dev.vercel.app/">
						<KeysIcon />
					</a>
				</ul>
			</div>
		</footer>
	);
};

export default Footer;
