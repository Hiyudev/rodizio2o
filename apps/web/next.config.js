const withTM = require("next-transpile-modules")(["tool"]);
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

module.exports = withTM(
	withPWA({
		reactStrictMode: true,
		pwa: {
			dest: "public",
			register: true,
			skipWaiting: true,
			runtimeCaching,
			buildExcludes: [/middleware-manifest.json$/],
		},
	})
);
