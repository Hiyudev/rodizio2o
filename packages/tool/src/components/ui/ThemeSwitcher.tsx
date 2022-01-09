import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Sun from "../../icons/Sun";
import Moon from "../../icons/Moon";

const ThemeSwitcher = () => {
	const [isMounted, setIsMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const switchTheme = () => {
		if (isMounted) {
			setTheme(theme === "light" ? "dark" : "light");
		}
	};

	return (
		<button
			className="flex justify-center items-center w-[2.5rem] h-[2.5rem]"
			onClick={switchTheme}
		>
			{isMounted && theme === "light" ? <Sun /> : <Moon />}
		</button>
	);
};

export default ThemeSwitcher;
