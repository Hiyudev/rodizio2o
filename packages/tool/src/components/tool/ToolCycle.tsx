import { Fragment, useMemo, useReducer } from "react";
import useKeyPress from "../../hooks/useKeyPress";
import useScreen from "../../hooks/useScreen";
import LeftArrowIcon from "../../icons/LeftArrow";
import RightArrowIcon from "../../icons/RightArrow";
import { constructGroups as formGroups } from "../../lib/Array";
import { IEvent } from "../../shared";
import ToolDate, { ToolDateSkeleton } from "./ToolDate";

interface IToolCycle {
	loaded: boolean;
	list: IEvent[];
}
function ToolCycle({ loaded, list }: IToolCycle) {
	const { isTablet } = useScreen();

	const groups = useMemo(() => {
		if (!list) return;
		return formGroups(3, list);
	}, [list]);

	function reducer(cyclePage, action) {
		switch (action.type) {
			case "next":
				if (cyclePage === (groups.length - 1 ?? 0)) return groups?.length - 1;
				else return cyclePage + 1;
			case "back":
				if (cyclePage === 0) return 0;
				else return cyclePage - 1;
			default:
				throw new Error();
		}
	}
	const [page, changePage] = useReducer(reducer, 0);

	const renderList = useMemo(() => {
		if (!groups) return;
		return groups[page];
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page]);

	const mobileList = list && list.filter((v) => !v.disabled).slice(0, 2);

	const Cycle = () => {
		if (isTablet) {
			if (loaded) {
				return (
					<Fragment>
						{mobileList.map((v, i) => {
							return (
								<ToolDate
									key={i}
									eventName={v.name}
									eventDate={new Date(v.data)}
									active={v.active}
								/>
							);
						})}
					</Fragment>
				);
			} else {
				return (
					<Fragment>
						<ToolDateSkeleton />
						<ToolDateSkeleton />
					</Fragment>
				);
			}
		} else {
			if (loaded && renderList) {
				return (
					<Fragment>
						{renderList.map((v, i) => {
							return (
								<ToolDate
									key={i}
									eventName={v.name}
									eventDate={new Date(v.data)}
									disabled={v.disabled}
									active={v.active}
								/>
							);
						})}
					</Fragment>
				);
			} else {
				return (
					<Fragment>
						<ToolDateSkeleton />
						<ToolDateSkeleton />
						<ToolDateSkeleton />
					</Fragment>
				);
			}
		}
	};

	useKeyPress("ArrowRight", () => {
		changePage({ type: "next" });
	});
	useKeyPress("ArrowLeft", () => {
		changePage({ type: "back" });
	});

	return (
		<ul className="flex flex-col items-start space-y-4 sm:space-y-0 sm:space-x-4 sm:items-center sm:flex-row">
			{!isTablet && (
				<button
					disabled={page === 0 || !loaded}
					onClick={() => changePage({ type: "back" })}
					className="disabled:text-gray-400"
				>
					<LeftArrowIcon />
				</button>
			)}

			<Cycle />

			{!isTablet && (
				<button
					disabled={page === (groups?.length - 1 ?? 0) || !loaded}
					onClick={() => changePage({ type: "next" })}
					className="disabled:text-gray-400"
				>
					<RightArrowIcon />
				</button>
			)}
		</ul>
	);
}

export default ToolCycle;
