import Github from "../../icons/Github";
import KeysIcon from "../../icons/KeysLogo";
import Twitter from "../../icons/Twitter";
import Logo from "../../ui/Logo";
import s from "./footer.module.css";

const Footer = () => {
	return (
		<footer className={s.footer}>
			<div className={s.logo}>
				<div className={s.icon}>
					<Logo />
				</div>
				<h3>Rodizio2O</h3>
			</div>

			<div>
				<a
					aria-label="Project repository github"
					className={s.link}
					href="https://github.com/KeysHD/rodizio2o"
				>
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
						<a
							aria-label="Creator github"
							className={s.link}
							href="https://portfolio-yuki2dev.vercel.app/social/github"
						>
							<Github />
						</a>
					</li>

					<li>
						<a
							aria-label="Creator twitter"
							className={s.link}
							href="https://portfolio-yuki2dev.vercel.app/social/twitter"
						>
							<Twitter />
						</a>
					</li>
					<li>
						<a
							aria-label="Creator portfolio"
							className={s.link}
							href="https://portfolio-yuki2dev.vercel.app/"
						>
							<KeysIcon />
						</a>
					</li>
				</ul>
			</div>
		</footer>
	);
};

export default Footer;
