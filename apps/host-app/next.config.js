const { NextFederationPlugin } = require("@module-federation/nextjs-mf");
const path = require("path");

module.exports = {
  webpack(config, options) {
    /* config.resolve.alias = {
      '@': path.resolve(__dirname, 'src'),
    }; */
    if (!options.isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: "host",
          remotes: {
		remote: "remote@http://3.140.183.228:3001/remote.js",
          },
          filename: "static/chunks/remoteEntry.js",
        })
      );
    }

    return config;
  },
  reactStrictMode: true,
  transpilePackages: ["@repo/ui"],
  output: "standalone",
  experimental: {
    outputFileTracingRoot: path.join(__dirname, "../../"),
  },
};
