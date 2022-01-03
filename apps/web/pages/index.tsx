import Section from "../components/layout/Section";
import Feature from "../components/layout/Feature";
import Footer from "../components/layout/Footer";
import Hero from "../components/layout/Hero";
import Navbar from "../components/layout/Navbar";
import Tool from "../components/layout/Tool";
import { Fragment } from "react";
import ExtensionDemo from "../components/icons/ExtensionDemo";
import Button from "../components/ui/Button";
import { GradientText } from "../components/ui/Text";

const IndexPage = () => (
	<Fragment>
		<Navbar />

		<Hero>
			<h1 className="text-center">
				veja se o <GradientText>rodízio</GradientText> de água com apenas um
				toque
			</h1>
		</Hero>

		<Tool />

		<Feature />

		<Section image={<ExtensionDemo />}>
			<h2>
				SAIBA SEMPRE QUANDO OCORRE AS PRÓXIMAS RESTRIÇÕES COM A{" "}
				<GradientText>EXTENSÃO</GradientText>
			</h2>
			<p>
				Basta colocar CEP e o número da residência e calcule para evitar
				qualquer imprevisto
			</p>
			<Button>Baixe extensão</Button>
		</Section>

		<Footer />
	</Fragment>
);

export default IndexPage;
