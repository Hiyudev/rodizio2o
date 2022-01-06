import { useEffect } from "react";

export default function useKeypress(key: string, action: () => void) {
	useEffect(() => {
		function onKeyup(e) {
			if (e.key === key) action();
		}
		window.addEventListener("keyup", onKeyup);
		return () => window.removeEventListener("keyup", onKeyup);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
}
