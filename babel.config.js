module.exports = {
  presets: ["next/babel"],
  plugins: [
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    "babel-plugin-transform-typescript-metadata",
  ],
};
