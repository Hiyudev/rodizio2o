import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import useWindowSize from "../../../hooks/useWindowSize";
import Close from "../../icons/Close";
import Menu from "../../icons/Menu";
import Button from "../../ui/Button";
import Logo from "../../ui/Logo";
import Layout from "../Layout";
import s from "./navbar.module.css";
import ThemeSwitcher from "../../ui/ThemeSwitcher";
import { usePWAInstall } from "react-use-pwa-install";

const Navbar = () => {
	const install = usePWAInstall();
	const { width } = useWindowSize();
	const [isMobile, setMobile] = useState(false);

	useEffect(() => {
		if (width > 640 && isMobile) {
			setMobile(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [width]);

	const List = () => {
		return (
			<Fragment>
				<li className={s.link}>
					<Link href="/dev">Dev</Link>
				</li>
				{install && <Button onClick={install}>Baixe o aplicativo</Button>}
				<ThemeSwitcher />
			</Fragment>
		);
	};

	return (
		<Fragment>
			<Layout>
				<nav className={s.nav}>
					<Link href="/">
						<a className={s.navlogo}>
							<Logo />
						</a>
					</Link>

					<ul className={s.navlist}>
						<List />
					</ul>

					<div className={s.navmenu}>
						<button aria-label="menu button" onClick={() => setMobile(true)}>
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
				<ul className={s.mobilelist}>
					<List />
				</ul>
			</div>
		</Fragment>
	);
};

export default Navbar;
