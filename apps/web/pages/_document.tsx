import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		return (
			<Html lang="pt-br">
				<Head>
					<meta name="application-name" content="Rodizio2O" />
					<meta name="apple-mobile-web-app-capable" content="yes" />
					<meta
						name="apple-mobile-web-app-status-bar-style"
						content="default"
					/>
					<meta name="apple-mobile-web-app-title" content="Rodizio2O" />
					<meta
						name="description"
						content="Veja o rodízio de água de Curitiba com apenas um toque"
					/>
					<meta name="format-detection" content="telephone=no" />
					<meta name="mobile-web-app-capable" content="yes" />
					<meta
						name="msapplication-config"
						content="/icons/browserconfig.xml"
					/>
					<meta name="msapplication-TileColor" content="#60a5fa" />
					<meta name="msapplication-tap-highlight" content="no" />
					<meta name="theme-color" content="#60a5fa" />

					<link rel="apple-touch-icon" href="/icons/logo-180.png" />
					<link
						rel="apple-touch-icon"
						sizes="152x152"
						href="/icons/logo-152.png"
					/>
					<link
						rel="apple-touch-icon"
						sizes="180x180"
						href="/icons/logo-180.png"
					/>
					<link
						rel="apple-touch-icon"
						sizes="167x167"
						href="/icons/logo-167.png"
					/>

					<link
						rel="icon"
						type="image/png"
						sizes="32x32"
						href="/icons/logo-32x32.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="16x16"
						href="/icons/logo-16x16.png"
					/>
					<link rel="manifest" href="/manifest.json" />
					<link rel="mask-icon" href="/icons/logo.svg" color="#60a5fa" />
					<link rel="shortcut icon" href="/favicon.ico" />

					<meta name="twitter:card" content="summary" />
					<meta name="twitter:url" content="https://rodizio2o.vercel.app/" />
					<meta
						name="twitter:title"
						content="Rodizio2O - Veja o próximo rodízio de água"
					/>
					<meta
						name="twitter:description"
						content="Veja o rodízio de água de Curitiba com apenas um toque"
					/>
					<meta
						name="twitter:image"
						content="https://rodizio2o.vercel.app/image/Banner.png"
					/>
					<meta name="twitter:creator" content="@Yuki2dev" />
					<meta property="og:type" content="website" />
					<meta
						property="og:title"
						content="Rodizio2O - Veja o próximo rodízio de água"
					/>
					<meta
						property="og:description"
						content="Veja o rodízio de água de Curitiba com apenas um toque"
					/>
					<meta
						property="og:site_name"
						content="Rodizio2O - Veja o próximo rodízio de água"
					/>
					<meta property="og:url" content="https://rodizio2o.vercel.app/" />
					<meta
						property="og:image"
						content="https://rodizio2o.vercel.app/image/Banner.png"
					/>
					<meta
						property="keywords"
						content="rodizio de agua curitiba, rodizio de agua, curitiba, sanepar"
					/>

					<link
						rel="apple-touch-startup-image"
						href="/image/apple_splash_2048.png"
						sizes="2048x2732"
					/>
					<link
						rel="apple-touch-startup-image"
						href="/image/apple_splash_1668.png"
						sizes="1668x2224"
					/>
					<link
						rel="apple-touch-startup-image"
						href="/image/apple_splash_1536.png"
						sizes="1536x2048"
					/>
					<link
						rel="apple-touch-startup-image"
						href="/image/apple_splash_1125.png"
						sizes="1125x2436"
					/>
					<link
						rel="apple-touch-startup-image"
						href="/image/apple_splash_1242.png"
						sizes="1242x2208"
					/>
					<link
						rel="apple-touch-startup-image"
						href="/image/apple_splash_750.png"
						sizes="750x1334"
					/>
					<link
						rel="apple-touch-startup-image"
						href="/image/apple_splash_640.png"
						sizes="640x1136"
					/>
				</Head>

				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
