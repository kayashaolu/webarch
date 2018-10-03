# Set up your React Environment

## Preparation
1. Install NodeJS: https://nodejs.org/en/download/

## Setting up your NodeJS project
2. In your terminal window (or command prompt) do the following:
3. Create a directory for the project:
   `mkdir webpack-react-tutorial`
4. Change directory into that project:
   `cd webpack-react-tutorial`
5. Create an src folder. This folder will contain all of your code
   `mkdir -p src`
6. Initialize your NodeJS project
   `npm init -y`


## Setting up webpack
7. Install webpack (and save dependency in your NodeJS project)
  `npm i webpack --save-dev`
8. Install webpack-cli (cli stands for command line interface, so you can interact with webpack from the terminal)
  `npm i webpack-cli --save-dev`
9. Replace the key "scripts" in the package.json file (this defines what node should do when you ask node to build the project with the terminal command `npm build`)
```json
"scripts": {
  "build": "webpack --mode production"
},
```

## Setting up Babel
10. Install Babel depedencies that we need to 1) compile ES6 JavaScript to ES5 (@babel/preset-env) and 2) to compile React specific code like JSX down to regular JavaScript (@babel/preset-react)
   `npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev`
11. Configure Babel to use the dependencies we installed earlier. Create a .bashrc file directly inside the webpack-react-tutorial folder
   `touch .babelrc`
12. Add the following lines to the  webpack-react-tutorial/.babelrc file you just created (tells Babel to run your JavaScript code through the two presets: @babel/preset-react and @babel/preset-env)

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```
13. To create the initial configuration file for ebpack, create the  webpack-react-tutorial/webpack.config.js with the command
   `touch webpack.config.js`
14. Add the following content to webpack-react-tutorial/webpack.config.js. This configuration tells webpack to find all files of extention .js that are not in the node_modules folder to go through "babel-loader", which will run your Javascript in webpack-react-tutorial/src/index.js through the two babel presets (@babel/preset-env and @babel/preset-react)
```json
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};
```

## Setting up react
15. Install react and it's dependencies so that the final JavaScript generated from your development environment includes the React libraries:
   `npm i react react-dom --save-dev`
16. Now it's time to see if we have everything above set up! Webpack expects the file that will contain our Javascript to be in webpack-react-tutorial/src/index.js. So let's create the file index.js file.
   `touch src/index.js`
17. Add the following code to the index.js file:
```JavaScript
console.log("Hello World!");
```

## Test to see if everything is wired up correctly
18. Run the following command to build your index.js file. Note that the JavaScript in index.js will go through Babel and be converted to ES5 code (@babel/preset-env), and then any React code will be converted to plain Javascript as well (@babel/preset-react). The resulting Javascript will be bundled in a single file with the React and React Dom Javascript files witin the webpack-react-tutorial/dist/main.js file. This file should be generated after you enter the following command:
   `npm run build`
19. Check to see if you have a file created in the webpack-react-tutorial/dist/main.js file. If you don't see that file or another error occurs


## Extending the use of Webpack: using the HTML webpack plugin
20. Webpack can automatically place a <script></script> tag loading the webpack-react-tutorial/dist/main.js file so that your html code does not have to worry about figuring out the name of the generated script. First install the dpeendencies to your NodeJS project
   `npm i html-webpack-plugin html-loader --save-dev`
21. Replace the entire contents of webpack-react-tutorial/webpack.config.js to the below in order to use the html-loader in order to use webpack to also add the <script></script> tag to your html file that will house your React App

```json
const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};
```

22. Create a new html file that will house your react app in the src folder (in webpack-react-tutorial/src/index.html):
   `touch src/index.html`

23. Add the following content to webpack-react-tutorial/src/index.html:

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
</head>
<body>
    <!-- This div is where the React App will live -->
    <div id="root"></div>
</body>
</html>
```

24. Replace old code from  webpack-react-tutorial/src/index.js with the below:

```JavaScript
import React from "react";
import ReactDOM from "react-dom";

ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
);
```

## Test to see if everything is wired up correctly
25. Run the following command to build your index.js and your index.html file. Note that the JavaScript in index.js will go through Babel and be converted to ES5 code (@babel/preset-env), and then any React code will be converted to plain Javascript as well (@babel/preset-react). The resulting Javascript will be bundled in a single file with the React and React Dom Javascript files witin the webpack-react-tutorial/dist/main.js file. In addition, due to the webpack html plugin, an index.html file will be created by webpack in the dist folder that would include a script tag that references the generated bundled JavaScript (webpack-react-tutorial/dist/main.js):
   `npm run build`

26. Check to see if you have a file created in the webpack-react-tutorial/dist/main.js file and a webpack-react-tutorial/dist/index.html. If you don't see those files, check your steps.

27. Open webpack-react-tutorial/dist/index.html in a browser. You should see that the div with id `root` is now replaced with <h1>Hello World!</h1>

28. You now have a setup to build your React application. There is a very easy nice to have to add on to this: you can run a development server that does the following: 1) by typing `npm start`, it will build your application and automatically launch it and 2) as you change your code in the webpack-react-tutorial/src folder, your changes will automatically be reflected in your browser. In short, you wouldn't have to enter `npm run bulid` anymore.

   First install up the webpack dev server with:
   `npm i webpack-dev-server --save-dev`

29. Open up webpack-react-tutorial/package.json and replace the scripts key in the json with the following:

```JavaScript
"scripts": {
  "start": "webpack-dev-server --open --mode development",
  "build": "webpack"
},
```

30. Start your server with the command:
   `npm start`. Should open up your browser. As you modify index.js and index.html in the webpack-react-tutorial/src folder it should immediately reflect your website

31. Create a file webpack-react-tutorial/.gitignore to tell git not to upload certain folders (like node_modules that can be downloaded) You may need to exit your server by entering Ctrl-C before entering this command
   `touch .gitignore`

32. Add the following text to prevent git from uploading your node_modules folder

```
node_modules/
```
