import { Fragment } from "react";
import Developer from "../components/icons/Developer";
import ApiSection from "../components/layout/Api";
import Footer from "../components/layout/Footer";
import Hero from "../components/layout/Hero";
import Navbar from "../components/layout/Navbar";
import Section from "../components/layout/Section";
import Button from "../components/ui/Button";

const DevPage = () => {
	return (
		<Fragment>
			<Navbar />

			<Hero title="api disponível para desenvolvedores" />

			<ApiSection />

			<Section image={<Developer />}>
				<h2>
					é um programador e quer ver ou ajudar o projeto?
				</h2>

				<p>Acesse o projeto open-source através do github</p>

				<a href={"https://google.com"}>
					<Button>Acessar o projeto</Button>
				</a>
			</Section>

			<Footer />
		</Fragment>
	);
};

export default DevPage;
