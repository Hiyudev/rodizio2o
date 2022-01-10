import { Fragment } from "react";
import DownloadSection from "../components/layout/Download";
import Footer from "../components/layout/Footer";
import Hero from "../components/layout/Hero";
import Navbar from "../components/layout/Navbar";
import { GradientText } from "../components/ui/Text";

function DownloadPage() {
	return (
		<Fragment>
			<Navbar />

			<Hero>
				<h1 className="text-center">
					Instale o <GradientText>aplicativo</GradientText> abaixo
				</h1>
			</Hero>

			<DownloadSection />

			<Footer />
		</Fragment>
	);
}

export default DownloadPage;
