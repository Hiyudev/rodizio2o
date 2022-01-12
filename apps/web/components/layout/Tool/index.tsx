import WaveLayout from "../WaveLayout";
import { App } from "tool";

const Tool = () => {
	return (
		<WaveLayout>
			<App hasThemeSwitcher={false} className="h-96 rounded-2xl" />
		</WaveLayout>
	);
};

export default Tool;
