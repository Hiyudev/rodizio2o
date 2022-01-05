import { useState, useEffect } from "react";

function getWindowSize() {
	if (typeof window === "undefined") return { width: 0, height: 0 };
	const { innerWidth: width, innerHeight: height } = window;
	return {
		width,
		height,
	};
}

export default function useWindowSize() {
	const [windowSizes, setWindowSize] = useState(getWindowSize());

	useEffect(() => {
		function handleResize() {
			setWindowSize(getWindowSize());
		}

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return windowSizes;
}
