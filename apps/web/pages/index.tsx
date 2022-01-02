import Product from "../components/layout/Product";
import Feature from "../components/layout/Feature";
import Footer from "../components/layout/Footer";
import Hero from "../components/layout/Hero";
import Navbar from "../components/layout/Navbar";
import Tool from "../components/layout/Tool";
import { Fragment } from "react";

const IndexPage = () => (
	<Fragment>
		<Navbar />

		<Hero title="veja se o rodízio de água com apenas um toque" />

		<Tool />

		<Feature />

		<Product />

		<Footer />
	</Fragment>
);

export default IndexPage;
