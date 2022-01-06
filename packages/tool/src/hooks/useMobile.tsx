import { useEffect, useState } from "react";
import useWindowSize from "./useWindowSize";

const useScreenSize = (): { isMobile: boolean; isTablet: boolean } => {
	const [isMobile, setMobile] = useState(false);
	const [isTablet, setTablet] = useState(false);
	const { width } = useWindowSize();

	useEffect(() => {
		setMobile(width <= 640);
		setTablet(width <= 768);
	}, [width]);

	return { isMobile, isTablet };
};

export default useScreenSize;
