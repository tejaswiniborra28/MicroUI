const { dependencies } = require("./package.json");

module.exports = {
  name: "app1",
  filename: "remoteEntry.js",
  library: { type: "var", name: "app1" },
  exposes: {
    "./CounterApp": "./src/App",
  },
  shared: {
    // ...deps,
    react: { singleton: true, requiredVersion: dependencies.react },
    "react-dom": {
      singleton: true,
      requiredVersion: dependencies["react-dom"],
    },
    // react: { singleton: true, eager: true, requiredVersion: deps.react },
    // "react-dom": {
    //   singleton: true,
    //   eager: true,
    //   requiredVersion: deps["react-dom"],
    // },
  },
};
