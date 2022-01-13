import { Fragment } from "react";
import Section from "../components/layout/Section";
import Feature from "../components/layout/Feature";
import Footer from "../components/layout/Footer";
import Hero from "../components/layout/Hero";
import Navbar from "../components/layout/Navbar";
import Tool from "../components/layout/Tool";
import ExtensionDemo from "../components/icons/ExtensionDemo";
import Button from "../components/ui/Button";
import { GradientText } from "../components/ui/Text";
import { usePWAInstall } from "react-use-pwa-install";

const IndexPage = () => {
	const install = usePWAInstall();

	return (
		<Fragment>
			<Navbar />

			<Hero>
				<h1 className="text-center">
					veja o <GradientText>rodízio</GradientText> de água com apenas um
					toque
				</h1>
			</Hero>

			<Tool />

			<Feature />

			<Section image={<ExtensionDemo />}>
				<h2>
					SAIBA SEMPRE QUANDO OCORRE AS PRÓXIMAS RESTRIÇÕES COM O{" "}
					<GradientText>APLICATIVO</GradientText>
				</h2>
				<p>
					Basta colocar CEP e o número da residência e calcule para evitar
					qualquer imprevisto
				</p>
				{install && <Button onClick={install}>Baixe o aplicativo</Button>}
			</Section>

			<Footer />
		</Fragment>
	);
};

export default IndexPage;
