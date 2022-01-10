const withTM = require("next-transpile-modules")(["tool"]);
const withPWA = require("next-pwa");

module.exports = withTM(
	withPWA({
		reactStrictMode: true,
		pwa: {
			dest: "public",
			scope: "/app",
		},
	})
);
