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
    target: ["web", "es5"],
    output: {
      environment: codeEngineEnvironment,
      path: path.resolve(__dirname, "lib"),
      filename: "bundle.js",
      library: "dfd"
    },
    optimization: {
      minimize: false,
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
	  exclude: /core-js/,
          use: {
            loader: 'babel-loader',
            options: {
              //presets: ["es2015"],
              plugins: [
		 //"@babel/plugin-proposal-dynamic-import",
    		"@babel/plugin-transform-modules-commonjs",
    		"@babel/plugin-transform-class-properties",
    		"@babel/plugin-transform-class-static-block",
    		"@babel/plugin-transform-private-methods",
    		"@babel/plugin-transform-private-property-in-object",
    		"@babel/plugin-syntax-top-level-await",

    		"@babel/plugin-transform-logical-assignment-operators",
    		"@babel/plugin-transform-numeric-separator",

    		"@babel/plugin-transform-dynamic-import",
    		"@babel/plugin-transform-export-namespace-from",
    		"@babel/plugin-transform-nullish-coalescing-operator",
    		"@babel/plugin-transform-optional-chaining",
    		"@babel/plugin-syntax-bigint",
    		"@babel/plugin-syntax-dynamic-import",
    		"@babel/plugin-syntax-import-meta",

    		"@babel/plugin-transform-optional-catch-binding",
    		"@babel/plugin-transform-json-strings",

    		"@babel/plugin-transform-async-generator-functions",
    		"@babel/plugin-transform-object-rest-spread",

    		// "@babel/plugin-transform-async-to-generator",
    		"@babel/plugin-transform-exponentiation-operator",

    		"@babel/plugin-transform-classes",
                "@babel/plugin-transform-arrow-functions",
    		"@babel/plugin-transform-block-scoping",
    		"@babel/plugin-transform-computed-properties",
    		"@babel/plugin-transform-destructuring",
    		"@babel/plugin-transform-duplicate-keys",
    		"@babel/plugin-transform-for-of",
    		"@babel/plugin-transform-function-name",
    		"@babel/plugin-transform-instanceof",
    		"@babel/plugin-transform-literals",
    		"@babel/plugin-transform-new-target",
    		"@babel/plugin-transform-object-super",
    		"@babel/plugin-transform-parameters",
    		"@babel/plugin-transform-shorthand-properties",
    		"@babel/plugin-transform-spread",
    		"@babel/plugin-transform-template-literals",
    		"@babel/plugin-transform-typeof-symbol",
    		"@babel/plugin-transform-unicode-escapes",
    		"@babel/plugin-transform-property-mutators",
                "@babel/plugin-transform-unicode-sets-regex",
                ["@babel/plugin-transform-unicode-property-regex",
			{
				useUnicodeFlag: false
			}
		],
                "@babel/plugin-transform-dotall-regex",
                ["@babel/plugin-transform-named-capturing-groups-regex",
			{
				runtime: false
			}
		],
                "@babel/plugin-transform-sticky-regex",
                "@babel/plugin-transform-unicode-regex"
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
