import { RefObject, useEffect, useRef } from "react";

function useEventListener<T extends HTMLElement = HTMLDivElement>(
	eventName: keyof WindowEventMap | string,
	handler: (event: Event) => void,
	element?: RefObject<T>
) {
	const savedHandler = useRef<(event: Event) => void>();

	useEffect(() => {
		const targetElement: T | Window = element?.current || window;
		if (!(targetElement && targetElement.addEventListener)) {
			return;
		}

		if (savedHandler.current !== handler) {
			savedHandler.current = handler;
		}

		const eventListener = (event: Event) => {
			// eslint-disable-next-line no-extra-boolean-cast
			if (!!savedHandler?.current) {
				savedHandler.current(event);
			}
		};

		targetElement.addEventListener(eventName, eventListener);

		return () => {
			targetElement.removeEventListener(eventName, eventListener);
		};
	}, [eventName, element, handler]);
}

export default useEventListener;
