import WaveLayout from "../WaveLayout";
import { App } from "tool";

const Tool = () => {
	return (
		<WaveLayout>
			<App hasThemeSwitcher={false} className="h-96" />
		</WaveLayout>
	);
};

export default Tool;
