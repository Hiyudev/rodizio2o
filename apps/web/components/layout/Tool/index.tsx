import dynamic from "next/dynamic";
import LoaderIcon from "../../icons/Loader";
import WaveLayout from "../WaveLayout";

import s from "./tool.module.css";

const App = dynamic(() => import("tool"), {
	loading: () => (
		<main className={s.loading}>
			<LoaderIcon className="animate-spin" />
		</main>
	),
	ssr: false,
});

const Tool = () => {
	return (
		<WaveLayout>
			<App hasThemeSwitcher={false} className="h-96 rounded-2xl" />
		</WaveLayout>
	);
};

export default Tool;
