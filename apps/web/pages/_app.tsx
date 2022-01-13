import "../styles/global.css";
import { ThemeProvider } from "next-themes";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
	return (
		<ThemeProvider enableSystem attribute="class">
			<Head>
				<title>Rodizio2O</title>
			</Head>

			<Component {...pageProps} />
		</ThemeProvider>
	);
}

export default MyApp;
