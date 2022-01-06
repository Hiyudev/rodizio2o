import useMobile from "../../hooks/useMobile";
import LeftArrowIcon from "../../icons/LeftArrow";
import RightArrowIcon from "../../icons/RightArrow";

interface IToolCycle {
	children: React.ReactNode;
}
function ToolCycle({ children }: IToolCycle) {
	const { isMobile } = useMobile();

	return (
		<ul className="flex flex-col items-start sm:items-center sm:flex-row">
			{!isMobile && (
				<button className="invisible sm:visible">
					<LeftArrowIcon />
				</button>
			)}
			{children}
			{!isMobile && (
				<button>
					<RightArrowIcon />
				</button>
			)}
		</ul>
	);
}

export default ToolCycle;
