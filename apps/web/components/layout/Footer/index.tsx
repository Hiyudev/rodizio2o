import Github from "../../icons/Github";
import KeysIcon from "../../icons/KeysLogo";
import Twitter from "../../icons/Twitter";
import Logo from "../../ui/Logo";
import s from "./footer.module.css";

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
				<a href="https://github.com/KeysHD/rodizio2o">
					<Github />
				</a>
			</div>
			<div>
				<p className={s.creator}>
					Criado e feito por{" "}
					<a
						className={s.creatorlink}
						href="https://portfolio-yuki2dev.vercel.app/"
					>
						Yuki
					</a>
				</p>

				<ul className={s.creatorlist}>
					<li>
						<a href="https://github.com/KeysHD">
							<Github />
						</a>
					</li>

					<li>
						<a href="https://twitter.com/Yuki2dev">
							<Twitter />
						</a>
					</li>
					<li>
						<a href="https://portfolio-yuki2dev.vercel.app/">
							<KeysIcon />
						</a>
					</li>
				</ul>
			</div>
		</footer>
	);
};

export default Footer;
