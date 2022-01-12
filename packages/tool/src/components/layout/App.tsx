import ToolContainer from "../tool/ToolContainer";

interface IApp {
	hasThemeSwitcher: boolean;
	className: string;
}

export const App = ({ hasThemeSwitcher, className }: IApp) => {
	return (
		<ToolContainer hasThemeSwitcher={hasThemeSwitcher} className={className} />
	);
};
