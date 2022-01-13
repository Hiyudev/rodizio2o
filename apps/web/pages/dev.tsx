import { Fragment } from "react";
import Developer from "../components/icons/Developer";
import ApiSection from "../components/layout/Api";
import Footer from "../components/layout/Footer";
import Hero from "../components/layout/Hero";
import Navbar from "../components/layout/Navbar";
import Section from "../components/layout/Section";
import Button from "../components/ui/Button";
import { GradientText } from "../components/ui/Text";

const DevPage = () => {
	return (
		<Fragment>
			<Navbar />

			<Hero>
				<h1 className="text-center">
					<GradientText>api</GradientText> disponível para desenvolvedores
				</h1>
			</Hero>

			<ApiSection url={process.env.NEXT_PUBLIC_API_URL} />

			<Section image={<Developer />}>
				<h2>
					é um <GradientText>Programador</GradientText> e quer ver ou ajudar o
					projeto?
				</h2>

				<p>Acesse o projeto open-source através do github</p>

				<a href={"https://github.com/KeysHD/rodizio2o"}>
					<Button>Acessar o projeto</Button>
				</a>
			</Section>

			<Footer />
		</Fragment>
	);
};

export default DevPage;
