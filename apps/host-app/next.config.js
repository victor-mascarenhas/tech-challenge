const { NextFederationPlugin } = require('@module-federation/nextjs-mf');
const path = require("path");

module.exports = {
  webpack(config, options) {
    if (!options.isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: 'host',
          remotes: {
            remote: 'remote@http://localhost:3001/remote.js',
          },
          filename: 'static/chunks/remoteEntry.js',
        }),
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
