// const webpack = require('webpack');
// import pack from "next/dist/compiled/webpack/webpack.js";
// const { webpack } = pack;
// import pkg from 'webpack';
// const { webpack } = pkg;

const nextConfig = {
    images: {
      domains: ['arweave.net'],
    },
    webpack: (webpackConfig, options) => {
      webpackConfig.module.rules.push({
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      });
    
      // Ignore source map warnings from node_modules.
      // See: https://github.com/facebook/create-react-app/pull/11752
      webpackConfig.ignoreWarnings = [/Failed to parse source map/];
    
      // Polyfill Buffer.
      // webpackConfig.plugins.push(
      //   new webpack.ProvidePlugin({ Buffer: ['buffer', 'Buffer'] }),
      // );
    
      // Polyfill other modules.
      // webpackConfig.resolve.fallback = {
      //   crypto: require("crypto-browserify"),
      //   stream: require("stream-browserify"),
      //   util: require("util"),
      //   assert: require("assert"),
      //   fs: false,
      //   process: false,
      //   path: false,
      //   zlib: false,
      // };
    
      return webpackConfig;
    },
};

export default nextConfig;
