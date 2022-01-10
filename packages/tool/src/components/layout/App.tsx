import { RodizioWrapper } from "../../hooks/useRodizio";
import ToolContainer from "../tool/ToolContainer";

interface IApp {
	hasThemeSwitcher: boolean;
	className: string;
}

export const App = ({ hasThemeSwitcher, className }: IApp) => {
	return (
		<RodizioWrapper>
			<ToolContainer
				hasThemeSwitcher={hasThemeSwitcher}
				className={className}
			/>
		</RodizioWrapper>
	);
};
