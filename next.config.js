module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: "graphql-tag/loader",
    });
    config.module.rules.push({
      test: /\.worker\.ts$/,
      use: [
        {
          loader: "comlink-loader",
          options: {
            singleton: true,
            name: "static/[hash].worker.js",
            publicPath: "/_next/",
          },
        },
        {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
          },
        },
      ],
    });

    return config;
  },
};
