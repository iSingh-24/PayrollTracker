const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./client/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.[contenthash].js",
    assetModuleFilename: "images/[name].[hash][ext]",
  },
  module: {
    rules: [
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      { test: /\.html$/, use: ["html-loader"] },
      {
        test: /\.(svg|png|jpg|gif)$/,
        type: "asset/resource",
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./client/template.html", //this will look for the template on the frontend that we're going to show
    }),
    new CleanWebpackPlugin(),
  ],
};

/**
 * Html webpack plugin - simpflies creationg of HTML files. Useful for bundles that include a hash in the filename.
 * This will let webpack handle automatically update the hashed file names in the script tags
 *
 *
 * Html loader - anytime that you need to handle an image, it will require the image. It will tell the webpack that this
 * is the file that we need to load. You still need to tell webpack how you want to handle these files.
 *
 *
 * file-loader - handles the images like svgs, pngs, jpgs etc. In the ruleset you can add the output path as well.
 * The outputPath will name the folder that is placed in your specified dist directory.
 *
 *clean-webpack-plugin - used to clean up extra hashed files created by webpack. It is typically used in production mode
 *I believe but it can be used in development mode as well too.
 *
 *Sass-loader depends on node-sass
 *
 *
 * Sass-loader - turns sass into css
 * Css-loader - turns css into commonJS
 * Style-loader - injects styles into the DOM
 *
 *
 *
 * babel/core - Core babel compiler responsible for parsing JavaScript code and transforming it according to plugins and presets configured. Output code generated can run in a wide
 * variety of JS environments. It basically transpiles your Javascript code into code that is still Javascript but making it more compatible and providing a means to use the latest
 * ECMAScript features.
 *
 * babel/preset-env - Provides Babel with the ability to compile modern JS features into syntax compatible with a wide range of browsers.
 *
 * babel/preset-react - Provides Babel with the ability to compile JSX syntax used by React into regular JS code. It transforms the JSX syntax into what the function calls would have
 * originally been to create the react elements. Syntactic sugar gets converted into JS code.
 *
 * babel-loader - Babel loader for webpack which allows Babel to transpile JS code while it's being loaded by Webpack. This is necessary due to some features in JS such as arrow functions
 * as well as template literals that are not supported by all browsers. Ensures that your code will run in a wider variety of environments.
 * 
 * 
 * 
 * The resolve part below specifies which file extentions Webpack should try to resolve when importing the modules. By default it will look for a js extension but with this configuration
 * Webpack will also look for files with the .jsx extension. 
 *
 *   resolve: {
    extensions: ['.js', '.jsx'],
  }

  A use case of this would be something like importing App from './components/App' vs './components/App.jsx' 


      "start:dev": "npm run start &&  nodemon ./server/index.js & webpack serve --config webpack.config.js --open"

  */
