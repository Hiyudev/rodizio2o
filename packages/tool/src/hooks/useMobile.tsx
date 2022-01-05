import { useEffect, useState } from "react";
import useWindowSize from "./useWindowSize";

const useMobile = (): { isMobile: boolean } => {
	const [isMobile, setMobile] = useState(false);
	const { width } = useWindowSize();

	useEffect(() => {
		setMobile(width <= 640);
	}, [width]);

	return { isMobile };
};

export default useMobile;
