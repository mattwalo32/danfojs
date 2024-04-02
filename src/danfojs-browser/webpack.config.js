/* eslint-disable no-undef */
const path = require("path");
const webpack = require("webpack");

const codeEngineEnvironment = {
  // The environment supports arrow functions ('() => { ... }').
  arrowFunction: false,
  // The environment supports BigInt as literal (123n).
  bigIntLiteral: false,
  // The environment supports const and let for variable declarations.
  const: false,
  // The environment supports destructuring ('{ a, b } = obj').
  destructuring: false,
  // The environment supports an async import() function to import EcmaScript modules.
  dynamicImport: false,
  // The environment supports 'for of' iteration ('for (const x of array) { ... }').
  forOf: false,
  // The environment supports ECMAScript Module syntax to import ECMAScript modules (import ... from '...').
  module: false,
};

const createConfig = () => {
  return {
    mode: "production",
    devtool: "source-map",
    context: path.resolve(__dirname),
    entry: {
      index: [
        path.resolve(__dirname, "polyfills/env.js"),
        "@babel/polyfill",
        `./src/index.ts`
      ]
    },
    plugins: [
      new webpack.ProvidePlugin({
        window: path.resolve(__dirname, "polyfills/window.js"),
        process: path.resolve(__dirname, "polyfills/process.js"),
        setImmediate: path.resolve(__dirname, "polyfills/setImmediate.js"),
        Buffer: ["buffer", "Buffer"],
        // Blob: ["blob-polyfill", "Blob"],
      }),
    ],
    target: ["web", "es5", "ie 11"],
    output: {
      environment: codeEngineEnvironment,
      path: path.resolve(__dirname, "lib"),
      filename: "bundle.js",
      library: "dfd"
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [ 'ts-loader', 'ify-loader' ],
          exclude: /node_modules/
        },
        {
          test: /\.m?js$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-transform-arrow-functions"
              ]
            }
          }
        }
      ]
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ]
    }
  };
};

module.exports = [
  createConfig()
];
