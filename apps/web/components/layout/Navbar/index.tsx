import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import useWindowSize from "../../../hooks/useWindowSize";
import Close from "../../icons/Close";
import Menu from "../../icons/Menu";
import Button from "../../ui/Button";
import Logo from "../../ui/Logo";
import Layout from "../Layout";
import s from "./navbar.module.css";
import ThemeSwitcher from "../../ui/ThemeSwitcher";

const Navbar = () => {
	const { width } = useWindowSize();
	const [isMobile, setMobile] = useState(false);

	useEffect(() => {
		if (width > 640 && isMobile) {
			setMobile(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [width]);

	const list = (
		<Fragment>
			<li>
				<Link href="/dev">Dev</Link>
			</li>
			<Button>
				<Link href="/download">Baixe o aplicativo</Link>
			</Button>
			<ThemeSwitcher />
		</Fragment>
	);

	return (
		<Fragment>
			<Layout>
				<nav className={s.nav}>
					<Link href="/">
						<a className={s.navlogo}>
							<Logo />
						</a>
					</Link>

					<ul className={s.navlist}>{list}</ul>

					<div className={s.navmenu}>
						<button onClick={() => setMobile(true)}>
							<Menu />
						</button>
					</div>
				</nav>
			</Layout>

			<div hidden={!isMobile} className={s.mobile}>
				<div className={s.mobilemenu}>
					<button onClick={() => setMobile(false)}>
						<Close />
					</button>
				</div>
				<ul className={s.mobilelist}>{list}</ul>
			</div>
		</Fragment>
	);
};

export default Navbar;
