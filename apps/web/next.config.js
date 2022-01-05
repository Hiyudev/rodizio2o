const withTM = require("next-transpile-modules")(["tool"]);

module.exports = withTM({
	reactStrictMode: true,
});
