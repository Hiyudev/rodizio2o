import ToolContainer from "../tool/ToolContainer";

interface IApp {
	hasThemeSwitcher: boolean;
	className: string;
}

const App = ({ hasThemeSwitcher, className }: IApp) => {
	return (
		<ToolContainer hasThemeSwitcher={hasThemeSwitcher} className={className} />
	);
};

export default App;
