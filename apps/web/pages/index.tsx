import Section from "../components/layout/Section";
import Feature from "../components/layout/Feature";
import Footer from "../components/layout/Footer";
import Hero from "../components/layout/Hero";
import Navbar from "../components/layout/Navbar";
import Tool from "../components/layout/Tool";
import { Fragment } from "react";
import ExtensionDemo from "../components/icons/ExtensionDemo";
import Button from "../components/ui/Button";

const IndexPage = () => (
	<Fragment>
		<Navbar />

		<Hero title="veja se o rodízio de água com apenas um toque" />

		<Tool />

		<Feature />

		<Section image={<ExtensionDemo />}>
			<h2>SAIBA SEMPRE QUANDO OCORRE AS PRÓXIMAS RESTRIÇÕES COM A EXTENSÃO</h2>
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
